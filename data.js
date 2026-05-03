const PERSONAS={
'first-time':{icon:'🗳️',label:'First-Time Voter',greeting:'Welcome, Future Voter!'},
'returning':{icon:'🇮🇳',label:'Returning Voter',greeting:'Welcome back, Voter!'},
'nri':{icon:'✈️',label:'NRI Voter',greeting:'Vote from Abroad!'},
'student':{icon:'📚',label:'Student/Researcher',greeting:'Explore Indian Democracy!'}
};
const MISSIONS={
'first-time':[
{id:'age',title:'Check Eligibility',desc:'Must be 18+ by Jan 1 of election year, Indian citizen',icon:'✅',status:'active'},
{id:'register',title:'Register as Voter',desc:'Fill Form 6 on voters.eci.gov.in or Voter Helpline App',icon:'📋',status:'locked'},
{id:'epic',title:'Get Your EPIC Card',desc:'Receive Elector Photo Identity Card within 30 days',icon:'🪪',status:'locked'},
{id:'booth',title:'Find Your Polling Booth',desc:'Use ECI portal to locate your assigned booth',icon:'📍',status:'locked'},
{id:'day',title:'Election Day',desc:'Carry EPIC or approved ID, vote between 7AM-6PM',icon:'🗳️',status:'locked'}
],
'returning':[
{id:'verify',title:'Verify Your Details',desc:'Check your name/address on electoral roll is current',icon:'🔍',status:'active'},
{id:'update',title:'Update if Needed',desc:'File Form 8 to update address or correct details',icon:'✏️',status:'locked'},
{id:'booth',title:'Confirm Your Booth',desc:'Booth may change — recheck before election day',icon:'📍',status:'locked'},
{id:'mcc',title:'Understand MCC',desc:'Know what Model Code of Conduct means for voters',icon:'⚖️',status:'locked'},
{id:'day',title:'Cast Your Vote',desc:'Carry EPIC, reach booth early, vote on EVM',icon:'🗳️',status:'locked'}
],
'nri':[
{id:'eligible',title:'NRI Eligibility',desc:'Indian passport holders can register in home constituency',icon:'🛂',status:'active'},
{id:'form6a',title:'Fill Form 6A',desc:'NRI voter registration form — submit online at ECI',icon:'📋',status:'locked'},
{id:'visit',title:'Must Vote in Person',desc:'NRIs must travel to India — no postal/proxy voting yet',icon:'✈️',status:'locked'},
{id:'documents',title:'Required Documents',desc:'Passport copy + overseas address proof needed',icon:'📄',status:'locked'},
{id:'day',title:'Vote in Constituency',desc:'Visit your registered polling station in India on election day',icon:'🗳️',status:'locked'}
],
'student':[
{id:'system',title:'The Electoral System',desc:'FPTP system — constituency-based, most votes wins',icon:'🏛️',status:'active'},
{id:'eci',title:'Role of ECI',desc:'Independent constitutional body overseeing all elections',icon:'⚖️',status:'locked'},
{id:'phases',title:'Multi-Phase Elections',desc:'Why India votes in phases across 44+ days',icon:'📅',status:'locked'},
{id:'evm',title:'EVM & VVPAT',desc:'How electronic voting machines work and ensure integrity',icon:'🖥️',status:'locked'},
{id:'count',title:'Counting & Results',desc:'How votes are tallied and results declared',icon:'📊',status:'locked'}
]
};
const AI_KB={
register:'To register:\n1. Visit voters.eci.gov.in\n2. Fill Form 6 with age + address proof\n3. BLO verifies your address\n4. EPIC card issued in 30 days\n\nHelpline: 1950',
epic:'EPIC (Elector Photo Identity Card) = your Voter ID.\nGet it: Register at voters.eci.gov.in, fill Form 6.\nUpdate: Form 8 for corrections.\nDownload e-EPIC from Voter Helpline App.',
evm:'EVMs are made only by BEL & ECIL (govt PSUs).\nStandalone — no internet/WiFi/Bluetooth.\nVVPAT shows paper slip of your vote for 7 seconds.\n2 units: Ballot Unit (voter) + Control Unit (officer).',
booth:'Find your booth:\n1. electoralsearch.eci.gov.in\n2. Enter EPIC number or name\n3. Your polling station address is shown\n\nHelpline: 1950',
mcc:'MCC activates when ECI announces election dates.\nRestricts: new govt schemes, official transfers, govt resource misuse, hate speech.\nReport violations: cVIGIL app (100 min response).',
nota:'NOTA = None Of The Above. Added in 2013.\nIf NOTA gets most votes, runner-up still wins.\nBut it sends a powerful signal to parties.',
nri:'NRI voters need Indian passport.\nRegister via Form 6A at voters.eci.gov.in.\nMust vote IN PERSON in India — no postal/proxy voting yet.',
eci:'ECI = autonomous body under Article 324.\nChief Election Commissioner + 2 Commissioners.\nPowers: announce elections, enforce MCC, allot symbols, recognize parties.',
fptp:'FPTP: candidate with MOST votes in a constituency wins.\n543 Lok Sabha seats. Each voter votes for ONE candidate.\nCritique: can win with 30% votes if others split.',
holiday:'Yes! Section 135B of Representation of People Act mandates paid holiday for all employees on polling day.',
phases:'Multi-phase because:\n- Vast geography (28 states, 8 UTs)\n- Central paramilitary must deploy phase-wise\n- 1M+ stations, 15M+ staff\nLok Sabha 2024: 7 phases over 44 days.',
pwd:'PwD facilities:\n- Priority queue\n- Wheelchair ramps\n- Braille EVMs\n- Companion allowed\n- Home voting for 85+ or 40%+ disabled',
default:"Great question! Visit eci.gov.in or call Voter Helpline 1950 for official info. Explore the Deep Dive section for detailed explainers!"
};
function getAIResponse(input){
const q=input.toLowerCase();
if(q.includes('register')||q.includes('enrol')||q.includes('form 6'))return AI_KB.register;
if(q.includes('epic')||q.includes('voter id')||q.includes('identity card'))return AI_KB.epic;
if(q.includes('evm')||q.includes('electronic voting')||q.includes('vvpat'))return AI_KB.evm;
if(q.includes('booth')||q.includes('polling station')||q.includes('where to vote'))return AI_KB.booth;
if(q.includes('mcc')||q.includes('model code')||q.includes('conduct'))return AI_KB.mcc;
if(q.includes('nota')||q.includes('none of the above'))return AI_KB.nota;
if(q.includes('nri')||q.includes('overseas')||q.includes('abroad'))return AI_KB.nri;
if(q.includes('eci')||q.includes('election commission'))return AI_KB.eci;
if(q.includes('fptp')||q.includes('first past')||q.includes('how does voting work'))return AI_KB.fptp;
if(q.includes('holiday')||q.includes('leave')||q.includes('day off'))return AI_KB.holiday;
if(q.includes('phase')||q.includes('why multiple')||q.includes('stages'))return AI_KB.phases;
if(q.includes('disabled')||q.includes('pwd')||q.includes('wheelchair')||q.includes('senior'))return AI_KB.pwd;
return AI_KB.default;
}

