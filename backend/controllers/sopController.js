import SOP from '../models/SOP.js';
import { diffLines } from 'diff';
import mongoose from 'mongoose';
import { assessQualityWithOpenAI } from '../services/aiService.js';
import Notification from '../models/Notification.js';


// Get all SOPs
export const getAllSOPs = async(req, res) => {
    try {
        console.log('Fetching all SOPs');
        const sops = await SOP.find();
        console.log('SOPs retrieved:', sops);
        res.json(sops);
    } catch (err) {
        console.error('Error fetching SOPs:', err.message);
        res.status(500).send('Server Error');
    }
};

// Create a new SOP
export const createSOP = async (req, res) => {
    const { title, content, expectedTimeOfCompletion } = req.body;
  
    try {
      console.log('Creating new SOP with title:', title);
  
      const newSOP = new SOP({
        title,
        content,
        expectedTimeOfCompletion,
        changeLogs: [{
          change: `Created SOP with title: ${title}`,
          changedAt: new Date(),
          changedBy: req.user ? req.user.id : 'unknown'  // Log the user ID if available
        }]
      });
  
      await newSOP.save();

      // Create notification
        const notification = new Notification({
        message: `SOP "${title}" created.`,
        sopId: newSOP._id,
        type: 'Created',
      });
        await notification.save();
      console.log('SOP created successfully:', newSOP);
      res.json(newSOP);
    } catch (err) {
      console.error('Error creating SOP:', err);
      res.status(500).send('Server Error');
    }
  };
  




// Log changes to an SOP
export const logChange = async(req, res) => {
    const { id } = req.params;
    const { newContent } = req.body;

    try {
        console.log('Logging change for SOP with ID:', id);
        const sop = await SOP.findById(id);
        if (!sop) {
            return res.status(404).json({ msg: 'SOP not found' });
        }

        const oldContent = sop.content;
        const changes = diffLines(oldContent, newContent);

        const formattedChanges = changes
            .map(part => {
                const prefix = part.added ? '+' : part.removed ? '-' : '';
                return `${prefix}${part.value}`;
            })
            .join('');

        sop.changeLogs.push({ change: formattedChanges });
        sop.content = newContent;
        await sop.save();

        console.log('Change logged successfully:', sop);
        res.json(sop);
    } catch (err) {
        console.error('Error logging change:', err);
        res.status(500).send('Server Error');
    }
};


// Get SOP changes
export const getSOPChanges = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid SOP ID' });
    }

    try {
        console.log('Fetching SOP changes for ID:', id);
        const sop = await SOP.findById(id);

        if (!sop) {
            return res.status(404).json({ message: 'SOP not found' });
        }

        console.log('SOP changes retrieved:', sop.changeLogs);
        res.json(sop.changeLogs);
    } catch (err) {
        console.error('Error fetching SOP changes:', err);
        res.status(500).send('Server Error');
    }
};



export const getAllChangeLogs = async(req, res) => {
    try {
        console.log('Fetching change logs for all SOPs');
        const sops = await SOP.find();
        const allChangeLogs = sops.flatMap(sop => sop.changeLogs);
        console.log('All change logs retrieved:', allChangeLogs);
        res.json(allChangeLogs);
    } catch (err) {
        console.error('Error fetching change logs:', err);
        res.status(500).send('Server Error');
    }
};


// Update an existing SOP
// Update an existing SOP
export const updateSOP = async (req, res) => {
    const { id } = req.params;
    const { title, content, elapsedTime, timerStatus } = req.body;
    
    try {
        console.log('Updating SOP with ID:', id);
        const updatedSOP = await SOP.findById(id);
        
        if (!updatedSOP) {
            return res.status(404).json({ msg: 'SOP not found' });
        }

        // Log the change in changeLogs
        updatedSOP.changeLogs.push({
            change: `Updated SOP. Old Content: ${updatedSOP.content}, New Content: ${content}`,
        });

        // Update the SOP with new data
        if (title) updatedSOP.title = title; // Update title if provided
        if (content) updatedSOP.content = content; // Update content if provided
        if (elapsedTime !== undefined) updatedSOP.elapsedTime = elapsedTime; // Update elapsed time if provided
        if (timerStatus !== undefined) updatedSOP.timerStatus = timerStatus; // Update timer status if provided

        await updatedSOP.save();

        // Create notification
        const notification = new Notification({
            message: `SOP "${updatedSOP.title}" updated.`,
            sopId: updatedSOP._id,
            type: 'Updated',
        });
        await notification.save();

        console.log('SOP updated successfully:', updatedSOP);
        res.json(updatedSOP);
    } catch (err) {
        console.error('Error updating SOP:', err);
        res.status(500).send('Server Error');
    }
};



