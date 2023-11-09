import Link from 'next/link';

export default function Page() {
    return (
        <div>
            <Link href='/chat/myra'>Chat with Myra</Link>
            <Link href='/chat/alexander'>Chat with Alexander</Link>
        </div>
    );
}
