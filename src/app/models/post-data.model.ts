
export class PostData {

	public date: Date;
	public likes: number;
	public sponsored: boolean;
	public comments: number;
	public shortcode: string;
	public hashtags: string[];

	public deserialize(data: any): this {
		Object.assign(this, data);

		this.date = data.date.toDate();

		return this;
	}
}