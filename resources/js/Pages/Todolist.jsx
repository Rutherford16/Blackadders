import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Todolist({ auth, todolist }) {
    const [dialogTambahTugas, setDialogTambahTugas] = useState(false);
    const [dialogBuktiSelesai, setDialogBuktiSelesai] = useState(false);
    const [uploadBukti, setUploadBukti] = useState(false);
    const [id, setId] = useState();
    const [filename, setFileName] = useState();
    const { data, setData, post, processing, errors, progress } = useForm({
        name: '',
        deadline: '',
        bukti: null,
        id: '',
    });
    const openDialog = () => {
        setDialogTambahTugas(true);
        setData('deadline', new Date(new Date().getTime() + (3600000 * 8)).toISOString().substring(0, 16))
    };
    const closeDialog = () => {
        setDialogTambahTugas(false);
    };
    const openDialogBukti = (filename) => {
        setDialogBuktiSelesai(true);
        setFileName(filename);
    };
    const closeDialogBukti = () => {
        setDialogBuktiSelesai(false);
    };
    const openDialogUploadBukti = (id) => {
        setId(id);
        setUploadBukti(true);
    };
    const closeDialogUploadBukti = () => {
        setUploadBukti(false);
    };
    const tambahTugas = (e) => {
        e.preventDefault();
        post(route('todolist.tambah'), {
            onSuccess: () => closeDialog()
        });
        setData('name', '');
    };
    const selesai = (e) => {
        e.preventDefault();
        post(route('todolist.selesai'),
            {
                onSuccess: () => closeDialogUploadBukti()
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="To Do List" />
            {/* {console.log(new Date().toLocaleString('en-US', { timeZone: 'Asia/Makassar' }))}
            {console.log(new Date(new Date().getTime()+(3600000*8)).toISOString())} */}

            <div className="py-8">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-gray-600 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="text-4xl text-white flex justify-center m-2">
                            To Do List
                        </div>
                        <div className='flex items-center justify-end'>
                            <button className='bg-gray-200 hover:bg-gray-300 m-2 mr-6 p-2 rounded' onClick={openDialog}>Tambah Tugas</button>
                        </div>
                        <div className="clear-both h-fit m-4">
                            <table className="table-auto w-full">
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border border-gray-800">Job Name</th>
                                        <th className="border border-gray-800">Deadline</th>
                                        <th className="border border-gray-800">Status</th>
                                    </tr>
                                </thead>
                                <tbody className='bg-gray-500 text-white'>
                                    {todolist.map(list =>
                                        <tr key={list.id} className='odd:bg-gray-600'>
                                            <td className="border border-gray-800 p-2">{list.name}</td>
                                            <td className="border border-gray-800 p-2">{list.deadline}</td>
                                            <td className="border border-gray-800 p-2">
                                                {list.is_complete == 1 ? 'Selesai (' + list.updated_at + ') ' : 'Belum selesai '}
                                                {list.is_complete == 0 ? (<button onClick={() => openDialogUploadBukti(list.id)} className='text-xs bg-gray-400 p-1 my-1 rounded hover:bg-gray-300'>Sudah selesai?</button>) : (
                                                    <button onClick={() => openDialogBukti(list.bukti)} className='text-xs bg-gray-400 p-1 my-1 rounded hover:bg-gray-300'>
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="inline h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"></path>
                                                        </svg> Bukti
                                                    </button>)}
                                            </td>
                                        </tr>)}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={dialogTambahTugas} onClose={closeDialog}>
                <form onSubmit={tambahTugas} className='m-5'>
                    <h1 className='text-white mb-4 text-3xl bg-gray-700 rounded p-2'>Tambah Tugas</h1>
                    <div>
                        <InputLabel htmlFor="name" value="Apa yang ingin kamu lakukan?" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className='mt-3'>
                        <InputLabel htmlFor="deadline" value="Kapan batas waktunya?" />
                        <TextInput
                            id="deadline"
                            name="deadline"
                            type="datetime-local"
                            value={data.deadline}
                            className="mt-1 block w-full"
                            autoComplete="deadline"
                            onChange={(e) => setData('deadline', e.target.value)}
                            required
                        />
                        <InputError message={errors.deadline} className="mt-2" />
                    </div>
                    <div className="flex items-center justify-end mt-4">
                        <button className="ml-4 bg-gray-200 hover:bg-gray-300 m-2 p-2 rounded" disabled={processing}>
                            Tambah
                        </button>
                    </div>
                </form>
            </Modal>
            <Modal show={dialogBuktiSelesai} onClose={closeDialogBukti} maxWidth={'5xl'}>
                <div className='bg-gray-700 p-4'>
                    <img src={"/storage/image/"+filename} className='' alt="cobaaaa" />
                </div>
            </Modal>
            <Modal show={uploadBukti} onClose={closeDialogUploadBukti}>
                <form onSubmit={selesai}>
                    <div className='bg-gray-700 p-4'>
                        <InputLabel htmlFor="bukti" value="Ada buktinya?" />
                        <TextInput
                            id="bukti"
                            name="bukti"
                            type="file"
                            className="my-1 bg-gray-50 block w-full"
                            onChange={e => setData('bukti', e.target.files[0])}
                        />
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                        <InputError message={errors.bukti} className="mt-2" />
                        <input type="hidden" name="id" defaultValue={data.id = id} />
                        <div className='flex justify-end'>
                            <button type='submit' className='text-md bg-gray-400 p-1 mt-3 rounded hover:bg-gray-300'>Kirim</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </AuthenticatedLayout>
    );
}