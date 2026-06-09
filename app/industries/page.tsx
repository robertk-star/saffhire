import Link from 'next/link';
import { industries } from '@/lib/site';

export const metadata = { title: 'Industries Served', description: 'SaffHire background screening pages for trucking, churches, nonprofits, and staffing agencies.' };

export default function IndustriesPage() { return <><section className="page-hero"><p className="eyebrow">Industries</p><h1>Background screening for the industries that matter most.</h1><p>SaffHire supports employers with practical screening workflows for trucking, churches, nonprofits, staffing agencies, and other hiring teams.</p></section><section className="section"><div className="cards">{industries.map((industry)=><Link className="card card-link" key={industry.slug} href={`/industries/${industry.slug}`}><p className="eyebrow">{industry.eyebrow}</p><h2>{industry.title}</h2><p>{industry.description}</p><strong>Learn more →</strong></Link>)}</div></section></>; }
