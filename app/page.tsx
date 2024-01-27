export const dynamic = 'force-dynamic'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import Link from 'next/link';

async function getData() {
	const cookieStore = cookies()
	const supabase = createServerComponentClient({ cookies: () => cookieStore })
	return supabase

}

export default async function HomePage() {
	// const cookieStore = cookies();
	// const supabase = createServerComponentClient({ cookies: () => cookieStore });
	const supabase = await getData()
	const {
		data: { user },
	} = await supabase.auth.getUser();
	console.log(user)



	return (
		<div className="flex flex-col items-center w-full">
			<div className="flex flex-col max-w-4xl px-3 py-16 gap-14 lg:py-24 text-foreground">
				<div className="flex flex-col items-center mb-4 lg:mb-12">
					<h1 className="sr-only">Supabase and Next.js Starter Template</h1>
					<p className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center my-12">
						Chat with your files using <strong>Supabase</strong> and{' '}
						<strong>Next.js</strong>
					</p>
					{user ? (
						<div className="flex flex-row gap-2">
							<Link
								href="/files"
								className="px-6 py-3 font-mono text-sm rounded-lg bg-foreground text-background"
							>
								Upload
							</Link>
							<Link
								href="/chat"
								className="px-6 py-3 font-mono text-sm rounded-lg bg-foreground text-background"
							>
								Chat
							</Link>
						</div>
					) : (
						<div className="flex flex-row gap-2">
							<Link
								href="/login"
								className="px-6 py-3 font-mono text-sm rounded-lg bg-foreground text-background"
							>
								Login
							</Link>
						</div>
					)}
				</div>
				<div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
			</div>
		</div>
	);
}