// Delete an existing SOP and log the deletion
export const deleteSOP = async(req, res) => {
    const { id } = req.params;
    try {
        console.log('Deleting SOP with ID:', id);
        const deletedSOP = await SOP.findByIdAndDelete(id);
        if (!deletedSOP) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }

        // Log the deletion
        await SOP.updateMany({}, { 
            $push: {
                changeLogs: {
                    change: `- Deleted SOP with title: ${deletedSOP.title}`,
                    changedAt: new Date(),
                    changedBy: req.user ? req.user.id : 'unknown'  // Example: log the user ID if available
                }
            }
        });

        // Create a notification for the deletion
        const notification = new Notification({
            message: `Deleted SOP: ${deletedSOP.title}`,
            sopId: deletedSOP._id,
            type: 'Deleted',
        });
        await notification.save();

        console.log('SOP deleted successfully:', deletedSOP);
        res.json({ msg: 'SOP deleted' });
    } catch (err) {
        console.error('Error deleting SOP:', err);
        res.status(500).send('Server Error');
    }
};


export const getSOPContentById = async(id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error('Invalid SOP ID');
    }

    const sop = await SOP.findById(id);
    if (!sop) {
        throw new Error('SOP not found');
    }

    return sop.content;
};

// Update the quality score of an SOP
export const updateQualityScore = async(id, qualityScore) => {
    if (typeof qualityScore !== 'number' || qualityScore < 0 || qualityScore > 100) {
        throw new Error('Invalid quality score. It should be a number between 0 and 100.');
    }

    try {
        console.log('Updating quality score for SOP with ID:', id);
        const sop = await SOP.findById(id);
        if (!sop) {
            throw new Error('SOP not found');
        }

        sop.qualityScore = qualityScore;
        await sop.save();

        console.log('Quality score updated successfully:', sop);
        return sop;
    } catch (err) {
        console.error('Error updating quality score:', err);
        throw new Error('Server Error');
    }
};

// Get the quality score of an SOP by its ID
export const getQualityScoreById = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid SOP ID' });
    }

    try {
        console.log('Fetching quality score for SOP with ID:', id);
        const sop = await SOP.findById(id);

        if (!sop) {
            return res.status(404).json({ message: 'SOP not found' });
        }

        console.log('Quality score retrieved:', sop.qualityScore);
        res.json({ qualityScore: sop.qualityScore });
    } catch (err) {
        console.error('Error fetching quality score:', err);
        res.status(500).send('Server Error');
    }
};

export const assessQuality = async(req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid SOP ID' });
    }

    try {
        const sop = await SOP.findById(id);

        if (!sop) {
            return res.status(404).json({ message: 'SOP not found' });
        }

        // Compare the current content with the last assessed content
        const { content } = sop;
        const lastQualityScore = sop.qualityScore;

        // Assess the quality only if content has changed
        const { analysis, qualityScore } = await assessQualityWithOpenAI(content);

        if (qualityScore === lastQualityScore) {
            // No change in quality score
            return res.json({ analysis: sop.analysis, qualityScore: lastQualityScore });
        }

        // Update the SOP with the new quality score and analysis
        sop.qualityScore = qualityScore;
        sop.analysis = analysis;
        await sop.save();

        res.json({ analysis, qualityScore });
    } catch (error) {
        console.error('Failed to assess SOP quality:', error.message);
        res.status(500).json({ error: 'Failed to assess SOP quality' });
    }
};


