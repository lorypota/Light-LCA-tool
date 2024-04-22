import { projects } from '$db/projects';
import type { PageServerLoad } from './$types';
import type { State } from '@vincjo/datatables/remote';

export const load: PageServerLoad = async function (event): Promise<any> {
	const { url } = event;
	const state: State = {
		pageNumber: parseInt(url.searchParams.get('page') || '1'),
		rowsPerPage: parseInt(url.searchParams.get('limit') || '25'),
		sort: {
			orderBy: url.searchParams.get('sort') || '_id',
			direction: 'asc' //url.searchParams.get('order')
		},
		filters: [],
		search: url.searchParams.get('search') || '',
		offset: parseInt(url.searchParams.get('offset') || '0'),
		setTotalRows: () => {},
		sorted: undefined
	};

	const { query, options } = getParams(state);

	const fetchProjectInfos = async () => {
		const projectInfos = await projects.find(query, options).toArray();

		return projectInfos.map((project) => ({
			...project,
			_id: project._id.toString() // Convert _id to a string
		}));
	};

	const fetchProjectNum = async () => {
		return await projects.countDocuments();
	};

	return {
		projectInfos: await fetchProjectInfos(),
		projectNum: await fetchProjectNum()
	};
};

const getParams = (state: State) => {
	const { pageNumber, rowsPerPage, sort, filters, search } = state;

	const query: any = {};
	const options: any = {};

	if (pageNumber && rowsPerPage) {
		options.skip = (pageNumber - 1) * rowsPerPage;
		options.limit = rowsPerPage;
	}

	if (sort) {
		options.sort = {
			[sort.orderBy as keyof any]: sort.direction === 'asc' ? 1 : -1
		};
	}

	if (filters) {
		filters.forEach(({ filterBy, value }) => {
			query[filterBy] = value;
		});
	}

	if (search) {
		query.$text = { $search: search };
	}

	return { query, options };
};
