import { Chip } from "../chip";
import type { HashtagsCmProps } from "./types";

export const Hashtags: React.FC<HashtagsCmProps> = ({ hashtags }) => {
	return (
		<div className="flex items-center gap-x-2">
			{hashtags?.map((hashtag, idx) => (
				<Chip variant="flat" key={`${hashtag}-${idx}`} className="ltr">
					{`#${hashtag}`}
				</Chip>
			))}
		</div>
	);
};
