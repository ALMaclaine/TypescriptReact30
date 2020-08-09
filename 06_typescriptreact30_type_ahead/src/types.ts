import {Dispatch, SetStateAction} from "react";

export interface City {
    city: string,
    growth_from_2000_to_2013: string,
    latitude: number,
    longitude: number,
    population: string,
    rank: string,
    state: string
}

export type Cities = City[];

export type Dispather<E> = Dispatch<SetStateAction<E>>;
