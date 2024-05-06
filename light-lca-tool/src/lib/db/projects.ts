import db from '$lib/db/mongo';
import type { Project, ProjectStatus } from '$lib/interfaces';

const projects = db.collection<Project>('projects');
export const getProjectsArray = async (limit: number = 25) => {
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

export const countProjects = async () => {
	return await projects.countDocuments();
};

export const getProjectByID = async (id: string) => {
	return await projects.findOne({ id }, { projection: { _id: 0 } });
};

export const updateProjectByID = async (id: string, project: Partial<Project>) => {
	return await projects.updateOne({ id }, { $set: project });
};

export const changeStatusByID = async (id: string, newStatus: ProjectStatus) => {
	return await projects.updateOne({ id }, { $set: { status: newStatus } });
};
