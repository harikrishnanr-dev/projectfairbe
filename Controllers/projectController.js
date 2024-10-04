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
				userId
			});
			await newProject.save();
			res.status(200).json("Project uploaded successfully");
		}
	} catch (err) {
		res.status(401).json("Project Upload Failed", err);
	}
}
	//1 get any 3 project details for home page
	exports.getHomeProject = async(req, res) =>{
		try {
			const homeProject = await projects.find().limit(3);
			res.status(200).json(homeProject)
		}
		catch (err) {
			res.send(401).json("Request failed Due to :",err)
		}
	}
	//2 get all projects
exports.getAllProject = async (req, res) => {
	const searchKey = req.query.search;
	console.log(searchKey);
	const searchQuery = {
		$or: [
			{ language: { $regex: searchKey, $options: 'i' } },
			{ title: { $regex: searchKey, $options: 'i' } }
		]
	};
	
		try {
			const allProject = await projects.find(searchQuery);
			res.status(200).json(allProject)
		}
		catch (err) {
			res.send(401).json("Request failed Due to :",err)
		}
	}
	// 3. get all projects uploaded by that specific user
	exports.getUserProject = async (req, res) => {
		userId = req.payload;
		try {
			const userProject = await projects.find({ userId: userId });
			res.status(200).json(userProject)
		}
		catch (err) {
			res.send(401).json("Request failed Due to :",err)
		}
	}

exports.editUserProject = async (req, res) => {
	const { id } = req.params;
	const userId = req.payload;
	const { title, language, github, website, overview , projectImage } = req.body;
	const uploadedProjectImage = req.file ? req.file.filename : projectImage; 
	try {
		const updateProject = await projects.findByIdAndUpdate(
			{ _id: id }, {
				
				title: title,
				language: language,
				github: github,
				website:website,
				overview: overview,
				projectImage: uploadedProjectImage,
				userId:userId
		}, {
				new:true,
			}
		
			
		);
		await updateProject.save();
		res.status(200).json(updateProject)
}
	catch (error) {
		res.send(401).json(error)
	}
}
//delete project
exports.deleteUserProject = async (req, res) => {
	const { id } = req.params;
	try {
		const removedProject = await projects.findByIdAndDelete({ _id: id });
		res.status(200).json(removedProject)
			}
	catch (err) {
		res.status(500).json(err)
	}
}