const TIMELINES={
'lok-sabha':[
{phase:'Pre-Election',title:'ECI Announcement',desc:'ECI announces schedule, phases, dates. MCC activates immediately.',status:'done',tag:'Day 0'},
{phase:'Pre-Election',title:'Model Code of Conduct Active',desc:'No new govt schemes. No transfer of key officials. Campaign rules enforced.',status:'done',tag:'Day 0+'},
{phase:'Nomination',title:'Filing of Nominations',desc:'Candidates file nomination papers before Returning Officer.',status:'done',tag:'Day 1-14'},
{phase:'Nomination',title:'Scrutiny of Nominations',desc:'RO checks eligibility, form validity, and documents of all nominees.',status:'done',tag:'Day 15'},
{phase:'Campaign',title:'Campaign Period',desc:'Political parties campaign. 48-hour silence period before voting.',status:'active',tag:'Day 16-44'},
{phase:'Voting',title:'Polling Day(s)',desc:'Voters cast ballots on EVMs. Up to 7 phases across India.',status:'active',tag:'Varies by phase'},
{phase:'Post-Vote',title:'Counting Day',desc:'EVMs unsealed, votes counted under observer supervision.',status:'upcoming',tag:'~Day 47'},
{phase:'Post-Vote',title:'New Government',desc:'Winning coalition forms govt. President invites to form govt.',status:'upcoming',tag:'~Day 60'}
],
'vidhan-sabha':[
{phase:'Pre-Election',title:'Assembly Dissolution',desc:'State assembly dissolution or term end triggers fresh elections.',status:'done',tag:'Day 0'},
{phase:'Nomination',title:'Nomination & Scrutiny',desc:'Candidates file papers for their assembly constituency.',status:'done',tag:'Day 1-14'},
{phase:'Campaign',title:'State-Level Campaigning',desc:'National + state party leaders campaign. Local issues dominate.',status:'active',tag:'Day 15-44'},
{phase:'Voting',title:'Polling',desc:'Smaller states: 1 phase. Larger states: 2-3 phases.',status:'upcoming',tag:'Varies'},
{phase:'Post-Vote',title:'Counting & Result',desc:'Assembly seats counted. Majority party forms state government.',status:'upcoming',tag:'~Day 47'}
],
'presidential':[
{phase:'Initiation',title:'Vacancy Notification',desc:'When President term ends or vacancy arises, ECI notifies.',status:'done',tag:'90 days before'},
{phase:'Nomination',title:'Candidate Nomination',desc:'Must be nominated by 50 electors + 50 seconders from Electoral College.',status:'done',tag:'Day 1-14'},
{phase:'Voting',title:'Electoral College Votes',desc:'MPs + MLAs vote. Weighted votes based on state population.',status:'active',tag:'Single Day'},
{phase:'Result',title:'Result & Swearing In',desc:'Returning Officer declares result. Oath by Chief Justice of India.',status:'upcoming',tag:'Count Day'}
]
};
const GUIDES=[
{id:'eci',icon:'🏛️',tag:'Institution',title:'Election Commission of India',preview:'The constitutional guardian of Indian democracy — its powers, structure, and independence.'},
{id:'evm',icon:'🖥️',tag:'Technology',title:'How EVMs & VVPAT Work',preview:'Inside the tamper-proof machine that records 970M+ votes reliably and transparently.'},
{id:'mcc',icon:'⚖️',tag:'Law',title:'Model Code of Conduct',preview:'The rulebook that levels the election playing field from announcement to results.'},
{id:'fptp',icon:'🗳️',tag:'System',title:'First Past The Post System',preview:'Why India uses FPTP, its advantages, and why critics prefer proportional representation.'},
{id:'delimitation',icon:'🗺️',tag:'Geography',title:'Delimitation & Constituencies',preview:'How India\'s 543 Lok Sabha and 4120 Vidhan Sabha seats are drawn and redrawn.'},
{id:'epic',icon:'🪪',tag:'Identity',title:'Voter ID & EPIC Card',preview:'Your electoral photo identity card — how to get it, update it, and use it on election day.'}
];
const GUIDE_CONTENT={
eci:{title:'Election Commission of India',icon:'🏛️',body:'<p>Established under <strong>Article 324</strong>, ECI is autonomous — guaranteeing free and fair elections.</p><h3>Structure</h3><ul><li>Chief Election Commissioner + 2 Commissioners</li><li>Appointed by President; removed only like SC judges</li></ul><h3>Key Powers</h3><ul><li>Announce election schedule & enforce MCC</li><li>Deploy central forces at booths</li><li>Transfer officers who violate neutrality</li><li>Allot party symbols; recognize/de-recognize parties</li></ul><div class="info-box"><p>⚡ ECI manages the world\'s largest election: 970M+ voters, 1M+ polling stations, 15M+ staff.</p></div>'},
evm:{title:'EVMs & VVPAT — Technology of Trust',icon:'🖥️',body:'<p>India replaced paper ballots with EVMs nationally in 2004. Made only by <strong>BEL and ECIL</strong> — government PSUs.</p><h3>How It Works</h3><ul><li><strong>Ballot Unit:</strong> Voter-facing, has candidate buttons</li><li><strong>Control Unit:</strong> With Presiding Officer — enables voting, stores count</li></ul><h3>Security</h3><ul><li>No WiFi, Bluetooth, or internet — completely standalone</li><li>One-time programmable chip — cannot be reprogrammed in field</li><li>Tamper-evident seals checked by candidates\' agents</li></ul><div class="info-box"><p>🖨️ VVPAT prints a paper slip showing your vote for 7 seconds. You verify, it drops into sealed box.</p></div>'},
mcc:{title:'Model Code of Conduct',icon:'⚖️',body:'<p>MCC is a consensus between ECI and parties since 1960. Activates the moment election dates are announced.</p><h3>What It Restricts</h3><ul><li>No new welfare schemes or policies</li><li>No use of govt machinery for campaigns</li><li>No hate speech or religion/caste appeals</li></ul><h3>Enforcement</h3><ul><li>ECI can issue notices to parties/candidates</li><li>cVIGIL app — report violations, 100-minute response</li></ul><div class="info-box"><p>📱 Report violations instantly using the <strong>cVIGIL app</strong>.</p></div>'},
fptp:{title:'First Past The Post System',icon:'🗳️',body:'<p>India follows FPTP: candidate with <strong>most votes wins</strong> — even without a majority.</p><h3>How It Works</h3><ul><li>543 Lok Sabha constituencies</li><li>Each voter votes for ONE candidate</li><li>Most votes wins — even 30% can win if others split</li></ul><h3>Pros & Cons</h3><ul><li>✅ Simple, strong constituency link, stable governments</li><li>❌ Wasted votes, minority wins possible</li></ul><div class="info-box"><p>🌍 Alternatives like Proportional Representation exist but FPTP remains India\'s system.</p></div>'},
delimitation:{title:'Delimitation & Constituencies',icon:'🗺️',body:'<p>Delimitation redraws constituency boundaries based on census data — done by Delimitation Commission.</p><h3>Numbers</h3><ul><li>543 Lok Sabha seats (frozen since 1977)</li><li>4120 Vidhan Sabha seats across all states</li></ul><h3>Reserved Seats</h3><ul><li>84 seats reserved for SCs</li><li>47 seats reserved for STs</li></ul><div class="info-box"><p>🔒 Lok Sabha seats frozen at 543 since 1977 to avoid penalizing states that controlled population growth. Freeze ends post-2026 delimitation.</p></div>'},
epic:{title:'Voter ID & EPIC Card',icon:'🪪',body:'<p>EPIC (Elector\'s Photo Identity Card) is issued by ECI to every registered voter.</p><h3>How to Get It</h3><ul><li>Register at <strong>voters.eci.gov.in</strong></li><li>Fill <strong>Form 6</strong> with age + address proof</li><li>Card issued within 30 days</li></ul><h3>Updating</h3><ul><li>Form 8: Corrections (name, photo, address)</li><li>Form 6: New registration after moving constituency</li></ul><div class="info-box"><p>📱 Call <strong>1950</strong> or use Voter Helpline App to download e-EPIC (digital voter ID).</p></div><h3>Alternate IDs for Voting</h3><ul><li>Aadhaar, Passport, Driving License, PAN card</li><li>NREGS Job Card, Bank Passbook with photo</li></ul>'}
};
const MISSION_DETAILS={
register:{icon:'📋',title:'Register as a Voter',subtitle:'Step-by-step guide to getting on the electoral roll',steps:[
{title:'Check Eligibility',detail:'You must be 18+ by January 1st of the election year and an Indian citizen.'},
{title:'Visit voters.eci.gov.in',detail:'Click "New Registration" under Voter Registration on the official ECI voter portal.'},
{title:'Fill Form 6',detail:'Enter name, DOB, address, and upload documents (age proof + address proof).'},
{title:'Submit & Track',detail:'Submit online. You receive an application reference number to track status.'},
{title:'BLO Verification',detail:'A Booth Level Officer may visit your address to verify. Cooperate fully.'},
{title:'Receive EPIC',detail:'On approval, Voter ID issued within 30 days. Also downloadable as e-EPIC.'}
]},
booth:{icon:'📍',title:'Find Your Polling Booth',subtitle:'Locate your assigned voting station before election day',steps:[
{title:'Visit ECI Portal',detail:'Go to electoralsearch.eci.gov.in — official electoral roll search.'},
{title:'Search by EPIC Number',detail:'Enter your 10-digit Voter ID OR search by name + state + district.'},
{title:'Get Your Details',detail:'Your entry shows serial number, part number, and polling station.'},
{title:'Note Booth Address',detail:'Note the exact address of your polling station and verify on Google Maps.'},
{title:'Reach Early',detail:'Polling is 7AM–6PM. Arriving by 8AM avoids queues.'}
]},
evm:{icon:'🖥️',title:'How to Vote on an EVM',subtitle:'Your complete election day experience',steps:[
{title:'Queue at Your Booth',detail:'Stand in queue. Separate lines for men, women, and differently-abled voters.'},
{title:'Identity Verification',detail:'Show your EPIC or any approved alternate photo ID to the polling officer.'},
{title:'Get Inked',detail:'Left index finger marked with indelible ink — prevents double voting.'},
{title:'Enter Voting Compartment',detail:'Go to the screened compartment. Complete secrecy of vote guaranteed.'},
{title:'Press Your Candidate Button',detail:'Find your candidate on the EVM and press their button once. A beep confirms.'},
{title:'Check VVPAT Slip',detail:'Paper slip visible in VVPAT window for 7 seconds — verify, then it drops sealed.'}
]},
mcc:{icon:'⚖️',title:'Model Code of Conduct',subtitle:'What\'s allowed and what\'s not during elections',steps:[
{title:'MCC Activates on Announcement',detail:'The moment ECI announces election dates, MCC comes into force immediately.'},
{title:'Government Restrictions',detail:'No new schemes, no foundation stones, no transfers of key officers without ECI nod.'},
{title:'Party Restrictions',detail:'No hate speech, no communal appeals, no use of govt resources for campaigns.'},
{title:'Report Violations',detail:'Use cVIGIL app. ECI must respond within 100 minutes of your complaint.'},
{title:'Cash & Freebies',detail:'Cash above ₹50,000 during elections is monitored. Voter bribery is criminal.'}
]},
results:{icon:'📊',title:'Counting & Results',subtitle:'How your vote travels from EVM to final declaration',steps:[
{title:'Counting Day',detail:'Typically 2-4 days after the last phase of voting.'},
{title:'Strong Room Opening',detail:'EVMs brought to counting centres under CCTV and candidate agents\' watch.'},
{title:'Postal Ballots First',detail:'Postal ballots (service voters, PwD) counted before EVM counting begins.'},
{title:'Round-by-Round Count',detail:'Each round covers one table. Results flashed after each round on ECI site.'},
{title:'Winner Declaration',detail:'When a candidate\'s lead is unbeatable, Returning Officer declares the winner.'}
]},
rights:{icon:'🛡️',title:'Your Voter Rights',subtitle:"What you're entitled to under Indian election law",steps:[
{title:'Right to Secret Ballot',detail:'No one can force you to reveal who you voted for. Booth has screened compartments.'},
{title:'Right to Vote NOTA',detail:'Press NOTA (None Of The Above) if you find no candidate worthy.'},
{title:'Paid Holiday on Election Day',detail:'Your employer must give you a paid holiday on polling day — it\'s the law.'},
{title:'Right to Report Violations',detail:'Use cVIGIL app to report MCC violations, voter bribery, or booth misconduct.'},
{title:'PwD & Senior Citizen Rights',detail:'Priority queuing, wheelchair access, Braille EVMs at every polling station.'}
]}
};
