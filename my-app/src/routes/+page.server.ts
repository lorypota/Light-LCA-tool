import { projects } from '$db/projects';
import { tableMapperValues } from '@skeletonlabs/skeleton';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const fetchProjectTable = async () => {
		const projectInfos = await projects
			.find(
				{},
				{
					limit: 25,
					projection: {
						name: 1,
						owner: 1,
						creationDate: 1,
						_id: 1
					}
				}
			)
			.toArray();

		await new Promise((r) => setTimeout(r, 10000));
		return {
			head: ['name', 'owner', 'creationDate'],
			body: tableMapperValues(
				projectInfos.map((project) => ({
					...project,
					_id: project._id.toString() // Convert _id to a string
				})),
				['name', 'owner', 'creationDate']
			),
			foot: [`Total lines: ${await projects.countDocuments()}`, '', `<code class="code"></code>`]
		};
	};

	return {
		projectTable: fetchProjectTable()
	};
};
