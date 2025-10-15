type Props = {
	filter: string;
	setFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const Filters: React.FC<Props> = ({ filter, setFilter }) => {
	const filters = ["Latest", "Trending", "Oldest"];

	return (
		<div className="flex gap-1">
			{filters.map((f) => (
				<button
					key={f}
					className={`${
						f === filter ? "bg-logo text-primary" : "bg-white text-logo"
					} flex-1 cursor-pointer  font-semibold border-2 border-logo p-1 rounded-md`}
					onClick={() => setFilter(f)}
				>
					{f}
				</button>
			))}
		</div>
	);
};
