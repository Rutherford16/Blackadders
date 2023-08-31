import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import Marlboro from '@/Components/Animasi/Marlboro';
import Bankaltimtara from '@/Components/Animasi/Bankaltimtara';
import SedayuDharmaGroup from '@/Components/Animasi/SedayuDharmaGroup';
import Honda from '@/Components/Animasi/Honda';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Animasi({ auth }) {
    const [dialog, setDialog] = useState(false);
    const [NamaAnimasi, setNamaAnimasi] = useState('Marlboro');
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

    // const components = {
    //     photo: PhotoStory,
    //     video: VideoStory
    // };

    // function Story(props) {
    //     // Correct! JSX type can be a capitalized variable.
    //     const SpecificStory = components[props.storyType];
    //     return <SpecificStory story={props.story} />;
    // }

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
                            <button onClick={(e) => openDialog(e.target.value)} className='bg-gray-500 hover:bg-gray-400 p-3 rounded' value='Bankaltimtara'>Bankaltimtara</button>
                            <button onClick={(e) => openDialog(e.target.value)} className='bg-gray-500 hover:bg-gray-400 p-3 rounded' value='SedayuDharmaGroup(Unfinished)'>Sedayu Dharma Group</button>
                            <button onClick={(e) => openDialog(e.target.value)} className='bg-gray-500 hover:bg-gray-400 p-3 rounded' value='Honda(Unfinished)'>Honda</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={dialog} onClose={closeDialog} maxWidth={'5xl'}>
                <div className='text-white text-3xl m-2 p-3 bg-gray-700 rounded flex'>
                    <h1 className='grow'>{NamaAnimasi}</h1>
                    <div className=''>
                        <button className='bg-gray-500 hover:bg-gray-600 px-2 rounded' onClick={closeDialog}>X</button>
                    </div>
                </div>
                <div className='flex justify-center m-5'>
                    {NamaAnimasi === 'Marlboro' && (<Marlboro />)}
                    {NamaAnimasi === 'Bankaltimtara' && (<Bankaltimtara />)}
                    {NamaAnimasi === 'SedayuDharmaGroup(Unfinished)' && (<SedayuDharmaGroup />)}
                    {NamaAnimasi === 'Honda(Unfinished)' && (<Honda />)}
                </div>
            </Modal >
        </AuthenticatedLayout >
    );
}