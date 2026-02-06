type Opportunity = {
    id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    isPublished: boolean;
    order?: string;
    createdAt: Date;
}

export default Opportunity