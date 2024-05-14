import { ProjectAreaOfProduction, ProjectStatus, type Project } from '$lib/interfaces';
import { BSON, type ObjectId } from 'mongodb';

const buildSearchQuery = (filter: string, searchString: string) => {
	const query: any = {};

	if (filter && searchString) {
		query[filter] = new RegExp(searchString, 'i');
	}

	return query;
};

interface ProjectsArgs {
	filter: string;
	searchString: string;
}
interface GetProjectsArrayArgs extends ProjectsArgs {
	limit?: number;
	skip?: number;
}
export const getProjectsArray = async (
	projects: any,
	{ filter, searchString, limit, skip }: GetProjectsArrayArgs
) => {
	const query = buildSearchQuery(filter, searchString);

	const projectsArray = await projects
		.find(query, {
			limit: limit ?? 10,
			skip: skip ?? 0,
			projection: {
				name: 1,
				owner: 1,
				creationDate: 1,
				_id: 1,
				areaOfProduction: 1
			}
		})
		.toArray();
	return projectsArray;
};

export const countProjects = async (projects: any, { filter, searchString }: ProjectsArgs) => {
	const query = buildSearchQuery(filter, searchString);

	return await projects.countDocuments(query);
};

export const getProjectByID = async (projects: any, _id: string) => {
	return await projects.findOne({ _id: new BSON.ObjectId(_id) }, { projection: { _id: 0 } });
};

interface UpdateProjectByIDArgs {
	_id: string;
	project: Project;
}
export const updateProjectByID = async (projects: any, { _id, project }: UpdateProjectByIDArgs) => {
	return await projects.updateOne({ _id: new BSON.ObjectId(_id) }, { $set: project });
};

interface ChangeStatusByIDArgs {
	_id: string;
	newStatus: ProjectStatus;
}
export const changeStatusByID = async (projects: any, { _id, newStatus }: ChangeStatusByIDArgs) => {
	return await projects.updateOne({ _id: new BSON.ObjectId(_id) }, { $set: { status: newStatus } });
};

interface CreateProjectArgs {
	name: string;
	owner: string;
	areaOfProduction: ProjectAreaOfProduction;
}
export const createNewProject = async (
	projects: any,
	{ name, owner, areaOfProduction }: CreateProjectArgs
) => {
	const newProject: Partial<Project> = {
		name,
		owner,
		areaOfProduction,
		creationDate: new Date(),
		status: ProjectStatus.Draft
	};

	await projects.insertOne(newProject);
};
