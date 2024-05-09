import type { Project, ProjectStatus } from '$lib/interfaces';

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
				id: 1,
				areaOfProduction: 1,
				_id: 0
			}
		})
		.toArray();
	return projectsArray;
};

export const countProjects = async (projects: any, { filter, searchString }: ProjectsArgs) => {
	const query = buildSearchQuery(filter, searchString);

	return await projects.countDocuments(query);
};

export const getProjectByID = async (projects: any, id: string) => {
	return await projects.findOne({ id }, { projection: { _id: 0 } });
};

interface UpdateProjectByIDArgs {
	id: string;
	project: Partial<Project>;
}
export const updateProjectByID = async (projects: any, { id, project }: UpdateProjectByIDArgs) => {
	return await projects.updateOne({ id }, { $set: project });
};

interface ChangeStatusByIDArgs {
	id: string;
	newStatus: ProjectStatus;
}
export const changeStatusByID = async (projects: any, { id, newStatus }: ChangeStatusByIDArgs) => {
	return await projects.updateOne({ id }, { $set: { status: newStatus } });
};
