const projects = require("../Models/projectSchema");
exports.addProject = async (req, res) => {
	console.log("inside add Project controller");
	const userId = req.payload;
	console.log("User Id:-", userId);
	//request we are getting is form data
	//so it is not possible to directly access the data
	const projectImage = req.file.filename;
	console.log("Image File Name", projectImage);
	const { title, language, github, website, overview } = req.body;
	try {
		const existingProject = await projects.findOne({ github: github });
		if (existingProject) {
			res.status(409).json("project already exist");
		} else {
			const newProject = new projects({
				title,
				language,
				github,
				website,
				overview,
				projectImage,
            });
            await newProject.save();
			res.status(200).json("Project uploaded successfully");
		}
	} catch (err) {
		res.status(401).json("Project Upload Failed", err);
	}
};
