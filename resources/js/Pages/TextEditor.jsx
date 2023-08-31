import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

export default function Animasi({ auth }) {
    const [text, setText] = useState('');
    marked.use({
        async: false,
        baseUrl: null,
        breaks: false,
        extensions: null,
        gfm: true,
        headerIds: false,
        headerPrefix: "",
        highlight: null,
        hooks: null,
        langPrefix: "language-",
        mangle: false,
        pedantic: false,
        sanitize: false,
        sanitizer: null,
        silent: false,
        smartypants: false,
        tokenizer: null,
        walkTokens: null,
        xhtml: false
    });

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <Head title="Text Editor" />

            <div className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-gray-600 text-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="text-4xl flex justify-center m-2 border-b">
                        Text Editor
                    </div>
                    <div className='flex gap-8 mx-4 -mb-4'>
                        <span className='grow'>Editor</span>
                        <span className='grow'>Preview</span>
                    </div>
                    <div className='flex gap-2 p-4 text-black'>
                        <textarea name="" id="editor" className='w-1/2 h-96 rounded-sm' onChange={(e) => setText(e.target.value)} autoFocus></textarea>
                        <div id='preview' className='w-1/2 max-h-96 overflow-auto bg-white rounded-sm p-2'>
                            {/* Tailwind nya ga bisa di non aktifkan */}
                            <div style={{ all: 'revert' }} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(text)) }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout >
    );
}