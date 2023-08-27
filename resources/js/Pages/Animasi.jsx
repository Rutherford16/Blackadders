import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import Marlboro from '@/Components/Animasi/Marlboro';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Animasi({ auth }) {
    const [dialog, setDialog] = useState(false);
    const [NamaAnimasi, setNamaAnimasi] = useState();
    // const listAnimasi = {
    //     'Marlboro': <Marlboro/>,
    // }[namaAnimasi];
    // const animasiYangMana = () => {
    // };
    const openDialog = (E) => {
        setNamaAnimasi(E);
        setDialog(true);
    };
    const closeDialog = () => {
        setDialog(false);
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Animasi" />

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-600 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-4xl text-white flex justify-center m-2">
                            Animasi
                        </div>
                        <div className='flex gap-3 m-3 p-2 text-white'>
                            <button onClick={(e) => openDialog(e.target.value)} className='bg-gray-500 hover:bg-gray-400 p-3 rounded' value='Marlboro'>Marlboro</button>
                            <button onClick={(e) => openDialog(e.target.value)} className='bg-gray-500 hover:bg-gray-400 p-3 rounded' value='bankaltimtara'>bankaltimtara</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={dialog} onClose={closeDialog} maxWidth={'5xl'}>
                <h1 className='text-white text-3xl m-2 p-3 bg-gray-700 rounded'>{NamaAnimasi}</h1>
                <div className='flex justify-center m-5'>
                    <Marlboro />
                </div>
            </Modal >
        </AuthenticatedLayout >
    );
}