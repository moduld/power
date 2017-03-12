interface Subdir {
    name: string;
    images: Images[];
}

interface Images {
    size: number;
    name: string;
    date: any;
    data: any;
}

export class Folders {


    constructor ( public  name: string, public  images: Images[], public subdir: Subdir[], ){

    }

    disabled?: boolean;
    opened?: boolean;

}