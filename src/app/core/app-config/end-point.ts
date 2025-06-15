import {environment} from 'environments/environment';


export class EndPoints {

    /**
     * @description: Url para los endpoints
     */
    static uri(url: string): string {
        const pacth = 'gestion-citas'
        return  `${environment.apiUrl}/${pacth}/${url}`;
    }


}
