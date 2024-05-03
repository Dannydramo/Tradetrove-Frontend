import Link from 'next/link';
import React from 'react';

const VendorsRegion = () => {
    const states = [
        'Abia',
        'Adamawa',
        'Akwa Ibom',
        'Anambra',
        'Bauchi',
        'Bayelsa',
        'Benue',
        'Borno',
        'Cross River',
        'Delta',
        'Ebonyi',
        'Edo',
        'Ekiti',
        'Enugu',
        'Gombe',
        'Imo',
        'Jigawa',
        'Kaduna',
        'Kano',
        'Katsina',
        'Kebbi',
        'Kogi',
        'Kwara',
        'Lagos',
        'Nasarawa',
        'Niger',
        'Ogun',
        'Ondo',
        'Osun',
        'Oyo',
        'Plateau',
        'Rivers',
        'Sokoto',
        'Taraba',
        'Yobe',
        'Zamfara',
        'Fct',
    ];

    return (
        <div className="my-12">
            <h1 className="font-bold text-center text-xl uppercase">
                Vendors Region
            </h1>
            <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 my-8">
                {states.map((state, index) => (
                    <Link
                        href={`/vendors/${state}`}
                        key={index}
                        className="capitalize"
                    >
                        {state}
                    </Link>
                ))}
            </ul>
        </div>
    );
};

export default VendorsRegion;
