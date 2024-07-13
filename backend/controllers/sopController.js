import SOP from '../models/SOP.js';

// Dynamic import of flesch-kincaid
const assessReadability = async (content) => {
  const { default: fleschKincaid } = await import('flesch-kincaid');
  const score = fleschKincaid({ text: content });
  return score;
};

// Create a new SOP
export const createSOP = async (req, res) => {
  const { title, content } = req.body;
  try {
    const newSOP = new SOP({ title, content });
    await newSOP.save();
    res.json(newSOP);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Assess the quality of an SOP
export const assessQuality = async (req, res) => {
  const { id } = req.params;
  try {
    const sop = await SOP.findById(id);
    if (!sop) return res.status(404).json({ msg: 'SOP not found' });

    // 1. Length of Content (10 points)
    const lengthScore = assessLength(sop.content);

    // 2. Presence of Key Sections (40 points)
    const sectionsScore = assessSections(sop.content);

    // 3. Readability Score (30 points)
    const readabilityScore = await assessReadability(sop.content);

    // 4. Keyword Density (20 points)
    const keywordDensityScore = assessKeywordDensity(sop.content);

    // Calculate total quality score
    const qualityScore = lengthScore + sectionsScore + readabilityScore + keywordDensityScore;
    sop.qualityScore = qualityScore;
    await sop.save();

    res.json(sop);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Assess length of content
const assessLength = (content) => {
  const wordCount = content.split(' ').length;
  if (wordCount < 300) return 0; // Too short
  if (wordCount > 3000) return 0; // Too long
  return 10; // Perfect length
};

// Assess presence of key sections
const assessSections = (content) => {
  const requiredSections = ['Introduction', 'Procedure', 'Safety Measures'];
  const sectionScores = requiredSections.map(section => content.includes(section) ? 1 : 0);
  return (sectionScores.reduce((a, b) => a + b, 0) / requiredSections.length) * 40;
};

// Assess keyword density
const assessKeywordDensity = (content) => {
  const keywords = ['safety', 'procedure', 'compliance'];
  const words = content.toLowerCase().split(' ');
  const keywordCounts = keywords.map(keyword => words.filter(word => word === keyword).length);
  const totalKeywords = keywordCounts.reduce((a, b) => a + b, 0);
  const keywordDensity = (totalKeywords / words.length) * 100;

  if (keywordDensity < 0.5) return 0; // Too few keywords
  if (keywordDensity > 5) return 0; // Too many keywords
  return 20; // Good keyword density
};

// Validate SOP compliance
export const validateCompliance = async (req, res) => {
  const { id } = req.params;
  try {
    const sop = await SOP.findById(id);
    if (!sop) return res.status(404).json({ msg: 'SOP not found' });

    // Dummy compliance validation logic
    const isCompliant = sop.content.includes('compliance'); // Simple example logic
    sop.complianceStatus = isCompliant ? 'Compliant' : 'Non-Compliant';
    await sop.save();
    res.json(sop);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Log changes to an SOP
export const logChange = async (req, res) => {
  const { id } = req.params;
  const { change } = req.body;
  try {
    const sop = await SOP.findById(id);
    if (!sop) return res.status(404).json({ msg: 'SOP not found' });

    sop.changeLogs.push({ change });
    await sop.save();
    res.json(sop);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Perform gap analysis on an SOP
export const performGapAnalysis = async (req, res) => {
  const { id } = req.params;
  try {
    const sop = await SOP.findById(id);
    if (!sop) return res.status(404).json({ msg: 'SOP not found' });

    // Dummy gap analysis logic
    const gaps = ['Missing section on compliance', 'Outdated information in section 2'];
    res.json({ gaps });
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Add a control to an SOP
export const addControl = async (req, res) => {
  const { id } = req.params;
  const { control } = req.body;
  try {
    const sop = await SOP.findById(id);
    if (!sop) return res.status(404).json({ msg: 'SOP not found' });

    sop.controls.push({ control });
    await sop.save();
    res.json(sop);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};

// Verify a control in an SOP
export const verifyControl = async (req, res) => {
  const { id, controlId } = req.params;
  try {
    const sop = await SOP.findById(id);
    if (!sop) return res.status(404).json({ msg: 'SOP not found' });

    const control = sop.controls.id(controlId);
    if (!control) return res.status(404).json({ msg: 'Control not found' });

    control.status = 'Verified';
    control.verifiedAt = Date.now();
    await sop.save();
    res.json(sop);
  } catch (err) {
    res.status(500).send('Server Error');
  }
};
