import SOP from '../models/SOP.js';

// Generate random readability score
const assessReadability = async(content) => {
    try {
        const score = Math.floor(Math.random() * 31); // Generates a random score between 0 and 30
        console.log('Readability score:', score);
        return score;
    } catch (err) {
        console.error('Error generating readability score:', err);
        return 0; // Fallback score in case of error
    }
};



// Get all SOPs
export const getAllSOPs = async(req, res) => {
    try {
        const sops = await SOP.find();
        res.json(sops);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


// Create a new SOP
export const createSOP = async(req, res) => {
    const { title, content } = req.body;
    try {
        console.log('Creating a new SOP:', title);
        const newSOP = new SOP({ title, content });
        await newSOP.save();
        console.log('SOP created successfully:', newSOP);
        res.json(newSOP);
    } catch (err) {
        console.error('Error creating SOP:', err);
        res.status(500).send('Server Error');
    }
};

// Assess the quality of an SOP
export const assessQuality = async(req, res) => {
    const { id } = req.params;
    try {
        console.log('Assessing quality of SOP with ID:', id);
        const sop = await SOP.findById({ _id: id });
        if (!sop) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }

        // 1. Length of Content (10 points)
        const lengthScore = assessLength(sop.content);
        console.log('Length score:', lengthScore);

        // 2. Presence of Key Sections (40 points)
        const sectionsScore = assessSections(sop.content);
        console.log('Sections score:', sectionsScore);

        // 3. Readability Score (30 points)
        const readabilityScore = await assessReadability(sop.content);
        console.log('Readability score:', readabilityScore);

        // 4. Keyword Density (20 points)
        const keywordDensityScore = assessKeywordDensity(sop.content);
        console.log('Keyword density score:', keywordDensityScore);

        // Calculate total quality score
        const qualityScore = lengthScore + sectionsScore + readabilityScore + keywordDensityScore;
        sop.qualityScore = qualityScore;
        await sop.save();
        console.log('Total quality score:', qualityScore);

        res.json(sop);
    } catch (err) {
        console.error('Error assessing quality of SOP:', err);
        res.status(500).send('Server Error');
    }
};

// Assess length of content
const assessLength = (content) => {
    const wordCount = content.split(' ').length;
    console.log('Word count:', wordCount);
    if (wordCount < 300) return 0; // Too short
    if (wordCount > 3000) return 0; // Too long
    return 10; // Perfect length
};

// Assess presence of key sections
const assessSections = (content) => {
    const requiredSections = ['Introduction', 'Procedure', 'Safety Measures'];
    const sectionScores = requiredSections.map(section => content.includes(section) ? 1 : 0);
    const score = (sectionScores.reduce((a, b) => a + b, 0) / requiredSections.length) * 40;
    console.log('Section scores:', sectionScores, 'Total score:', score);
    return score;
};

// Assess keyword density
const assessKeywordDensity = (content) => {
    const keywords = ['safety', 'procedure', 'compliance'];
    const words = content.toLowerCase().split(' ');
    const keywordCounts = keywords.map(keyword => words.filter(word => word === keyword).length);
    const totalKeywords = keywordCounts.reduce((a, b) => a + b, 0);
    const keywordDensity = (totalKeywords / words.length) * 100;
    console.log('Keyword counts:', keywordCounts, 'Total keywords:', totalKeywords, 'Keyword density:', keywordDensity);

    if (keywordDensity < 0.5) return 0; // Too few keywords
    if (keywordDensity > 5) return 0; // Too many keywords
    return 20; // Good keyword density
};

// Validate SOP compliance
export const validateCompliance = async(req, res) => {
    const { id } = req.params;
    try {
        console.log('Validating compliance for SOP with ID:', id);
        const sop = await SOP.findById(id);
        if (!sop) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }

        // Dummy compliance validation logic
        const isCompliant = sop.content.includes('compliance'); // Simple example logic
        sop.complianceStatus = isCompliant ? 'Compliant' : 'Non-Compliant';
        await sop.save();
        console.log('Compliance status:', sop.complianceStatus);
        res.json(sop);
    } catch (err) {
        console.error('Error validating compliance:', err);
        res.status(500).send('Server Error');
    }
};

// Log changes to an SOP
export const logChange = async(req, res) => {
    const { id } = req.params;
    const { change } = req.body;
    try {
        console.log('Logging change for SOP with ID:', id, 'Change:', change);
        const sop = await SOP.findById(id);
        if (!sop) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }

        sop.changeLogs.push({ change });
        await sop.save();
        console.log('Change logged successfully:', sop);
        res.json(sop);
    } catch (err) {
        console.error('Error logging change:', err);
        res.status(500).send('Server Error');
    }
};

// Perform gap analysis on an SOP
export const performGapAnalysis = async(req, res) => {
    const { id } = req.params;
    try {
        console.log('Performing gap analysis for SOP with ID:', id);
        const sop = await SOP.findById(id);
        if (!sop) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }

        // Dummy gap analysis logic
        const gaps = ['Missing section on compliance', 'Outdated information in section 2'];
        console.log('Gaps found:', gaps);
        res.json({ gaps });
    } catch (err) {
        console.error('Error performing gap analysis:', err);
        res.status(500).send('Server Error');
    }
};

// Update an existing SOP
export const updateSOP = async(req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        console.log('Updating SOP with ID:', id);
        const updatedSOP = await SOP.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedSOP) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }
        console.log('SOP updated successfully:', updatedSOP);
        res.json(updatedSOP);
    } catch (err) {
        console.error('Error updating SOP:', err);
        res.status(500).send('Server Error');
    }
};

// Delete an existing SOP
export const deleteSOP = async(req, res) => {
    const { id } = req.params;
    try {
        console.log('Deleting SOP with ID:', id);
        const deletedSOP = await SOP.findByIdAndDelete(id);
        if (!deletedSOP) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }
        console.log('SOP deleted successfully:', deletedSOP);
        res.json({ msg: 'SOP deleted' });
    } catch (err) {
        console.error('Error deleting SOP:', err);
        res.status(500).send('Server Error');
    }
};

// Add a control to an SOP
export const addControl = async(req, res) => {
    const { id } = req.params;
    const { control } = req.body;
    try {
        console.log('Adding control to SOP with ID:', id, 'Control:', control);
        const sop = await SOP.findById(id);
        if (!sop) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }

        sop.controls.push({ control });
        await sop.save();
        console.log('Control added successfully:', sop);
        res.json(sop);
    } catch (err) {
        console.error('Error adding control:', err);
        res.status(500).send('Server Error');
    }
};

// Verify a control in an SOP
export const verifyControl = async(req, res) => {
    const { id, controlId } = req.params;
    try {
        console.log('Verifying control for SOP with ID:', id, 'Control ID:', controlId);
        const sop = await SOP.findById(id);
        if (!sop) {
            console.log('SOP not found:', id);
            return res.status(404).json({ msg: 'SOP not found' });
        }

        const control = sop.controls.id(controlId);
        if (!control) {
            console.log('Control not found:', controlId);
            return res.status(404).json({ msg: 'Control not found' });
        }

        control.status = 'Verified';
        control.verifiedAt = Date.now();
        await sop.save();
        console.log('Control verified successfully:', sop);
        res.json(sop);
    } catch (err) {
        console.error('Error verifying control:', err);
        res.status(500).send('Server Error');
    }
};