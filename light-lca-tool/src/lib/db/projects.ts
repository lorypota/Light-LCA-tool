import db from '$lib/db/mongo';
import type { Project } from '$lib/interfaces';

const buildSearchQuery = (filter: string, searchString: string) => {
	const query: any = {};

	// filter is a string that can be 'name', 'owner', 'creationDate' or 'id'

	if (filter && searchString) {
		query[filter] = new RegExp(searchString, 'i');
	}

	return query;
};

const projects = db.collection<Project>('projects');

export const getProjectsArray = async (
	filter: string,
	searchString: string,
	limit: number = 10,
	skip: number = 0
) => {
	const query = buildSearchQuery(filter, searchString);

	const projectsArray = await projects
		.find(query, {
			limit,
			skip,
			projection: {
				name: 1,
				owner: 1,
				creationDate: 1,
				id: 1,
				_id: 0
			}
		})
		.toArray();
	return projectsArray;
};

export const countProjects = async (filter: string, searchString: string) => {
	const query = buildSearchQuery(filter, searchString);

	return await projects.countDocuments(query);
};

export const getProjectByID = async (id: string) => {
	return await projects.findOne({ id }, { projection: { _id: 0 } });
};
