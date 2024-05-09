import type { Project, ProjectStatus } from '$lib/interfaces';

export const getProjectsArray = async (projects: any, limit: number = 25) => {
	// TODO: add also pagination
	const projectsArray = await projects
		.find(
			{},
			{
				limit,
				projection: {
					name: 1,
					owner: 1,
					creationDate: 1,
					id: 1,
					areaOfProduction: 1,
					_id: 0
				}
			}
		)
		.toArray();
	return projectsArray;
};

export const countProjects = async (projects: any) => {
	return await projects.countDocuments();
};

export const getProjectByID = async (projects: any, id: string) => {
	return await projects.findOne({ id }, { projection: { _id: 0 } });
};

// functions have always two arguments (for Wrapper, see src/db/mongo.ts)
// if function need more than two arguments, pass an object as second argument
type UpdateProjectByIDArgs = {
	id: string;
	project: Partial<Project>;
};
export const updateProjectByID = async (projects: any, args: UpdateProjectByIDArgs) => {
	return await projects.updateOne({ id: args.id }, { $set: args.project });
};

type ChangeStatusByIDArgs = {
	id: string;
	newStatus: ProjectStatus;
};
export const changeStatusByID = async (projects: any, args: ChangeStatusByIDArgs) => {
	return await projects.updateOne({ id: args.id }, { $set: { status: args.newStatus } });
};
