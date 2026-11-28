
const VISAS = [
  { id:'v-tourist', ic:'🧳', t:'Tourist eVisa', s:'Online visa for eligible nationalities', body:`
    <h4>What it is</h4><p>A tourist visa applied for online through the official Saudi visa platform. Eligible nationalities can usually apply fully online; others may apply through an embassy or visa centre.</p>
    <h4>Typical features</h4><ul><li>Multiple entry, usually valid for one year</li><li>Stays of up to 90 days in total</li><li>Allows tourism, visiting family and Umrah outside the Hajj season</li><li>Does <b>not</b> allow work or Hajj</li></ul>
    <h4>What you usually need</h4><ul><li>Passport valid for at least 6 months</li><li>Passport-style photo</li><li>Accommodation details</li><li>Payment card for the visa fee and mandatory insurance</li></ul>
    <h4>Official source</h4><p>visa.visitsaudi.com</p>` },
  { id:'v-umrah', ic:'🕋', t:'Umrah visa & permits', s:'Via Nusuk or approved agents', body:`
    <h4>How it works</h4><p>Umrah can be performed on an Umrah visa, a tourist eVisa, or most other valid Saudi visas outside Hajj season. Book packages and permits through the <b>Nusuk</b> platform or an approved Umrah agent.</p>
    <h4>Permits inside the Kingdom</h4><ul><li>Book your Umrah time slot and Rawdah visit in the Nusuk app</li><li>Carry your permit on your phone when entering the Haram area</li></ul>
    <h4>Official source</h4><p>nusuk.sa</p>` },
  { id:'v-hajj', ic:'🤲', t:'Hajj', s:'Through your country\u2019s Hajj mission', body:`
    <h4>Registration</h4><p>Hajj requires a dedicated Hajj visa issued under your country's quota. You register through your national Hajj authority or its licensed operators — never through a random online agent.</p>
    <h4>Examples</h4><ul><li><b>Most countries:</b> the national Hajj authority or a licensed Hajj operator</li><li>Western countries: Nusuk Hajj portal</li></ul>
    <div class="note">⚠️ Beware of fake Hajj offers on social media. Only pay through your official Hajj board or a licensed operator.</div>` },
  { id:'v-work', ic:'💼', t:'Work visa & Iqama', s:'Employer-sponsored residency', body:`
    <h4>Process overview</h4><ol><li>Saudi employer issues a job offer and visa authorisation</li><li>Medical check and document attestation in your home country</li><li>Visa stamped through the embassy / visa centre</li><li>After arrival: medical, fingerprints and <b>Iqama</b> (residence ID) issued</li><li>Employment contract documented on <b>Qiwa</b></li></ol>
    <h4>Keep in mind</h4><ul><li>Never pay a "recruiter" to get a job — legitimate employers cover visa costs</li><li>Check your Iqama status and expiry on Absher</li></ul>` },
  { id:'v-family', ic:'👨‍👩‍👧', t:'Family visit visa', s:'For residents inviting family', body:`
    <h4>Who can apply</h4><p>Iqama holders can invite eligible relatives. The request is started by the resident online, then the visa is issued at the embassy or visa centre.</p>
    <h4>Where</h4><ul><li>Ministry of Foreign Affairs visa platform (visa.mofa.gov.sa)</li><li>Extensions are handled through Absher</li></ul>` },
  { id:'v-premium', ic:'🏅', t:'Premium Residency', s:'Long-term residency without a sponsor', body:`
    <h4>Overview</h4><p>Saudi Premium Residency offers several long-term residency categories (such as special talent, investor and property owner) that don't require an employer sponsor.</p>
    <h4>Official source</h4><p>sapr.gov.sa</p>` }
];

const GOV = [
  { id:'g-absher', ic:'🪪', t:'Absher', s:'Iqama, exit/re-entry, traffic', body:`<h4>Absher</h4><p>The Ministry of Interior's platform for individuals and businesses.</p><ul><li>Renew Iqama and issue exit/re-entry visas</li><li>Check and pay traffic violations</li><li>Passport and civil affairs services</li><li>Extend family visit visas</li></ul><p>absher.sa</p>` },
  { id:'g-nafath', ic:'🔐', t:'Nafath', s:'National digital login', body:`<h4>Nafath</h4><p>The national single sign-on app used to verify your identity when logging into government and many private services. Approve login requests in the app using the number shown on screen.</p><div class="note">Never approve a Nafath request you did not start yourself.</div>` },
  { id:'g-tawakkalna', ic:'📲', t:'Tawakkalna', s:'Unified government services app', body:`<h4>Tawakkalna</h4><p>A super-app that brings many government services and digital documents together — digital ID, driving licence, vehicle info and more.</p>` },
  { id:'g-qiwa', ic:'🧑‍💼', t:'Qiwa', s:'Employment contracts & job changes', body:`<h4>Qiwa</h4><p>The Ministry of Human Resources labour platform.</p><ul><li>View and accept employment contracts</li><li>Job mobility (changing employer)</li><li>Work permits and professional verification</li></ul><p>qiwa.sa</p>` },
  { id:'g-nusuk', ic:'🕋', t:'Nusuk', s:'Umrah, Rawdah & Hajj', body:`<h4>Nusuk</h4><p>The official Hajj & Umrah platform: book Umrah permits, Rawdah visits in Madinah, and packages from approved providers.</p><p>nusuk.sa</p>` },
  { id:'g-sehhaty', ic:'🏥', t:'Sehhaty', s:'Health appointments & records', body:`<h4>Sehhaty</h4><p>Ministry of Health app for booking appointments, virtual consultations, sick leave records and vaccination records.</p><p>For medical emergencies call <b>997</b> or <b>911</b>.</p>` },
  { id:'g-more', ic:'🗂️', t:'More platforms', s:'Balady, Ejar, Musaned, Muqeem', body:`<ul><li><b>Balady</b> — municipal services and permits</li><li><b>Ejar</b> — official residential rental contracts</li><li><b>Musaned</b> — domestic worker recruitment</li><li><b>Muqeem</b> — expatriate residency data for employers</li><li><b>SPL National Address</b> — register your official address</li></ul>` }
];

const LIFE = [
  { id:'l-jobs', ic:'🔎', t:'Finding jobs', s:'Legit job channels & scam warning', body:`<h4>Where to look</h4><ul><li><b>Jadarat</b> — national unified employment platform</li><li>Company career pages directly</li><li>LinkedIn and established job boards</li></ul><h4>Red flags</h4><ul><li>Asked to pay for a visa, "processing" or a job slot</li><li>Offer via WhatsApp only, with no company email or contract</li><li>Salary far above normal for the role</li><li>Pressure to decide within hours</li></ul><div class="note">A real Saudi employer covers your visa and recruitment costs.</div>` },
  { id:'l-money', ic:'🏦', t:'Money & banking', s:'SAR, mada, SADAD, remittance', body:`<h4>Basics</h4><ul><li>Currency: Saudi Riyal (SAR), pegged at 3.75 SAR = 1 USD</li><li><b>mada</b> — national debit card network, accepted almost everywhere</li><li><b>SADAD</b> — pay bills and government fees</li><li>VAT is 15% on most goods and services</li></ul><h4>Sending money home</h4><p>Use licensed banks or licensed remittance providers. Compare fees and exchange rates before sending.</p>` },
  { id:'l-housing', ic:'🏠', t:'Housing', s:'Renting safely', body:`<ul><li>Register the lease on <b>Ejar</b> — it protects both tenant and landlord</li><li>Check what's included: water, electricity, maintenance</li><li>Rent is often paid in 2–4 instalments per year</li><li>Get your SPL National Address after moving in</li></ul>` },
  { id:'l-transport', ic:'🚆', t:'Getting around', s:'Metro, trains, taxis', body:`<ul><li><b>Haramain High-Speed Railway</b> — links Makkah, Jeddah (incl. airport), KAEC and Madinah</li><li><b>Riyadh Metro</b> — city rail network in the capital</li><li>Licensed ride-hailing apps and taxis are widely used</li><li>Visitors can drive with an international licence for a limited period</li></ul>` }
];



const CITIES = [
  { id:'c-riyadh', ic:'🏙️', t:'Riyadh', s:'The capital', body:`<p>Saudi Arabia's capital and business hub.</p><ul><li>Diriyah — historic At-Turaif district (UNESCO)</li><li>Kingdom Centre Sky Bridge</li><li>National Museum</li><li>Boulevard City and Riyadh Season events</li><li>Edge of the World escarpment (day trip)</li></ul>` },
  { id:'c-jeddah', ic:'🌊', t:'Jeddah', s:'Red Sea gateway', body:`<p>Main entry point for pilgrims and a coastal city on the Red Sea.</p><ul><li>Al-Balad historic district (UNESCO)</li><li>Jeddah Corniche and King Fahd's Fountain</li><li>Train to Makkah and Madinah</li></ul>` },
  { id:'c-makkah', ic:'🕋', t:'Makkah', s:'The holiest city', body:`<p>Home of Masjid al-Haram and the Kaaba. Entry to Makkah is for Muslims only.</p><ul><li>Masjid al-Haram</li><li>Jabal al-Nour (Cave of Hira)</li><li>Mina, Muzdalifah and Arafat (Hajj sites)</li></ul>` },
  { id:'c-madinah', ic:'🕌', t:'Madinah', s:'City of the Prophet ﷺ', body:`<p>Home of Al-Masjid an-Nabawi.</p><ul><li>Al-Masjid an-Nabawi and the Rawdah (book via Nusuk)</li><li>Quba Mosque</li><li>Mount Uhud</li></ul>` },
  { id:'c-alula', ic:'🏜️', t:'AlUla', s:'Ancient Hegra', body:`<p>Desert landscapes and heritage.</p><ul><li>Hegra — Saudi Arabia's first UNESCO site</li><li>Elephant Rock</li><li>Old Town and Maraya</li></ul>` },
  { id:'c-abha', ic:'⛰️', t:'Abha', s:'Cool mountains', body:`<p>Mountain city in the Asir region, cooler in summer.</p><ul><li>Habala hanging village</li><li>Rijal Almaa heritage village</li><li>Asir National Park</li></ul>` },
  { id:'c-east', ic:'🛢️', t:'Dammam & Khobar', s:'Eastern Province', body:`<p>Gulf coast cities and the heart of the energy industry.</p><ul><li>Khobar Corniche</li><li>Ithra — King Abdulaziz Center for World Culture</li><li>Causeway to Bahrain</li></ul>` },
  { id:'c-redsea', ic:'🏝️', t:'Red Sea coast', s:'New destinations', body:`<p>Large new tourism projects along the Red Sea coast, including island resorts and diving spots. Check official tourism sites for what's open.</p>` }
];





const PHRASES = [
  ['Hello (peace be upon you)','السلام عليكم','as-salāmu ʿalaykum'],
  ['Reply to the greeting','وعليكم السلام','wa ʿalaykum as-salām'],
  ['Good morning','صباح الخير','ṣabāḥ al-khayr'],
  ['Thank you','شكراً','shukran'],
  ['Please','من فضلك','min faḍlak'],
  ['Yes / No','نعم / لا','naʿam / lā'],
  ['Excuse me / Sorry','عفواً / آسف','ʿafwan / āsif'],
  ['How much?','بكم؟','bikam?'],
  ['Where is…?','وين…؟','wēn…?'],
  ['I don\u2019t understand','ما فهمت','mā fihimt'],
  ['Do you speak English?','تتكلم إنجليزي؟','titkallam ingilīzi?'],
  ['The bill, please','الحساب لو سمحت','al-ḥisāb law samaḥt'],
  ['Water','ماء','māʾ'],
  ['Taxi','تاكسي','tāksi'],
  ['Airport','المطار','al-maṭār'],
  ['Mosque','مسجد','masjid'],
  ['Hospital','مستشفى','mustashfa'],
  ['Police','شرطة','shurṭa'],
  ['Help me!','ساعدني','sāʿidni'],
  ['God willing','إن شاء الله','in shāʾ allāh'],
  ['Goodbye','مع السلامة','maʿa as-salāma']
];

const UMRAH_PACK = ['Passport + visa copy','Nusuk app with permits','Ihram (2 sheets) / modest abaya','Ihram belt with pouch','Unscented soap & toiletries','Comfortable sandals','Small prayer mat','Pocket Quran / dua book','Refillable water bottle','Umbrella for sun','Power bank & charger','Basic medicines & plasters','Some SAR cash + mada/Visa card','Small backpack for shoes in the Haram','Photocopies of documents'];


const DUAS = [
  { g:'Umrah & Hajj', t:'Talbiyah', ar:'لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ', tr:'Labbayk Allāhumma labbayk, labbayka lā sharīka laka labbayk, inna al-ḥamda wan-niʿmata laka wal-mulk, lā sharīka lak', en:'Here I am, O Allah, here I am. Here I am, You have no partner, here I am. All praise, blessings and sovereignty belong to You. You have no partner.' },
  { g:'Umrah & Hajj', t:'Between the Yemeni Corner and the Black Stone', ar:'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', tr:'Rabbanā ātinā fid-dunyā ḥasanah, wa fil-ākhirati ḥasanah, wa qinā ʿadhāban-nār', en:'Our Lord, give us good in this world and good in the Hereafter, and protect us from the punishment of the Fire. (Al-Baqarah 2:201)' },
  { g:'Umrah & Hajj', t:'Approaching Safa', ar:'إِنَّ الصَّفَا وَالْمَرْوَةَ مِنْ شَعَائِرِ اللَّهِ', tr:'Inna aṣ-Ṣafā wal-Marwata min shaʿā\'irillāh', en:'Indeed, Safa and Marwah are among the symbols of Allah. (Al-Baqarah 2:158)' },
  { g:'Umrah & Hajj', t:'Drinking Zamzam', ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا وَاسِعًا، وَشِفَاءً مِنْ كُلِّ دَاءٍ', tr:'Allāhumma innī as\'aluka ʿilman nāfiʿā, wa rizqan wāsiʿā, wa shifā\'an min kulli dā\'', en:'O Allah, I ask You for beneficial knowledge, abundant provision and healing from every illness.' },
  { g:'Umrah & Hajj', t:'Day of Arafah', ar:'لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ', tr:'Lā ilāha illallāhu waḥdahū lā sharīka lah, lahul-mulku wa lahul-ḥamd, wa huwa ʿalā kulli shay\'in qadīr', en:'None has the right to be worshipped except Allah alone, without partner. His is the dominion and His is the praise, and He is over all things capable.' },
  { g:'Mosque', t:'Entering the mosque', ar:'اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ', tr:'Allāhumma iftaḥ lī abwāba raḥmatik', en:'O Allah, open for me the doors of Your mercy.' },
  { g:'Mosque', t:'Leaving the mosque', ar:'اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ', tr:'Allāhumma innī as\'aluka min faḍlik', en:'O Allah, I ask You from Your bounty.' },
  { g:'Travel', t:'Dua for travelling', ar:'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ، وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ', tr:'Subḥānal-ladhī sakhkhara lanā hādhā wa mā kunnā lahū muqrinīn, wa innā ilā rabbinā lamunqalibūn', en:'Glory be to the One who has placed this at our service, for we could never have done it ourselves. And to our Lord we will surely return. (Az-Zukhruf 43:13–14)' },
  { g:'Travel', t:'Stopping at a place', ar:'أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ', tr:'Aʿūdhu bikalimātillāhit-tāmmāti min sharri mā khalaq', en:'I seek refuge in the perfect words of Allah from the evil of what He has created.' },
  { g:'Daily', t:'Before sleeping', ar:'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا', tr:'Bismika Allāhumma amūtu wa aḥyā', en:'In Your name, O Allah, I die and I live.' },
  { g:'Daily', t:'On waking up', ar:'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ', tr:'Al-ḥamdu lillāhil-ladhī aḥyānā baʿda mā amātanā wa ilayhin-nushūr', en:'All praise is for Allah who gave us life after causing us to die, and to Him is the return.' },
  { g:'Daily', t:'For worry and grief', ar:'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ', tr:'Allāhumma innī aʿūdhu bika minal-hammi wal-ḥazan', en:'O Allah, I seek refuge in You from worry and grief.' },
  { g:'Daily', t:'Before eating', ar:'بِسْمِ اللَّهِ', tr:'Bismillāh', en:'In the name of Allah.' },
  { g:'Daily', t:'After eating', ar:'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ', tr:'Al-ḥamdu lillāhil-ladhī aṭʿamanī hādhā wa razaqanīhi min ghayri ḥawlin minnī wa lā quwwah', en:'All praise is for Allah who fed me this and provided it for me without any might or power from me.' }
];

const HAJJ = [
  ['Before Hajj','Register through your official Hajj authority, get vaccinations, learn the rites and prepare your Ihram.'],
  ['8 Dhul Hijjah — Yawm at-Tarwiyah','Enter Ihram with the intention for Hajj, recite the Talbiyah and go to Mina. Pray Dhuhr, Asr, Maghrib, Isha and next Fajr there, shortening four-rakʿah prayers.'],
  ['9 Dhul Hijjah — Day of Arafah','After sunrise go to Arafah. Stand in worship and duʿa until sunset — the most important pillar of Hajj. Dhuhr and Asr are joined and shortened.'],
  ['Night of 9th — Muzdalifah','After sunset go to Muzdalifah, pray Maghrib and Isha together, rest under the sky and collect small pebbles.'],
  ['10 Dhul Hijjah — Eid day','Stone Jamarat al-ʿAqabah with 7 pebbles, offer the sacrifice (hady), shave or shorten hair, then perform Tawaf al-Ifadah and Saʿi.'],
  ['11–12 Dhul Hijjah — Days of Tashreeq','Stay in Mina. After midday each day, stone the three Jamarat (small, middle, large) with 7 pebbles each. You may leave on the 12th before sunset.'],
  ['13 Dhul Hijjah (optional)','If you stay, stone the three Jamarat again after midday, then leave Mina.'],
  ['Farewell Tawaf','Perform Tawaf al-Wadaʿ as the last act before leaving Makkah (women in menstruation are excused).']
];

const DOC_TYPES = {
  umrah:{ t:'Umrah', ic:'🕋', items:['Passport valid 6+ months','Umrah visa, tourist eVisa or other valid visa','Nusuk app installed with Umrah permit','Return flight ticket','Hotel booking (Makkah & Madinah)','Health insurance (included with most visas)','Required vaccination certificates (check current rules)','Passport photos (white background)','Copies of passport & visa (paper + phone)','Mahram / group details if required by your agent'] },
  hajj:{ t:'Hajj', ic:'🤲', items:['Passport valid 6+ months','Hajj visa via your official Hajj authority','Hajj permit & group ID card','Meningitis (ACWY) vaccination certificate','Other vaccinations required for your country','Payment receipt from licensed Hajj operator','Passport photos','Emergency contacts & group leader number','Copies of all documents'] },
  tourist:{ t:'Tourist visit', ic:'🧳', items:['Passport valid 6+ months','Tourist eVisa (or embassy visa)','Return / onward ticket','Hotel booking','Travel & medical insurance','Bank card + some SAR cash','International driving permit (if driving)','Copies of passport & visa'] },
  work:{ t:'Work visa / Iqama', ic:'💼', items:['Passport valid 6+ months','Signed job offer / contract','Work visa authorisation from employer','Medical examination report (approved centre)','Attested educational certificates','Police clearance certificate (if requested)','Passport photos','After arrival: medical, fingerprints & Iqama','Contract documented on Qiwa'] },
  family:{ t:'Family visit', ic:'👨‍👩‍👧', items:['Passport valid 6+ months','Family visit visa approval (from resident sponsor)','Copy of sponsor’s Iqama','Proof of relationship (birth / marriage certificate, attested)','Medical insurance','Return ticket','Passport photos'] }
};

const TRAIN = `
  <h4>Haramain High-Speed Railway</h4>
  <p>Fast electric train linking the holy cities and Jeddah.</p>
  <ul><li><b>Makkah</b> station (Al-Rusaifah)</li><li><b>Jeddah</b> — Al-Sulimaniyah station</li><li><b>King Abdulaziz International Airport</b> (Jeddah) station</li><li><b>King Abdullah Economic City</b> (KAEC)</li><li><b>Madinah</b> station</li></ul>
  <h4>Tips</h4><ul><li>Book on the official Haramain railway website or app; tickets sell out around Ramadan, Hajj and weekends</li><li>Arrive at least 30 minutes early — there is a security check</li><li>Luggage size limits apply; check before you travel</li><li>Makkah station is a taxi / bus ride from Masjid al-Haram</li></ul>
  <h4>Main airports</h4><ul><li><b>JED</b> — King Abdulaziz Intl, Jeddah (main gateway for pilgrims)</li><li><b>MED</b> — Prince Mohammad bin Abdulaziz Intl, Madinah</li><li><b>RUH</b> — King Khalid Intl, Riyadh</li><li><b>DMM</b> — King Fahd Intl, Dammam</li></ul>
  <h4>Riyadh Metro</h4><p>City rail network in the capital with multiple colour-coded lines. Pay with a card or the metro app.</p>`;

const CITY_COORDS = {
  Makkah:[21.4225,39.8262], Madinah:[24.4686,39.6142], Riyadh:[24.7136,46.6753], Jeddah:[21.4858,39.1925],
  Dammam:[26.4207,50.0888], Abha:[18.2164,42.5053], Tabuk:[28.3835,36.5662], AlUla:[26.6085,37.9232], Taif:[21.2703,40.4158]
};

const COMPS = [
  ['PL','Premier League'],['CL','Champions League'],['PD','La Liga'],['SA','Serie A'],['BL1','Bundesliga'],['FL1','Ligue 1'],
  ['DED','Eredivisie'],['PPL','Primeira Liga'],['ELC','Championship'],['BSA','Brasileirão'],['WC','World Cup'],['EC','Euros']
];

const NEWS_CATS = [['all','Top'],['saudi','Saudi'],['hajj','Hajj & Umrah'],['business','Business'],['sport','Sport'],['crypto','Pi & Crypto'],['world','World']];

const BADGES = [
  { id:'first', ic:'🌱', t:'First step' },
  { id:'streak3', ic:'🔥', t:'3-day streak' },
  { id:'streak7', ic:'🏅', t:'7-day streak' },
  { id:'streak30', ic:'🏆', t:'30-day streak' },
  { id:'explorer', ic:'🧭', t:'Explorer' },
  { id:'reader', ic:'📰', t:'News reader' },
  { id:'umrah', ic:'🕋', t:'Umrah ready' },
  { id:'dhikr', ic:'📿', t:'100 dhikr' },
  { id:'quran', ic:'📖', t:'Quran reader' },
  { id:'supporter', ic:'💚', t:'Supporter' },
  { id:'premium', ic:'⭐', t:'Premium' },
  { id:'pioneer', ic:'π', t:'Pi Pioneer' }
];

const TIERS = {
  monthly:{ t:'Monthly', price:1, days:30, desc:'30 days of Premium' },
  lifetime:{ t:'Lifetime', price:5, days:null, desc:'Pay once, keep forever' }
};

/* Items registry: every openable screen */
const META = {
  visas:{t:'Visas & residency',ic:'🛂',s:'All visa types'},
  eservices:{t:'Government e-services',ic:'📱',s:'Absher, Nafath, Qiwa…'},
  umrah:{t:'Umrah step by step',ic:'🕋',s:'Ihram to Taqsir'},
  hajj:{t:'Hajj day by day',ic:'🤲',s:'8th–13th Dhul Hijjah'},
  madinah:{t:'Visiting Madinah',ic:'🕌',s:'Rawdah, Quba & etiquette'},
  umrahPack:{t:'Umrah packing checklist',ic:'🎒',s:'Tick off as you pack',prem:true},
  docs:{t:'Document checklist',ic:'📋',s:'Made for your trip type'},
  budget:{t:'Trip budget planner',ic:'💵',s:'SAR · USD · EUR · Pi',prem:true},
  travelPlan:{t:'7-day first-trip plan',ic:'🗺️',s:'Jeddah · Makkah · Madinah',prem:true},
  arrival:{t:'Arrival checklist',ic:'🛬',s:'First 48 hours',prem:true},
  train:{t:'Trains & airports',ic:'🚄',s:'Haramain railway, airports'},
  reminders:{t:'Expiry reminders',ic:'⏰',s:'Iqama, visa, passport'},
  ecard:{t:'Emergency card',ic:'🆘',s:'Offline, on this device'},
  emergency:{t:'Emergency numbers',ic:'🚨',s:'911, 997, 998…'},
  etiquette:{t:'Culture & etiquette',ic:'🤝',s:'Dress, prayer times, Ramadan'},
  weather:{t:'Climate & best time',ic:'☀️',s:'When to visit'},
  converter:{t:'Currency converter',ic:'💱',s:'Live SAR · USD · EUR · Pi'},
  vat:{t:'VAT calculator',ic:'🧮',s:'Add / remove 15%'},
  split:{t:'Bill splitter',ic:'🧾',s:'Share costs + VAT'},
  units:{t:'Unit converter',ic:'📏',s:'km, kg, °C…'},
  phrases:{t:'Arabic phrases',ic:'🗣️',s:'With audio & search'},
  worldclock:{t:'Time difference',ic:'🕰️',s:'KSA vs your time'},
  quran:{t:'Quran',ic:'📖',s:'Read & listen'},
  duas:{t:'Duas',ic:'🤲',s:'By situation, with audio'},
  tasbih:{t:'Tasbih',ic:'📿',s:'Digital counter'},
  qibla:{t:'Qibla finder',ic:'🧭',s:'Direction to the Kaaba'},
  calendar:{t:'Islamic calendar',ic:'📅',s:'Countdowns & converter'},
  zakat:{t:'Zakat calculator',ic:'💰',s:'2.5% of eligible wealth'},
  premium:{t:'DigitalSaudi Premium',ic:'⭐',s:'Monthly or lifetime'},
  support:{t:'Support DigitalSaudi',ic:'💚',s:'Any amount'},
  bookmarks:{t:'Bookmarks',ic:'🔖',s:'Saved guides'},
  recent:{t:'Recently viewed',ic:'🕘',s:''},
  settings:{t:'Settings',ic:'⚙️',s:'Theme, text size'},
  feedback:{t:'Feedback',ic:'💬',s:'Suggest or report'},
  about:{t:'About DigitalSaudi',ic:'ℹ️',s:''},
  saved:{t:'Saved checklists',ic:'✅',s:''}
};

const PERSONA_QA = {
  pilgrim:['umrah','duas','quran','qibla','docs','emergency'],
  visitor:['visas','docs','converter','phrases','wx','emergency'],
  worker:['visas','eservices','reminders','converter','docs','emergency'],
  resident:['eservices','reminders','converter','vat','split','emergency']
};
const PERSONA_FOR = {
  pilgrim:['hajj','madinah','umrahPack','train','travelPlan'],
  visitor:['travelPlan','budget','train','etiquette','c-alula'],
  worker:['v-work','g-qiwa','l-jobs','l-money','l-housing'],
  resident:['g-absher','l-housing','l-money','greenHub','energyCalc']
};

/* ================= CONFIG ================= */
const APP_NAME = 'DigitalSaudi';
const CONTACT_EMAIL = 'support.digitalsaudi.pi@gmail.com';
const PI_ENDPOINTS = { approve:'/approve', complete:'/complete', cancel:'/cancel-payment' };
const REVIEWED = 'September 2026';
const LIVE_ITEMS = { news:{t:'Live news',ic:'📰'}, scores:{t:'Live scores',ic:'⚽'}, markets:{t:'Pi & rates',ic:'📈'}, wx:{t:'Weather',ic:'🌤️'} };
const NOMARK = ['premium','support','settings','feedback','about','bookmarks','recent','saved','search','receipt','article','match','surah','inbox','notifSettings','ai','map','place','trip','tripEdit','addBusiness','biz','event','admin','savedPlaces','cvBuilder','quizRun'];

/* ================= STATE ================= */
let piUser = null;
let pendingAction = null;
let current = null;           // item open in panel
let panelCleanup = null;
const store = {
  get(k, d){ try{ const v = localStorage.getItem('ds_' + k); return v ? JSON.parse(v) : d; }catch(e){ return d; } },
  set(k, v){ try{ localStorage.setItem('ds_' + k, JSON.stringify(v)); }catch(e){} }
};

/* ================= HELPERS ================= */
function $(id){ return document.getElementById(id); }
function toast(msg){ const t = $('toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(t._h); t._h = setTimeout(function(){ t.classList.remove('show'); }, 2800); }
function log(){ try{ console.log.apply(console, ['[DigitalSaudi]'].concat([].slice.call(arguments))); }catch(e){} }
function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
function fmt(n, d){ return Number(n).toLocaleString('en-US', { maximumFractionDigits: d == null ? 2 : d, minimumFractionDigits: 0 }); }
function userKey(){ return piUser ? (piUser.uid || piUser.username) : 'guest'; }
function ksaDate(d){ return new Intl.DateTimeFormat('en-CA', { timeZone:'Asia/Riyadh', year:'numeric', month:'2-digit', day:'2-digit' }).format(d || new Date()); }
function ksaTime(d){ return new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Riyadh', hour:'2-digit', minute:'2-digit' }).format(d); }
function ksaSecondsNow(){
  const p = new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Riyadh', hour:'2-digit', minute:'2-digit', second:'2-digit', hourCycle:'h23' }).formatToParts(new Date());
  const g = function(t){ return parseInt(p.find(function(x){ return x.type === t; }).value, 10); };
  return g('hour') * 3600 + g('minute') * 60 + g('second');
}
function ago(ts){
  const s = Math.max(0, (Date.now() - ts) / 1000);
  if(s < 60) return 'just now'; if(s < 3600) return Math.floor(s/60) + 'm ago'; if(s < 86400) return Math.floor(s/3600) + 'h ago';
  return Math.floor(s/86400) + 'd ago';
}
function daysUntil(dateStr){ const t = new Date(dateStr + 'T00:00:00'); const n = new Date(); n.setHours(0,0,0,0); return Math.round((t - n) / 86400000); }
const HIJRI_M = {
  en:['Muharram','Safar','Rabiʿ I','Rabiʿ II','Jumada I','Jumada II','Rajab','Shaʿban','Ramadan','Shawwal','Dhu al-Qaʿdah','Dhu al-Hijjah'],
  ar:['محرم','صفر','ربيع الأول','ربيع الآخر','جمادى الأولى','جمادى الآخرة','رجب','شعبان','رمضان','شوال','ذو القعدة','ذو الحجة']
};
/* tabular (civil) Hijri — used only when the browser has no working Islamic calendar */
function hijriTabular(d){
  const jd = Math.floor((d.getTime() - d.getTimezoneOffset() * 60000) / 86400000) + 2440588;
  let l = jd - 1948440 + 10632; const n = Math.floor((l - 1) / 10631); l = l - 10631 * n + 354;
  const j = Math.floor((10985 - l) / 5316) * Math.floor(50 * l / 17719) + Math.floor(l / 5670) * Math.floor(43 * l / 15238);
  l = l - Math.floor((30 - j) / 15) * Math.floor(17719 * j / 50) - Math.floor(j / 16) * Math.floor(15238 * j / 43) + 29;
  const m = Math.floor(24 * l / 709);
  return { d: l - Math.floor(709 * m / 24), m: m, y: 30 * n + j - 30 };
}
/* Umm al-Qura where the browser supports it; checked, because some phone browsers
   return Gregorian month names or wrong eras for the Islamic calendar */
function hijriParts(d){
  try{
    const f = new Intl.DateTimeFormat('en-u-ca-islamic-umalqura-nu-latn', { day:'numeric', month:'numeric', year:'numeric' });
    const cal = (f.resolvedOptions().calendar || '');
    if(cal.indexOf('islamic') === 0){
      const p = f.formatToParts(d);
      const g = function(t){ const x = p.find(function(y){ return y.type === t; }); return x ? parseInt(String(x.value).replace(/[^0-9]/g, ''), 10) : 0; };
      const r = { d:g('day'), m:g('month'), y:g('year') || g('relatedYear') };
      const tb = hijriTabular(d);
      if(r.d >= 1 && r.d <= 30 && r.m >= 1 && r.m <= 12 && Math.abs(r.y - tb.y) <= 1) return r;
    }
  }catch(e){}
  return hijriTabular(d);
}
function hijriMonth(m){ return (HIJRI_M[(typeof LANG !== 'undefined' && (LANG === 'ar' || LANG === 'ur')) ? 'ar' : 'en'] || HIJRI_M.en)[m - 1] || ''; }
function hijriOf(d){
  const h = hijriParts(d); if(!h) return '—';
  const ar = typeof LANG !== 'undefined' && (LANG === 'ar' || LANG === 'ur');
  return h.d + ' ' + hijriMonth(h.m) + ' ' + h.y + (ar ? ' هـ' : ' AH');
}
function getJSON(url, ms){
  const ctl = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const t = ctl ? setTimeout(function(){ ctl.abort(); }, ms || 15000) : null;
  return fetch(url, ctl ? { signal: ctl.signal } : {}).then(function(r){ if(t) clearTimeout(t); if(!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
}
function speak(text, lang){
  if(!('speechSynthesis' in window)){ toast('Audio not supported on this device'); return; }
  speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = lang || 'ar-SA'; u.rate = 1; speechSynthesis.speak(u);
}
function reviewedHTML(title){
  return `<div class="reviewed"><span class="tick">✓</span> Last reviewed: ${REVIEWED} · <button style="color:var(--gold);font-weight:700;font-size:12px" onclick="openFeedback('Error in: ${esc(title).replace(/'/g,'')}')">Report an error</button></div>`;
}

/* ================= SETTINGS (theme / size) ================= */
function applySettings(){
  const s = store.get('settings', { theme:'light', zoom:1 });
  document.documentElement.setAttribute('data-theme', s.theme || 'dark');
  document.documentElement.style.setProperty('--zoom', s.zoom || 1);
  const m = document.querySelector('meta[name=theme-color]'); if(m) m.content = s.theme === 'light' ? '#F3F7F4' : '#04150D';
}
function setSetting(k, v){ const s = store.get('settings', { theme:'light', zoom:1 }); s[k] = v; store.set('settings', s); applySettings(); if($('panel').classList.contains('open') && current && current.id === 'settings') openItem('settings'); }

/* ================= ITEM LOOKUP ================= */
function allContent(){ return VISAS.concat(GOV, LIFE, CITIES, EXTRA_CONTENT); }
function itemInfo(id){
  if(META[id]) return META[id];
  if(LIVE_ITEMS[id]) return LIVE_ITEMS[id];
  const c = allContent().find(function(x){ return x.id === id; });
  return c ? { t:c.t, ic:c.ic, s:c.s } : null;
}
function rowHTML(id){
  const m = itemInfo(id); if(!m) return '';
  const locked = m.prem && !isPremium();
  return `<button class="row" onclick="openItem('${id}')"><div class="ic">${m.ic}</div><div class="tx"><b>${esc(m.t)}</b>${m.s ? '<small>' + esc(m.s) + '</small>' : ''}</div>${m.prem ? '<span class="badge">' + (locked ? '🔒 PREMIUM' : '⭐') + '</span>' : '<span class="chev">›</span>'}</button>`;
}
function cardHTML(id, i){
  const m = itemInfo(id); if(!m) return '';
  return `<button class="card" style="animation-delay:${(i||0)*0.03}s" onclick="openItem('${id}')"><div class="ic">${m.ic}</div><h4>${esc(m.t)}${m.prem && !isPremium() ? ' 🔒' : ''}</h4><p>${esc(m.s || '')}</p></button>`;
}

/* ================= RENDER STATIC LISTS ================= */
function tileHTML(id, i){
  const m = itemInfo(id); if(!m) return '';
  return `<button class="tile" style="animation-delay:${(i||0)*0.02}s" onclick="openItem('${id}')"><div class="ic">${m.ic}</div><span>${esc(m.short || m.t)}${m.prem && !isPremium() ? ' 🔒' : ''}</span></button>`;
}
function renderLists(){
  $('svcDocs').innerHTML = ['visas','docs','reminders','ecard'].map(rowHTML).join('');
  $('svcLife').innerHTML = LIFE.map(function(v){ return rowHTML(v.id); }).concat(['k-health','s-scams'].map(rowHTML)).join('');
  $('svcGov').innerHTML = GOV.map(function(v){ return rowHTML(v.id); }).join('');
  $('svcGreen').innerHTML = greenRowsHTML();
  $('deenGrid').innerHTML = ['quran','hadith40','duas','tasbih','qibla','calendar','zakat','hajj','umrah','madinah','umrahPack'].map(tileHTML).join('');
  $('finGrid').innerHTML = ['converter','vat','split','salary','gratuity','zakat','piWallet'].map(tileHTML).join('');
  $('toolGrid').innerHTML = ['transport','units','phrases','worldclock','train','travelPlan','arrival'].map(tileHTML).join('');
  $('safetyRows').innerHTML = ['safety','whatToDo','emergency'].map(rowHTML).join('');
  $('careerRows').innerHTML = ['career'].map(rowHTML).join('');
  $('trvTips').innerHTML = ['etiquette','weather','about'].map(rowHTML).join('');
  $('trvCities').innerHTML = CITIES.map(function(c, i){ return cardHTML(c.id, i); }).join('');
  if($('placeCats')) $('placeCats').innerHTML = PLACE_CATS.filter(function(c){ return c.id !== 'all'; }).map(function(c, i){ return `<button class="tile" style="animation-delay:${i*0.02}s" onclick="openMap('${c.id}')"><div class="ic">${c.ic}</div><span>${c.t}</span></button>`; }).join('');
  if($('expPlan')) $('expPlan').innerHTML = ['trips','transport'].map(rowHTML).join('');
  if($('expList')) $('expList').innerHTML = EXPERIENCES.map(function(x){ return x.img ? `<button class="xp xp-photo" style="background-image:linear-gradient(180deg,rgba(6,20,14,0) 35%,rgba(6,20,14,.78) 100%),url(${x.img});background-color:#0E3B26" onclick="openItem('${x.id}')"><b>${x.t}</b><small>${x.s}</small></button>` : `<button class="xp" style="background:${x.bg}" onclick="openItem('${x.id}')"><span class="e">${x.ic}</span><b>${x.t}</b><small>${x.s}</small></button>`; }).join('');
  if($('expBiz')) $('expBiz').innerHTML = ['directory','piHub','addBusiness'].map(rowHTML).join('');
  if($('knowGrid')) $('knowGrid').innerHTML = KNOW.map(function(k, i){ return cardHTML(k.id, i); }).join('') + cardHTML('knowQuiz', KNOW.length);
  const persona = store.get('persona', 'visitor');
  $('quickActions').innerHTML = (PERSONA_QA[persona] || PERSONA_QA.visitor).map(function(id){
    const m = itemInfo(id); return `<button class="card qa" onclick="openItem('${id}')"><div class="ic">${m.ic}</div><span>${esc(m.short || m.t.replace(' step by step','').replace('Government ',''))}</span></button>`;
  }).join('');
  $('forYou').innerHTML = (PERSONA_FOR[persona] || PERSONA_FOR.visitor).map(rowHTML).join('');
  const pc = ['Makkah','Madinah','Riyadh','Jeddah','Dammam','Taif','Abha','Tabuk'];
  $('prayerCity').innerHTML = pc.map(function(c){ return `<option ${c === prayerCity() ? 'selected' : ''}>${c}</option>`; }).join('');
  $('wxCity').innerHTML = MAP_CITIES.map(function(c){ return `<option ${c === store.get('wxCity','Makkah') ? 'selected' : ''}>${c}</option>`; }).join('');
  if(typeof renderHomeTrip === 'function') renderHomeTrip();
}

/* ================= NAVIGATION ================= */
let activeTab = 'home';
function switchTab(name){
  activeTab = name;
  document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); });
  $('tab-' + name).classList.add('active');
  document.querySelectorAll('nav button').forEach(function(b){ b.classList.toggle('active', b.dataset.tab === name); });
  $('main').scrollTop = 0;
  if(name === 'live') openLive(liveView);
  if(name === 'profile'){ renderProfile(); renderHistory(); renderBadges(); }
  if(name === 'tools'){ loadPrayer(); renderEvents(); }
}
function showPanel(title, html, opts){
  opts = opts || {};
  if(panelCleanup){ try{ panelCleanup(); }catch(e){} panelCleanup = null; }
  current = { id: opts.id || null, title: title };
  $('pTitle').textContent = title;
  $('pBody').innerHTML = html;
  $('pBody').scrollTop = 0;
  const markable = opts.id && NOMARK.indexOf(opts.id) < 0 && !opts.noMark;
  $('pMark').classList.toggle('on', !!markable);
  $('pShare').classList.toggle('on', opts.share !== false && !!opts.id);
  if(markable) $('pMark').textContent = isBookmarked(opts.id) ? '★' : '☆';
  $('overlay').classList.add('open'); $('panel').classList.add('open');
}
function closePanel(){
  if(panelCleanup){ try{ panelCleanup(); }catch(e){} panelCleanup = null; }
  if('speechSynthesis' in window) speechSynthesis.cancel();
  $('overlay').classList.remove('open'); $('panel').classList.remove('open');
  current = null;
  if(location.hash) history.replaceState(null, '', location.pathname);
}
function openItem(id){
  if(LIVE_ITEMS[id]){ closePanel(); openLive(id === 'wx' ? 'weather' : id); return; }
  const c = allContent().find(function(x){ return x.id === id; });
  if(c){
    showPanel(c.t, c.body + reviewedHTML(c.t), { id:id });
  } else if(PANELS[id]){
    const m = META[id];
    if(m && m.prem && !isPremium()){ lockedPanel(id); return; }
    PANELS[id]();
  } else return;
  trackView(id);
}
function lockedPanel(id){
  const m = META[id];
  showPanel(m.t, `<div class="lock-wrap"><div class="big">🔒</div><h3>Premium feature</h3><p class="small" style="margin:6px 0 18px">${esc(m.s)}. Unlock from 1 π a month.</p><button class="btn btn-gold" style="margin:0 auto" onclick="openItem('premium')">See Premium</button></div>`, { id:id, noMark:true });
}

/* ================= BOOKMARKS / RECENT / VIEWS ================= */
function isBookmarked(id){ return store.get('bookmarks_' + userKey(), []).indexOf(id) >= 0; }
function toggleBookmark(){
  if(!current || !current.id) return;
  const k = 'bookmarks_' + userKey(); const list = store.get(k, []); const i = list.indexOf(current.id);
  if(i >= 0){ list.splice(i, 1); toast('Removed from bookmarks'); } else { list.unshift(current.id); toast('🔖 Saved to bookmarks'); }
  store.set(k, list); $('pMark').textContent = i >= 0 ? '☆' : '★';
}
function trackView(id){
  if(NOMARK.indexOf(id) >= 0) return;
  const r = store.get('recent', []).filter(function(x){ return x !== id; }); r.unshift(id); store.set('recent', r.slice(0, 15));
  const v = store.get('viewed', []); if(v.indexOf(id) < 0){ v.push(id); store.set('viewed', v); if(v.length >= 10) award('explorer'); }
}

/* ================= SHARE ================= */
function shareText(title, text, url){
  if(navigator.share){ navigator.share({ title:title, text:text, url:url }).catch(function(){}); return; }
  const full = text + '\n' + url;
  if(navigator.clipboard && navigator.clipboard.writeText){ navigator.clipboard.writeText(full).then(function(){ toast('Link copied — paste it in WhatsApp'); }).catch(function(){ toast(url); }); }
  else toast(url);
}
function shareCurrent(){
  if(!current) return;
  if(current.share) return current.share();
  shareText(current.title, current.title + ' — on DigitalSaudi', location.origin + '/#' + (current.id || ''));
}
function shareApp(){ shareText('DigitalSaudi', 'DigitalSaudi — live news, scores, Pi price, Umrah & Saudi guides in one app. Open it in the Pi Browser:', location.origin); }

/* ================= SEARCH ================= */
function searchIndex(){
  const idx = [];
  allContent().forEach(function(c){ idx.push({ id:c.id, t:c.t, s:c.s, ic:c.ic, x:(c.t + ' ' + c.s + ' ' + c.body.replace(/<[^>]+>/g, ' ')).toLowerCase() }); });
  Object.keys(META).forEach(function(id){ if(['recent','saved'].indexOf(id) < 0) idx.push({ id:id, t:META[id].t, s:META[id].s, ic:META[id].ic, x:(META[id].t + ' ' + META[id].s).toLowerCase() }); });
  Object.keys(LIVE_ITEMS).forEach(function(id){ idx.push({ id:id, t:LIVE_ITEMS[id].t, s:'Live', ic:LIVE_ITEMS[id].ic, x:(LIVE_ITEMS[id].t + ' live football pi price coingecko rate weather news').toLowerCase() }); });
  PHRASES.forEach(function(p){ idx.push({ id:'phrases', t:p[0], s:'Arabic phrase · ' + p[2], ic:'🗣️', x:(p[0] + ' ' + p[2] + ' arabic').toLowerCase() }); });
  DUAS.forEach(function(d){ idx.push({ id:'duas', t:d.t, s:'Dua · ' + d.g, ic:'🤲', x:(d.t + ' ' + d.g + ' ' + d.en + ' dua').toLowerCase() }); });
  return idx;
}
function openSearch(){
  showPanel('Search', `<div class="search-box"><span>🔍</span><input id="sq" type="search" placeholder="Search visas, Umrah, tools, phrases…" oninput="runSearch(this.value)" autocomplete="off"></div><div id="sres"></div>`, { id:'search', share:false });
  runSearch(''); setTimeout(function(){ const i = $('sq'); if(i) i.focus(); }, 250);
}
function runSearch(q){
  q = q.trim().toLowerCase();
  if(!q){
    const rec = store.get('recent', []).slice(0, 6);
    $('sres').innerHTML = '<h4>Popular</h4>' + ['nearMe','trips','hotels','umrah','career','piHub','scores','whatToDo'].map(rowHTML).join('') + (rec.length ? '<h4>Recent</h4>' + rec.map(rowHTML).join('') : '');
    return;
  }
  const terms = q.split(/\s+/); const seen = {};
  const res = searchIndex().filter(function(it){ return terms.every(function(t){ return it.x.indexOf(t) >= 0; }); })
    .filter(function(it){ const k = it.id + it.t; if(seen[k]) return false; seen[k] = 1; return true; })
    .sort(function(a, b){ return (b.t.toLowerCase().indexOf(q) >= 0) - (a.t.toLowerCase().indexOf(q) >= 0); }).slice(0, 30);
  $('sres').innerHTML = res.length ? res.map(function(it){ return `<button class="row" onclick="openItem('${it.id}')"><div class="ic">${it.ic}</div><div class="tx"><b>${esc(it.t)}</b><small>${esc(it.s || '')}</small></div><span class="chev">›</span></button>`; }).join('')
    : '<div class="empty"><div class="big">🔎</div>No results for “' + esc(q) + '”.<br>Try another word.</div>';
}

/* ================= PANELS ================= */
function stepsHTML(arr){ return arr.map(function(s, i){ return `<div class="step" style="animation-delay:${i*0.04}s"><div class="n">${i+1}</div><div><b>${s[0]}</b><p>${s[1]}</p></div></div>`; }).join(''); }

const PANELS = {
  visas: function(){ showPanel('Visas & residency', VISAS.map(function(v){ return rowHTML(v.id); }).join(''), { id:'visas' }); },
  eservices: function(){ showPanel('Government e-services', GOV.map(function(v){ return rowHTML(v.id); }).join(''), { id:'eservices' }); },

  umrah: function(){
    const steps = [
      ['Plan & permits','Get a valid visa and book your Umrah slot in the Nusuk app.'],
      ['Ihram at the Miqat','Bathe, wear Ihram, make the intention (niyyah) for Umrah before crossing the Miqat, and start the Talbiyah.'],
      ['Talbiyah','Keep reciting "Labbayk Allahumma labbayk…" until you begin Tawaf.'],
      ['Tawaf','Circle the Kaaba 7 times anticlockwise, starting and ending at the line of the Black Stone.'],
      ['Two rakʿahs','Pray two rakʿahs, behind Maqam Ibrahim if possible, otherwise anywhere in the Haram.'],
      ['Zamzam','Drink Zamzam water and make duʿa.'],
      ['Saʿi','Walk 7 times between Safa and Marwah, starting at Safa and ending at Marwah.'],
      ['Halq or Taqsir','Men shave or shorten their hair; women cut a fingertip length. Your Umrah is complete.']
    ];
    showPanel('Umrah step by step', `<p style="margin-bottom:14px">A simple overview. Learn the details from a trusted scholar or your group guide.</p>` + stepsHTML(steps) +
      `<h4>Things to avoid in Ihram</h4><ul><li>Perfume and scented products</li><li>Cutting hair or nails</li><li>Men: stitched clothing and covering the head</li><li>Arguing, and marital relations</li></ul>
      <div class="p-actions"><button class="btn btn-ghost btn-sm" onclick="openItem('duas')">🤲 Umrah duas</button><button class="btn btn-ghost btn-sm" onclick="openItem('umrahPack')">🎒 Packing checklist</button><button class="btn btn-ghost btn-sm" onclick="openItem('docs')">📋 Documents</button></div>` + reviewedHTML('Umrah guide'), { id:'umrah' });
  },

  hajj: function(){
    showPanel('Hajj day by day', `<p style="margin-bottom:14px">An overview of Hajj al-Tamattuʿ, the form most international pilgrims perform. Follow your group scholar for rulings.</p>` + stepsHTML(HAJJ) +
      `<div class="note">🕋 Hajj requires a Hajj visa and permit through your country's official Hajj authority.</div>
      <div class="p-actions"><button class="btn btn-ghost btn-sm" onclick="openItem('duas')">🤲 Duas</button><button class="btn btn-ghost btn-sm" onclick="openDocType('hajj')">📋 Hajj documents</button></div>` + reviewedHTML('Hajj guide'), { id:'hajj' });
  },

  madinah: function(){
    showPanel('Visiting Madinah', `<h4>Al-Masjid an-Nabawi</h4><p>Pray in the Prophet's ﷺ mosque and send salawat upon him. Visiting Madinah is recommended but not part of Umrah or Hajj.</p>
      <h4>The Rawdah</h4><p>Visits to the Rawdah are by appointment — book your slot in the Nusuk app and arrive early.</p>
      <h4>Other places</h4><ul><li>Quba Mosque — the first mosque in Islam</li><li>Mount Uhud and the martyrs' cemetery</li><li>Al-Baqi cemetery</li></ul>
      <h4>Etiquette</h4><ul><li>Keep voices low in the mosque</li><li>Follow the guidance of the mosque staff</li><li>Be patient in crowds, especially at prayer times</li></ul>` + reviewedHTML('Madinah guide'), { id:'madinah' });
  },

  umrahPack: function(){ renderChecklist('Umrah packing checklist', 'umrahpack', UMRAH_PACK, 'umrahPack'); },
  arrival: function(){ renderChecklist('Arrival checklist', 'arrival', ['Get a local SIM or eSIM at the airport','Download Nusuk, Tawakkalna and a ride-hailing app','Save emergency numbers (911, 997)','Withdraw some SAR cash','Share your hotel address with family','Check prayer times for your city in the Deen tab','Buy water and stay hydrated','Register with your embassy if staying long'], 'arrival'); },

  travelPlan: function(){
    const days = [['Day 1 — Jeddah','Arrive, rest, evening walk in Al-Balad and the Corniche.'],['Day 2 — To Makkah','Haramain train or road to Makkah. Enter Ihram at the Miqat if coming for Umrah.'],['Day 3 — Umrah','Perform Umrah early morning or late night when it’s cooler and less crowded.'],['Day 4 — Makkah','Prayers in the Haram, visit Jabal al-Nour from the outside, rest.'],['Day 5 — To Madinah','Haramain train to Madinah. Pray in Al-Masjid an-Nabawi.'],['Day 6 — Madinah','Rawdah visit (booked in Nusuk), Quba Mosque, Mount Uhud.'],['Day 7 — Depart','Last prayers, buy dates, head to the airport.']];
    showPanel('7-day first-trip plan', stepsHTML(days) + reviewedHTML('7-day plan'), { id:'travelPlan' });
  },

  docs: function(){
    showPanel('Document checklist', `<p style="margin-bottom:12px">Choose your trip type to get your personal checklist. Progress is saved.</p>` +
      Object.keys(DOC_TYPES).map(function(k){
        const d = DOC_TYPES[k], st = store.get('chk_doc_' + k, {}), done = Object.values(st).filter(Boolean).length;
        return `<button class="row" onclick="openDocType('${k}')"><div class="ic">${d.ic}</div><div class="tx"><b>${d.t}</b><small>${done} of ${d.items.length} ready</small></div><span class="chev">›</span></button>`;
      }).join('') + `<div class="note">Requirements change — confirm with the official visa platform, your airline and your Hajj/Umrah operator.</div>`, { id:'docs' });
  },

  train: function(){ showPanel('Trains & airports', TRAIN + reviewedHTML('Trains & airports'), { id:'train' }); },

  emergency: function(){
    const nums = [['911','Unified emergency number','🚨'],['999','Police','👮'],['997','Ambulance','🚑'],['998','Civil Defence (fire)','🚒'],['993','Traffic police','🚓']];
    showPanel('Emergency numbers', nums.map(function(n){ return `<a class="row" href="tel:${n[0]}"><div class="ic">${n[2]}</div><div class="tx"><b style="font-size:20px">${n[0]}</b><small>${n[1]}</small></div><span class="chev">📞</span></a>`; }).join('') +
      `<button class="row" onclick="openItem('ecard')"><div class="ic">🆘</div><div class="tx"><b>My emergency card</b><small>Your details, works offline</small></div><span class="chev">›</span></button>
      <div class="note">Save your embassy's number on your phone.</div>` + reviewedHTML('Emergency numbers'), { id:'emergency' });
  },

  etiquette: function(){
    showPanel('Culture & etiquette', `<h4>Dress</h4><ul><li>Dress modestly in public — cover shoulders and knees</li><li>Stricter dress applies at mosques and holy sites</li></ul>
      <h4>Daily life</h4><ul><li>The weekend is Friday and Saturday</li><li>Some businesses pause briefly at prayer times</li><li>Use your right hand to eat and to hand things over</li><li>Ask before photographing people, especially women and families</li></ul>
      <h4>Ramadan</h4><ul><li>Don't eat, drink or smoke in public during fasting hours</li><li>Many places open late at night after Iftar</li></ul>
      <h4>Law</h4><ul><li>Alcohol and drugs are illegal, with severe penalties</li><li>Always carry ID — your passport or Iqama</li></ul>` + reviewedHTML('Culture & etiquette'), { id:'etiquette' });
  },

  weather: function(){
    showPanel('Climate & best time', `<ul><li><b>Nov – Mar:</b> most pleasant season for most of the country</li><li><b>Jun – Sep:</b> very hot; Riyadh and Makkah often exceed 40°C</li><li><b>Coast (Jeddah, Dammam):</b> humid in summer</li><li><b>Asir mountains (Abha):</b> mild in summer, popular for holidays</li></ul>
      <div class="note">In summer, drink water often, use an umbrella for shade and avoid the midday sun.</div><button class="btn btn-primary" style="margin:12px auto 0" onclick="openItem('wx')">🌤️ See live weather</button>` + reviewedHTML('Climate'), { id:'weather' });
  },

  /* ---------- tools ---------- */
  converter: function(){
    const curs = currencyList();
    const opts = function(sel){ return curs.map(function(c){ return `<option value="${c[0]}" ${c[0] === sel ? 'selected' : ''}>${c[1]}</option>`; }).join(''); };
    showPanel('Currency converter', `
      <div class="field"><label>Amount</label><input id="cvAmt" type="number" inputmode="decimal" value="100" oninput="calcConv()"></div>
      <div class="two"><div class="field"><label>From</label><select id="cvFrom" onchange="calcConv()">${opts('SAR')}</select></div><div class="field"><label>To</label><select id="cvTo" onchange="calcConv()">${opts('USD')}</select></div></div>
      <button class="btn btn-ghost btn-sm" style="margin:0 auto 12px" onclick="swapConv()">⇅ Swap</button>
      <div class="result"><small id="cvLbl">Result</small><b id="cvOut">—</b></div>
      <p class="small" style="margin-top:12px" id="cvSrc"></p>`, { id:'converter' });
    ensureRates().then(calcConv);
    calcConv();
  },

  vat: function(){
    showPanel('VAT calculator (15%)', `
      <div class="field"><label>Amount (SAR)</label><input id="vatAmt" type="number" inputmode="decimal" value="100" oninput="calcVat()"></div>
      <div class="field"><label>Mode</label><select id="vatMode" onchange="calcVat()"><option value="add">Add VAT to a price</option><option value="rem">Remove VAT from a total</option></select></div>
      <div class="grid"><div class="result"><small>VAT</small><b id="vatV">—</b></div><div class="result"><small id="vatLbl">Total</small><b id="vatT">—</b></div></div>`, { id:'vat' });
    calcVat();
  },

  split: function(){
    showPanel('Bill splitter', `
      <div class="field"><label>Bill amount (SAR)</label><input id="spAmt" type="number" inputmode="decimal" value="300" oninput="calcSplit()"></div>
      <div class="two"><div class="field"><label>People</label><input id="spN" type="number" inputmode="numeric" value="3" min="1" oninput="calcSplit()"></div>
      <div class="field"><label>Tip %</label><input id="spTip" type="number" inputmode="decimal" value="0" oninput="calcSplit()"></div></div>
      <div class="field"><label>VAT</label><select id="spVat" onchange="calcSplit()"><option value="inc">Already included</option><option value="add">Add 15% VAT</option></select></div>
      <div class="grid"><div class="result"><small>Total</small><b id="spT">—</b></div><div class="result"><small>Each person</small><b id="spE">—</b></div></div>`, { id:'split' });
    calcSplit();
  },

  units: function(){
    showPanel('Unit converter', `
      <div class="field"><label>Type</label><select id="unT" onchange="unitOpts()"><option value="len">Distance</option><option value="wt">Weight</option><option value="tmp">Temperature</option><option value="vol">Volume</option><option value="spd">Speed</option></select></div>
      <div class="field"><label>Value</label><input id="unV" type="number" inputmode="decimal" value="1" oninput="calcUnit()"></div>
      <div class="two"><div class="field"><label>From</label><select id="unF" onchange="calcUnit()"></select></div><div class="field"><label>To</label><select id="unTo" onchange="calcUnit()"></select></div></div>
      <div class="result"><small>Result</small><b id="unOut">—</b></div>`, { id:'units' });
    unitOpts();
  },

  phrases: function(){
    showPanel('Arabic phrases', `<div class="search-box"><span>🔍</span><input placeholder="Search phrases" oninput="filterPhrases(this.value)"></div>
      <div class="chips"><button class="chip on" id="phAll" onclick="phraseFav(false)">All</button><button class="chip" id="phFav" onclick="phraseFav(true)">★ Favourites</button></div><div id="phList"></div>`, { id:'phrases' });
    window._phFav = false; filterPhrases('');
  },

  worldclock: function(){
    showPanel('Time difference', `<div class="grid"><div class="result"><small>Saudi Arabia</small><b id="wcK">—</b></div><div class="result"><small>Your time</small><b id="wcL">—</b></div></div>
      <p style="margin-top:14px" id="wcDiff"></p>`, { id:'worldclock' });
    tickWorld(); const h = setInterval(tickWorld, 1000); panelCleanup = function(){ clearInterval(h); };
  },

  zakat: function(){
    showPanel('Zakat calculator', `
      <p style="margin-bottom:12px">Zakat is 2.5% of zakatable wealth held for one lunar year above the nisab. Use one currency throughout.</p>
      <div class="field"><label>Cash & bank savings</label><input id="zk1" type="number" inputmode="decimal" placeholder="0" oninput="calcZakat()"></div>
      <div class="field"><label>Gold & silver value</label><input id="zk2" type="number" inputmode="decimal" placeholder="0" oninput="calcZakat()"></div>
      <div class="field"><label>Business stock & money owed to you</label><input id="zk3" type="number" inputmode="decimal" placeholder="0" oninput="calcZakat()"></div>
      <div class="field"><label>Debts due now (subtract)</label><input id="zk4" type="number" inputmode="decimal" placeholder="0" oninput="calcZakat()"></div>
      <div class="field"><label>Nisab value (same currency)</label><input id="zk5" type="number" inputmode="decimal" placeholder="Value of 85g gold" oninput="calcZakat()"></div>
      <div class="result"><small id="zkMsg">Zakat due</small><b id="zkOut">—</b></div>
      <p class="small" style="margin-top:12px">A general calculator. Ask a qualified scholar about your situation.</p>`, { id:'zakat' });
  },

  budget: function(){
    const b = store.get('budget', { flight:2500, nights:7, hotel:350, food:120, transport:80, visa:500, extra:500 });
    const f = function(id, lbl){ return `<div class="field"><label>${lbl}</label><input id="bg_${id}" type="number" inputmode="decimal" value="${b[id]}" oninput="calcBudget()"></div>`; };
    showPanel('Trip budget planner', `<p class="small" style="margin-bottom:12px">Enter costs in SAR. Totals convert using live rates.</p>
      ${f('flight','Flights (return)')}<div class="two">${f('nights','Nights')}${f('hotel','Hotel per night')}</div>
      <div class="two">${f('food','Food per day')}${f('transport','Transport per day')}</div>
      <div class="two">${f('visa','Visa & insurance')}${f('extra','Gifts & extras')}</div>
      <div class="result"><small>Total (SAR)</small><b id="bgSar">—</b></div>
      <div class="grid-3" style="margin-top:10px"><div class="result"><small>EUR</small><b id="bgNgn" style="font-size:16px">—</b></div><div class="result"><small>USD</small><b id="bgUsd" style="font-size:16px">—</b></div><div class="result"><small>Pi</small><b id="bgPi" style="font-size:16px">—</b></div></div>
      <div id="bgBreak" style="margin-top:14px"></div>`, { id:'budget' });
    ensureRates().then(calcBudget); calcBudget();
  },

  reminders: function(){
    showPanel('Expiry reminders', `<p class="small" style="margin-bottom:12px">Add important dates. You'll see a warning on Home 30 days before expiry. Saved on this device.</p>
      <div class="two"><div class="field"><label>Document</label><select id="rmT"><option>Iqama</option><option>Visa</option><option>Passport</option><option>Exit / re-entry</option><option>Driving licence</option><option>Insurance</option><option>Umrah permit</option><option>Other</option></select></div>
      <div class="field"><label>Expiry date</label><input id="rmD" type="date"></div></div>
      <div class="field"><label>Note (optional)</label><input id="rmN" placeholder="e.g. Mum's visit visa"></div>
      <button class="btn btn-primary" style="margin:0 auto 18px" onclick="addReminder()">＋ Add reminder</button><div id="rmList"></div>`, { id:'reminders' });
    renderReminders();
  },

  ecard: function(){
    const e = store.get('ecard', {});
    const has = e.name || e.contactPhone;
    const view = `<div class="ecard"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><b style="font-size:18px">🆘 EMERGENCY CARD</b><span style="font-size:12px;opacity:.8">DigitalSaudi</span></div>
      ${[['Name','name'],['Nationality','nat'],['Passport / Iqama no.','idno'],['Blood group','blood'],['Medical notes','med'],['Hotel / address','hotel'],['Emergency contact','contactName'],['Contact phone','contactPhone'],['Embassy phone','embassy']].filter(function(f){ return e[f[1]]; }).map(function(f){ return `<div class="l">${f[0]}</div><div class="v">${esc(e[f[1]])}</div>`; }).join('')}
      </div><div class="p-actions">${e.contactPhone ? `<a class="btn btn-primary btn-sm" href="tel:${esc(e.contactPhone)}">📞 Call contact</a>` : ''}${e.embassy ? `<a class="btn btn-ghost btn-sm" href="tel:${esc(e.embassy)}">🏛️ Call embassy</a>` : ''}<a class="btn btn-ghost btn-sm" href="tel:911">🚨 911</a><button class="btn btn-ghost btn-sm" onclick="editEcard()">✏️ Edit</button></div>
      <p class="small" style="margin-top:12px">Stored only on this device and never uploaded. Show this screen to police, medics or hotel staff.</p>`;
    showPanel('Emergency card', has ? view : '<div id="ecForm"></div>', { id:'ecard', share:false });
    if(!has) editEcard();
  },

  /* ---------- deen ---------- */
  duas: function(){
    const groups = DUAS.map(function(d){ return d.g; }).filter(function(g, i, a){ return a.indexOf(g) === i; });
    showPanel('Duas', groups.map(function(g){
      return `<h4>${g}</h4>` + DUAS.map(function(d, i){ return d.g !== g ? '' : `<div class="ayah"><div class="an"><b>${esc(d.t)}</b><button class="speak" onclick="speak(DUAS[${i}].ar)" aria-label="Play">🔊</button></div><div class="ar">${d.ar}</div><div class="phrase tr" style="border:0;padding:0;background:none;margin:4px 0">${esc(d.tr)}</div><div class="en">${esc(d.en)}</div></div>`; }).join('');
    }).join('') + reviewedHTML('Duas'), { id:'duas' });
  },

  tasbih: function(){
    const s = store.get('tasbih', { phrase:0, count:0, target:33, total:0 });
    const P = [['سُبْحَانَ اللَّهِ','SubhanAllah'],['الْحَمْدُ لِلَّهِ','Alhamdulillah'],['اللَّهُ أَكْبَرُ','Allahu Akbar'],['لَا إِلَهَ إِلَّا اللَّهُ','La ilaha illallah'],['أَسْتَغْفِرُ اللَّهَ','Astaghfirullah']];
    showPanel('Tasbih', `<div class="chips" style="justify-content:center;flex-wrap:wrap">${P.map(function(p, i){ return `<button class="chip ${i === s.phrase ? 'on' : ''}" onclick="tasbihPhrase(${i})">${p[1]}</button>`; }).join('')}</div>
      <div class="ar" style="text-align:center;font-size:30px" id="tbAr">${P[s.phrase][0]}</div>
      <button class="tasbih" onclick="tasbihTap()"><b id="tbN">${s.count}</b><small id="tbT">of ${s.target}</small></button>
      <div class="opt" style="justify-content:center">${[33,99,100].map(function(t){ return `<button class="${t === s.target ? 'on' : ''}" onclick="tasbihTarget(${t},this)">${t}</button>`; }).join('')}<button onclick="tasbihReset()">↺ Reset</button></div>
      <p class="small" style="text-align:center;margin-top:14px">Total today and before: <b id="tbTotal">${s.total}</b></p>`, { id:'tasbih', share:false });
    window._tbP = P;
  },

  qibla: function(){
    showPanel('Qibla finder', `<div class="compass"><span class="N">N</span><div class="needle" id="qNeedle"></div><div class="kaaba">🕋</div></div>
      <div class="result"><small>Qibla bearing from North</small><b id="qOut">—</b></div>
      <button class="btn btn-primary" style="margin:16px auto 0" onclick="findQibla()">📍 Use my location</button>
      <p class="small" style="margin-top:12px;text-align:center">The needle turns with your phone's compass where supported. Keep the phone flat and away from metal.</p>`, { id:'qibla' });
    panelCleanup = stopCompass;
  },

  calendar: function(){
    const today = ksaDate();
    showPanel('Islamic calendar', `<div class="result"><small>Today (Umm al-Qura)</small><b>${hijriOf(new Date())}</b></div>
      <h4 style="margin-top:18px">Upcoming dates</h4><div id="calEv"></div>
      <h4>Convert a date</h4><div class="field"><label>Gregorian date</label><input id="hjIn" type="date" value="${today}" onchange="calcHijri()"></div>
      <div class="result"><small>Hijri</small><b id="hjOut">—</b></div>
      <p class="small" style="margin-top:12px">Based on the Umm al-Qura calendar used in Saudi Arabia. Religious dates depend on moon sighting and may differ by a day.</p>`, { id:'calendar' });
    $('calEv').innerHTML = eventsHTML(10); calcHijri();
  },

  quran: function(){ openQuranList(); },

  /* ---------- account ---------- */
  premium: function(){ renderPremium(); },
  support: function(){
    showPanel('Support DigitalSaudi', `<p>Your support keeps DigitalSaudi free, accurate and growing.</p>
      <div class="amounts">${[0.5,1,2,5,10,20].map(function(a){ return `<button class="amt" onclick="selAmt(this,${a})">${a} π</button>`; }).join('')}</div>
      <div class="field"><label>Or enter an amount</label><input id="supAmt" type="number" inputmode="decimal" step="0.1" min="0.1" placeholder="e.g. 3"></div>
      <button class="btn btn-primary" id="supBtn" style="margin:10px auto 0" onclick="sendSupport()">Send support</button>`, { id:'support', share:false });
  },
  bookmarks: function(){
    const list = store.get('bookmarks_' + userKey(), []);
    showPanel('Bookmarks', list.length ? list.map(rowHTML).join('') : '<div class="empty"><div class="big">🔖</div>No bookmarks yet.<br>Tap ☆ on any guide to save it here.</div>', { id:'bookmarks' });
  },
  recent: function(){
    const list = store.get('recent', []);
    showPanel('Recently viewed', list.length ? list.map(rowHTML).join('') : '<div class="empty"><div class="big">🕘</div>Nothing viewed yet.</div>', { id:'recent' });
  },
  saved: function(){
    const a = store.get('chk_umrahpack', {}), b = store.get('chk_arrival', {});
    showPanel('Saved checklists', `<button class="row" onclick="openItem('umrahPack')"><div class="ic">🎒</div><div class="tx"><b>Umrah packing</b><small>${Object.values(a).filter(Boolean).length} of ${UMRAH_PACK.length} done</small></div><span class="chev">›</span></button>
      <button class="row" onclick="openItem('arrival')"><div class="ic">🛬</div><div class="tx"><b>Arrival checklist</b><small>${Object.values(b).filter(Boolean).length} of 8 done</small></div><span class="chev">›</span></button>` + rowHTML('docs'), { id:'saved' });
  },
  settings: function(){
    const s = store.get('settings', { theme:'dark', zoom:1 }), persona = store.get('persona', 'visitor');
    const o = function(k, v, l, cur){ return `<button class="${cur === v ? 'on' : ''}" onclick="setSetting('${k}',${typeof v === 'string' ? "'" + v + "'" : v})">${l}</button>`; };
    showPanel('Settings', `
      <div class="setting"><div><b>Theme</b><div class="small">Dark or light</div></div><div class="opt">${o('theme','dark','🌙',s.theme)}${o('theme','light','☀️',s.theme)}</div></div>
      <div class="setting"><div><b>Text size</b><div class="small">Make everything bigger</div></div><div class="opt">${o('zoom',0.92,'A-',s.zoom)}${o('zoom',1,'A',s.zoom)}${o('zoom',1.1,'A+',s.zoom)}${o('zoom',1.22,'A++',s.zoom)}</div></div>
      <div class="setting"><div><b>I am a…</b><div class="small">Personalises your Home screen</div></div>
        <select style="width:140px" onchange="setPersona(this.value)">${['pilgrim','visitor','worker','resident'].map(function(p){ return `<option value="${p}" ${p === persona ? 'selected' : ''}>${p.charAt(0).toUpperCase() + p.slice(1)}</option>`; }).join('')}</select></div>
      <div class="setting"><div><b>Favourite team</b><div class="small" id="favLbl">${store.get('favTeam', null) ? esc(store.get('favTeam').name) : 'None — pick one in Live › Scores'}</div></div>${store.get('favTeam', null) ? '<button class="btn btn-ghost btn-sm" onclick="setFav(null)">Remove</button>' : ''}</div>
      <div class="setting"><div><b>Welcome tour</b><div class="small">See the intro again</div></div><button class="btn btn-ghost btn-sm" onclick="closePanel();showOnboarding()">Replay</button></div>
      <div class="setting"><div><b>Clear saved data</b><div class="small">Checklists, bookmarks, cache</div></div><button class="btn btn-ghost btn-sm" style="color:var(--danger)" onclick="clearData()">Clear</button></div>`, { id:'settings', share:false });
  },
  feedback: function(){ openFeedback(''); },
  about: function(){
    showPanel('About DigitalSaudi', `<p>DigitalSaudi is a Pi Network app that helps visitors, pilgrims, workers and residents with Saudi Arabia: live news, football scores, the Pi price, visas, e-services, Umrah, Quran and practical tools — in one place.</p>
      <h4>Contact</h4><p><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p><p class="small"><span class="notr" dir="ltr">© 2026 DigitalSaudi</span></p>`, { id:'about' });
  }
};

/* ================= CHECKLISTS ================= */
function renderChecklist(title, key, items, id){
  const st = store.get('chk_' + key, {}); const done = items.filter(function(x, i){ return st[i]; }).length;
  showPanel(title, `<div class="small">${done} of ${items.length} done · saved on this device</div><div class="progress"><i id="chkBar" style="width:${Math.round(done / items.length * 100)}%"></i></div>` + items.map(function(it, i){
    return `<button class="chk ${st[i] ? 'on' : ''}" onclick="toggleChk(this,'${key}',${i},${items.length})"><div class="box">${st[i] ? '✓' : ''}</div><span>${esc(it)}</span></button>`;
  }).join(''), { id:id || null });
}
function toggleChk(el, key, i, total){
  const st = store.get('chk_' + key, {}); st[i] = !st[i]; store.set('chk_' + key, st);
  el.classList.toggle('on', st[i]); el.querySelector('.box').textContent = st[i] ? '✓' : '';
  const done = Object.keys(st).filter(function(k){ return st[k]; }).length;
  if($('chkBar')) $('chkBar').style.width = Math.round(done / total * 100) + '%';
  const sm = $('pBody').querySelector('.small'); if(sm) sm.textContent = done + ' of ' + total + ' done · saved on this device';
  if(done === total){ toast('✅ All done!'); if(key === 'umrahpack') award('umrah'); }
}
function openDocType(k){ const d = DOC_TYPES[k]; renderChecklist(d.t + ' documents', 'doc_' + k, d.items, null); current.id = 'docs'; }

/* ================= FEEDBACK / ECARD / REMINDERS ================= */
function openFeedback(subject){
  showPanel('Feedback', `<p style="margin-bottom:12px">Found a mistake or have an idea? We read every message.</p>
    <div class="field"><label>Type</label><select id="fbT"><option>Suggestion</option><option ${subject ? 'selected' : ''}>Report an error</option><option>Payment issue</option><option>Other</option></select></div>
    <div class="field"><label>Subject</label><input id="fbS" value="${esc(subject)}"></div>
    <div class="field"><label>Message</label><textarea id="fbM" rows="5" placeholder="Tell us more…"></textarea></div>
    <button class="btn btn-primary" style="margin:0 auto" onclick="sendFeedback()">✉️ Send via email</button>
    <p class="small" style="margin-top:12px;text-align:center">Opens your email app, addressed to ${CONTACT_EMAIL}</p>`, { id:'feedback', share:false });
}
function sendFeedback(){
  const t = $('fbT').value, s = $('fbS').value, m = $('fbM').value;
  if(!m.trim()){ toast('Please write a message'); return; }
  const body = m + '\n\n—\nApp: DigitalSaudi v7.2\nUser: ' + (piUser ? '@' + piUser.username : 'guest');
  location.href = 'mailto:' + CONTACT_EMAIL + '?subject=' + encodeURIComponent('[' + t + '] ' + (s || 'DigitalSaudi feedback')) + '&body=' + encodeURIComponent(body);
}
function editEcard(){
  const e = store.get('ecard', {});
  const f = function(k, l, ph){ return `<div class="field"><label>${l}</label><input id="ec_${k}" value="${esc(e[k] || '')}" placeholder="${ph || ''}"></div>`; };
  const html = f('name','Full name') + '<div class="two">' + f('nat','Nationality') + f('blood','Blood group','e.g. O+') + '</div>' + f('idno','Passport / Iqama number (optional)') + f('med','Medical notes (optional)','Allergies, medicines…') + f('hotel','Hotel / address in Saudi') +
    '<div class="two">' + f('contactName','Emergency contact') + f('contactPhone','Contact phone','+234…') + '</div>' + f('embassy','Embassy phone') +
    '<button class="btn btn-primary" style="margin:6px auto 0" onclick="saveEcard()">Save card</button><p class="small" style="margin-top:10px;text-align:center">Stored only on this device.</p>';
  if($('ecForm')) $('ecForm').innerHTML = html; else { $('pBody').innerHTML = html; }
}
function saveEcard(){
  const e = {}; ['name','nat','blood','idno','med','hotel','contactName','contactPhone','embassy'].forEach(function(k){ e[k] = $('ec_' + k).value.trim(); });
  store.set('ecard', e); toast('🆘 Emergency card saved'); PANELS.ecard();
}
function addReminder(){
  const d = $('rmD').value; if(!d){ toast('Choose an expiry date'); return; }
  const list = store.get('reminders', []); list.push({ id:Date.now(), t:$('rmT').value, n:$('rmN').value.trim(), d:d });
  list.sort(function(a, b){ return a.d < b.d ? -1 : 1; }); store.set('reminders', list);
  $('rmN').value = ''; $('rmD').value = ''; renderReminders(); renderHomeAlerts(); toast('⏰ Reminder added');
}
function delReminder(id){ store.set('reminders', store.get('reminders', []).filter(function(r){ return r.id !== id; })); renderReminders(); renderHomeAlerts(); }
function renderReminders(){
  const list = store.get('reminders', []);
  $('rmList').innerHTML = list.length ? list.map(function(r){
    const n = daysUntil(r.d); const cls = n < 0 ? 's-bad' : n <= 30 ? 's-pend' : 's-ok';
    const txt = n < 0 ? 'Expired ' + (-n) + 'd ago' : n === 0 ? 'Expires today' : n + ' days left';
    return `<div class="row"><div class="ic">⏰</div><div class="tx"><b>${esc(r.t)}${r.n ? ' · ' + esc(r.n) : ''}</b><small>${new Date(r.d + 'T00:00:00').toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })} · <span class="status ${cls}">${txt}</span></small></div><button class="speak" onclick="delReminder(${r.id})" aria-label="Delete">🗑️</button></div>`;
  }).join('') : '<div class="empty"><div class="big">⏰</div>No reminders yet.</div>';
}
function renderHomeAlerts(){
  const list = store.get('reminders', []).filter(function(r){ return daysUntil(r.d) <= 30; });
  $('homeAlerts').innerHTML = list.map(function(r){
    const n = daysUntil(r.d);
    return `<button class="alert" onclick="openItem('reminders')">⚠️ <span><b>${esc(r.t)}${r.n ? ' (' + esc(r.n) + ')' : ''}</b> ${n < 0 ? 'expired ' + (-n) + ' days ago' : n === 0 ? 'expires today' : 'expires in ' + n + ' days'} — renew on Absher.</span></button>`;
  }).join('');
}
function setPersona(p){ store.set('persona', p); renderLists(); toast('Home updated for ' + p + 's'); }
function clearData(){
  if(!confirm('Clear checklists, bookmarks, reminders and cached data on this device? Premium bought with Pi is restored when you sign in again.')) return;
  try{ Object.keys(localStorage).filter(function(k){ return k.indexOf('ds_') === 0; }).forEach(function(k){ localStorage.removeItem(k); }); }catch(e){}
  if(window.caches) caches.keys().then(function(ks){ ks.forEach(function(k){ caches.delete(k); }); });
  toast('Data cleared'); setTimeout(function(){ location.reload(); }, 800);
}

/* ================= RATES (FX + PI) ================= */
const CUR_LABELS = [['SAR','🇸🇦 Saudi Riyal (SAR)'],['PI','π Pi (PI)'],['NGN','Naira (NGN)'],['USD','🇺🇸 US Dollar (USD)'],['EUR','🇪🇺 Euro (EUR)'],['GBP','🇬🇧 British Pound (GBP)'],['AED','🇦🇪 UAE Dirham (AED)'],['EGP','🇪🇬 Egyptian Pound (EGP)'],['PKR','🇵🇰 Pakistani Rupee (PKR)'],['INR','🇮🇳 Indian Rupee (INR)'],['XOF','🌍 CFA Franc (XOF)'],['GHS','🇬🇭 Ghana Cedi (GHS)']];
function currencyList(){ return CUR_LABELS; }
function sarPer(code){
  if(code === 'SAR') return 1;
  if(code === 'PI'){ const p = store.get('pi', null); return p && p.sar ? p.sar : (p && p.usd ? p.usd * 3.75 : null); }
  const fx = store.get('fx', null); if(fx && fx.rates && fx.rates[code]) return 1 / fx.rates[code];
  if(code === 'USD') return 3.75;
  return null;
}
function convert(amount, from, to){ const a = sarPer(from), b = sarPer(to); return a && b ? amount * a / b : null; }
function loadFx(force){
  const fx = store.get('fx', null);
  if(!force && fx && Date.now() - fx.t < 6 * 3600000) return Promise.resolve(fx);
  return getJSON('https://open.er-api.com/v6/latest/SAR').then(function(d){
    if(d && d.rates){ const o = { rates:d.rates, t:Date.now(), upd:d.time_last_update_utc }; store.set('fx', o); return o; }
    return fx;
  }).catch(function(){ return fx; });
}
function loadPi(force){
  const p = store.get('pi', null);
  if(!force && p && Date.now() - p.t < 55000) return Promise.resolve(p);
  return getJSON('/pi-price').then(function(d){
    if(d && d.ok && d.usd){ const o = { usd:d.usd, sar:d.sar, ngn:d.ngn, change:d.change24h, spark:d.spark || [], upd:d.updated, src:d.source || '', stale:!!d.stale, t:Date.now() }; store.set('pi', o); return o; }
    return p;
  }).catch(function(){ return p; });
}
function ensureRates(){ return Promise.all([loadFx(), loadPi()]); }

function calcConv(){
  if(!$('cvAmt')) return;
  const a = parseFloat($('cvAmt').value) || 0, f = $('cvFrom').value, t = $('cvTo').value, r = convert(a, f, t);
  $('cvOut').textContent = r == null ? 'Rate unavailable' : fmt(r, r < 1 ? 6 : 2) + ' ' + (t === 'PI' ? 'π' : t);
  $('cvLbl').textContent = fmt(a) + ' ' + f + ' =';
  const fx = store.get('fx', null), pi = store.get('pi', null);
  $('cvSrc').textContent = 'Live rates · FX ' + (fx ? 'updated ' + ago(fx.t) : 'offline') + (pi ? ' · Pi $' + fmt(pi.usd, 4) + ' (' + ago(pi.t) + ')' : '') + '. Rates are indicative.';
}
function swapConv(){ const f = $('cvFrom').value; $('cvFrom').value = $('cvTo').value; $('cvTo').value = f; calcConv(); }
function calcVat(){
  const a = parseFloat($('vatAmt').value) || 0, add = $('vatMode').value === 'add';
  const vat = add ? a * 0.15 : a - a / 1.15;
  $('vatV').textContent = vat.toFixed(2); $('vatT').textContent = (add ? a + vat : a - vat).toFixed(2);
  $('vatLbl').textContent = add ? 'Total with VAT' : 'Price before VAT';
}
function calcSplit(){
  const a = parseFloat($('spAmt').value) || 0, n = Math.max(1, parseInt($('spN').value, 10) || 1), tip = parseFloat($('spTip').value) || 0;
  let t = a * ($('spVat').value === 'add' ? 1.15 : 1); t = t * (1 + tip / 100);
  $('spT').textContent = fmt(t) + ' SAR'; $('spE').textContent = fmt(t / n) + ' SAR';
}
function calcZakat(){
  const v = function(id){ return parseFloat($(id).value) || 0; };
  const net = v('zk1') + v('zk2') + v('zk3') - v('zk4'), nisab = v('zk5');
  if(!nisab){ $('zkOut').textContent = '—'; $('zkMsg').textContent = 'Enter the nisab value'; return; }
  if(net < nisab){ $('zkOut').textContent = '0'; $('zkMsg').textContent = 'Below nisab — no zakat due'; return; }
  $('zkMsg').textContent = 'Zakat due (2.5%)'; $('zkOut').textContent = fmt(net * 0.025);
}
function calcBudget(){
  if(!$('bg_flight')) return;
  const g = function(k){ return parseFloat($('bg_' + k).value) || 0; };
  const b = { flight:g('flight'), nights:g('nights'), hotel:g('hotel'), food:g('food'), transport:g('transport'), visa:g('visa'), extra:g('extra') };
  store.set('budget', b);
  const days = b.nights + 1;
  const parts = [['✈️ Flights', b.flight], ['🏨 Hotel', b.nights * b.hotel], ['🍽️ Food', days * b.food], ['🚕 Transport', days * b.transport], ['🛂 Visa & insurance', b.visa], ['🎁 Extras', b.extra]];
  const tot = parts.reduce(function(s, p){ return s + p[1]; }, 0);
  $('bgSar').textContent = fmt(tot, 0) + ' SAR';
  const c = function(to){ const r = convert(tot, 'SAR', to); return r == null ? '—' : fmt(r, to === 'PI' ? 2 : 0); };
  $('bgNgn').textContent = c('EUR'); $('bgUsd').textContent = c('USD'); $('bgPi').textContent = c('PI');
  $('bgBreak').innerHTML = '<div class="card">' + parts.map(function(p){ const pct = tot ? Math.round(p[1] / tot * 100) : 0; return `<div class="rate"><span>${p[0]}</span><b>${fmt(p[1], 0)} SAR <small class="small">${pct}%</small></b></div>`; }).join('') + '</div>';
}
const UNITS = {
  len:[['km','Kilometres',1000],['m','Metres',1],['mi','Miles',1609.344],['ft','Feet',0.3048]],
  wt:[['kg','Kilograms',1],['g','Grams',0.001],['lb','Pounds',0.45359237],['oz','Ounces',0.0283495]],
  vol:[['l','Litres',1],['ml','Millilitres',0.001],['gal','US gallons',3.78541]],
  spd:[['kmh','km/h',1],['mph','mph',1.609344]],
  tmp:[['c','Celsius'],['f','Fahrenheit']]
};
function unitOpts(){
  const u = UNITS[$('unT').value], o = u.map(function(x){ return `<option value="${x[0]}">${x[1]}</option>`; }).join('');
  $('unF').innerHTML = o; $('unTo').innerHTML = o; $('unTo').selectedIndex = 1; calcUnit();
}
function calcUnit(){
  const t = $('unT').value, v = parseFloat($('unV').value) || 0, f = $('unF').value, to = $('unTo').value;
  let r;
  if(t === 'tmp'){ r = f === to ? v : f === 'c' ? v * 9 / 5 + 32 : (v - 32) * 5 / 9; }
  else { const u = UNITS[t], a = u.find(function(x){ return x[0] === f; })[2], b = u.find(function(x){ return x[0] === to; })[2]; r = v * a / b; }
  $('unOut').textContent = fmt(r, 4) + ' ' + $('unTo').options[$('unTo').selectedIndex].text;
}
function filterPhrases(q){
  q = (q || '').toLowerCase(); const fav = store.get('phFav', []);
  const list = PHRASES.map(function(p, i){ return [p, i]; }).filter(function(x){ return (!window._phFav || fav.indexOf(x[1]) >= 0) && (x[0][0] + ' ' + x[0][2]).toLowerCase().indexOf(q) >= 0; });
  $('phList').innerHTML = list.length ? list.map(function(x){ const p = x[0], i = x[1]; return `<div class="phrase"><div class="t"><div class="en">${esc(p[0])}</div><div class="ar">${p[1]}</div><div class="tr">${esc(p[2])}</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="speak" onclick="speak(PHRASES[${i}][1].split(' / ')[0])" aria-label="Play">🔊</button><button class="speak" onclick="favPhrase(${i},this)" aria-label="Favourite">${fav.indexOf(i) >= 0 ? '★' : '☆'}</button></div></div>`; }).join('')
    : '<div class="empty">' + (window._phFav ? 'No favourites yet — tap ☆ on a phrase.' : 'No phrases found.') + '</div>';
}
function favPhrase(i, el){ const f = store.get('phFav', []); const k = f.indexOf(i); if(k >= 0) f.splice(k, 1); else f.push(i); store.set('phFav', f); el.textContent = k >= 0 ? '☆' : '★'; }
function phraseFav(on){ window._phFav = on; $('phAll').classList.toggle('on', !on); $('phFav').classList.toggle('on', on); filterPhrases(''); }
function tickWorld(){
  if(!$('wcK')) return; const now = new Date();
  $('wcK').textContent = new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Riyadh', hour:'2-digit', minute:'2-digit', second:'2-digit' }).format(now);
  $('wcL').textContent = new Intl.DateTimeFormat('en-GB', { hour:'2-digit', minute:'2-digit', second:'2-digit' }).format(now);
  const diff = 3 + now.getTimezoneOffset() / 60;
  $('wcDiff').textContent = diff === 0 ? 'You are on the same time as Saudi Arabia.' : 'Saudi Arabia is ' + Math.abs(diff) + ' hour' + (Math.abs(diff) === 1 ? '' : 's') + (diff > 0 ? ' ahead of' : ' behind') + ' you.';
}

/* ================= LIVE TAB ================= */
let liveView = 'news', liveTimer = null;
function openLive(v){
  if(activeTab !== 'live'){ activeTab = 'live'; document.querySelectorAll('.tab').forEach(function(t){ t.classList.remove('active'); }); $('tab-live').classList.add('active'); document.querySelectorAll('nav button').forEach(function(b){ b.classList.toggle('active', b.dataset.tab === 'live'); }); $('main').scrollTop = 0; }
  liveView = v;
  document.querySelectorAll('#liveSeg button').forEach(function(b){ b.classList.toggle('on', b.dataset.v === v); });
  document.querySelectorAll('.lv').forEach(function(x){ x.style.display = x.id === 'live-' + v ? 'block' : 'none'; });
  clearInterval(liveTimer);
  if(v === 'news'){ if(!news.items.length) newsReset(); }
  if(v === 'scores'){ renderScoreChips(); loadScores(); liveTimer = setInterval(function(){ if(activeTab === 'live' && liveView === 'scores' && (scoreView === 'live' || scoreView === 'today')) loadScores(true); }, 60000); }
  if(v === 'markets'){ renderMarkets(); loadMarkets(true); liveTimer = setInterval(function(){ if(activeTab === 'live' && liveView === 'markets') loadMarkets(true); }, 60000); }
  if(v === 'weather') loadWeather();
  if(v === 'events'){ renderEventFilters(); if(!evState.list.length) loadEvents(); else renderEventList(); }
}

/* ---------- NEWS ---------- */
const news = { cat:'all', page:1, loading:false, done:false, items:[], byId:{} };
function renderNewsCats(){ $('newsCats').innerHTML = NEWS_CATS.map(function(c){ return `<button class="chip ${c[0] === news.cat ? 'on' : ''}" onclick="setNewsCat('${c[0]}')">${c[1]}</button>`; }).join(''); }
function setNewsCat(c){ news.cat = c; renderNewsCats(); newsReset(); }
function newsSkeleton(){ return '<div class="news-card"><div class="skeleton sk-img" style="border-radius:0;margin:0;height:auto;aspect-ratio:16/9"></div><div class="bd"><div class="skeleton" style="width:40%;margin-bottom:8px"></div><div class="skeleton"></div></div></div>'; }
function newsReset(){ news.page = 1; news.done = false; news.items = []; $('newsList').innerHTML = newsSkeleton() + newsSkeleton(); $('sentinel').innerHTML = ''; loadNews(); }
function loadNews(){
  if(news.loading) return news.pending || Promise.resolve();
  if(news.done) return Promise.resolve();
  news.loading = true; const cat = news.cat;
  if(news.page > 1) $('sentinel').innerHTML = '<div class="spinner" style="border-color:var(--line);border-top-color:var(--accent)"></div>';
  return news.pending = getJSON('/news?cat=' + cat + '&page=' + news.page).then(function(d){
    if(cat !== news.cat) return;
    if(news.page === 1) $('newsList').innerHTML = '';
    const items = (d && d.items) || [];
    items.forEach(function(it){ news.byId[it.id] = it; news.items.push(it); });
    $('newsList').insertAdjacentHTML('beforeend', items.map(newsCardHTML).join(''));
    news.done = !d.hasMore; news.page++;
    if(news.page === 2) store.set('news_' + cat, items);
    $('sentinel').innerHTML = news.done ? (news.items.length ? '<p class="small">You’re all caught up ✓</p>' : '') : '';
    if(!news.items.length) $('newsList').innerHTML = '<div class="empty"><div class="big">📰</div>No stories in this section right now.</div>';
  }).catch(function(){
    if(cat !== news.cat) return;
    const cached = store.get('news_' + cat, []);
    if(news.page === 1 && cached.length){ $('newsList').innerHTML = cached.map(function(it){ news.byId[it.id] = it; return newsCardHTML(it); }).join(''); news.items = cached; news.done = true; $('sentinel').innerHTML = '<p class="small">Showing saved stories (offline)</p>'; }
    else if(news.page === 1) $('newsList').innerHTML = '<div class="empty"><div class="big">📡</div>Couldn’t load news.<br><button class="btn btn-ghost btn-sm" style="margin:12px auto 0" onclick="newsReset()">Try again</button></div>';
    else $('sentinel').innerHTML = '<button class="btn btn-ghost btn-sm" onclick="loadNews()">Load more</button>';
  }).finally(function(){ news.loading = false; });
}
function imgStyle(url){   // v6.7: only http(s) images; quotes, brackets and spaces are percent-encoded so a feed can't break out of the style
  if(!url || !/^https?:\/\//i.test(url)) return 'background-image:linear-gradient(135deg,#0B4A2A,#073019)';
  return `background-image:url('${String(url).replace(/['"()\\\s<>]/g, function(c){ return '%' + c.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0'); }).replace(/&/g, '&amp;')}')`;
}
function catName(c){ const x = NEWS_CATS.find(function(n){ return n[0] === c; }); return x ? x[1] : 'News'; }
function newsCardHTML(it){
  return `<button class="news-card" onclick="openArticle('${it.id}')"><div class="img" style="${imgStyle(it.img)}"><span class="cat">${esc(catName(it.cat))}</span></div><div class="bd"><div class="meta"><b>${esc(it.source)}</b> · ${ago(it.date)}</div><h4>${esc(it.title)}</h4></div></button>`;
}
function newsRowHTML(it){ return `<button class="news-row" onclick="openArticle('${it.id}')"><div class="th" style="${imgStyle(it.img)}"></div><div><b>${esc(it.title)}</b><div class="small">${esc(it.source)} · ${ago(it.date)}</div></div></button>`; }
function openArticle(id){
  const it = news.byId[id]; if(!it) return;
  const r = store.get('readCount', 0) + 1; store.set('readCount', r); if(r >= 5) award('reader');
  showPanel(it.source, `<div class="reader">${it.img ? `<img class="reader-img" src="${esc(it.img)}" alt="" onerror="this.style.display='none'">` : ''}
    <div class="small" style="margin-bottom:6px">${esc(catName(it.cat))} · ${new Date(it.date).toLocaleString('en-GB', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })}</div>
    <h2>${esc(it.title)}</h2><p style="font-size:15.5px;line-height:1.65">${esc(it.summary || '')}</p>
    <button class="btn btn-primary" style="margin:20px auto 0" onclick="readFull('${id}')">Read full article on ${esc(it.source)} ›</button>
    <p class="small" style="text-align:center;margin-top:10px">Opens inside the Pi Browser. Use back to return to DigitalSaudi.</p></div>`, { id:'article' });
  current.share = function(){ shareText(it.title, it.title + ' — via DigitalSaudi', it.link); };
}
function readFull(id){ const it = news.byId[id]; if(it && /^https?:\/\//.test(it.link)) window.location.assign(it.link); }
function loadHomeNews(){
  getJSON('/news?cat=all&page=1').then(function(d){
    const items = ((d && d.items) || []).slice(0, 4); items.forEach(function(it){ news.byId[it.id] = it; });
    if(items.length) store.set('news_home', items);
    $('homeNews').innerHTML = items.length ? items.map(newsRowHTML).join('') : '<p class="small">No news right now.</p>';
  }).catch(function(){
    const c = store.get('news_home', []); c.forEach(function(it){ news.byId[it.id] = it; });
    $('homeNews').innerHTML = c.length ? c.map(newsRowHTML).join('') : `<div class="ds-off">${esc(t('Couldn’t load news.'))} <button class="ds-retry ds-retry-light" onclick="loadHomeNews()">↻ ${esc(t('Try again'))}</button></div>`;
  });
}
function setupInfinite(){
  if(!('IntersectionObserver' in window)){ $('main').addEventListener('scroll', function(){ const m = $('main'); if(liveView === 'news' && activeTab === 'live' && m.scrollTop + m.clientHeight > m.scrollHeight - 600) loadNews(); }); return; }
  new IntersectionObserver(function(es){ if(es[0].isIntersecting && activeTab === 'live' && liveView === 'news' && news.items.length) loadNews(); }, { root:$('main'), rootMargin:'600px' }).observe($('sentinel'));
}

/* ---------- SCORES ---------- */
let scoreComp = store.get('scoreComp', 'ALL'), scoreView = 'today';
const SCORE_VIEWS = [['live','🔴 Live'],['today','Today'],['upcoming','Upcoming'],['results','Results'],['table','Table']];
function renderScoreChips(){
  if(scoreComp === 'ALL' && scoreView === 'table') scoreView = 'today';
  $('compChips').innerHTML = `<button class="chip chip-all ${scoreComp === 'ALL' ? 'on' : ''}" onclick="setComp('ALL')">🌍 All matches</button>` + COMPS.map(function(c){ return `<button class="chip ${c[0] === scoreComp ? 'on' : ''}" onclick="setComp('${c[0]}')">${c[1]}</button>`; }).join('');
  $('scoreViews').innerHTML = SCORE_VIEWS.filter(function(v){ return !(scoreComp === 'ALL' && v[0] === 'table'); }).map(function(v){ return `<button class="chip ${v[0] === scoreView ? 'on' : ''}" onclick="setScoreView('${v[0]}')">${v[1]}</button>`; }).join('');
}
function setComp(c){ scoreComp = c; store.set('scoreComp', c); renderScoreChips(); loadScores(); }
function setScoreView(v){ scoreView = v; renderScoreChips(); loadScores(); }
function scoreSkeleton(){ return '<div class="match"><div class="skeleton" style="width:40%;margin-bottom:10px"></div><div class="skeleton" style="margin-bottom:8px"></div><div class="skeleton"></div></div>'; }
const matchCache = {};
function loadScores(silent){
  const view = scoreView, comp = scoreComp;
  if(!silent) $('scoreList').innerHTML = scoreSkeleton() + scoreSkeleton() + scoreSkeleton();
  let url;
  if(view === 'table') url = '/scores?type=standings&comp=' + comp;
  else if(view === 'live' || view === 'today') url = '/scores?type=window';
  else url = '/scores?type=' + view + '&comp=' + comp;
  getJSON(url).then(function(d){
    if(view !== scoreView || comp !== scoreComp) return;
    if(!d || d.ok === false) throw new Error((d && d.error) || 'unavailable');
    store.set('sc_' + url, d);
    renderScores(d, view, comp);
  }).catch(function(e){
    if(view !== scoreView || comp !== scoreComp) return;
    const c = store.get('sc_' + url, null);
    if(c){ renderScores(c, view, comp); $('scoreList').insertAdjacentHTML('afterbegin', '<p class="small" style="text-align:center;margin-bottom:8px">Showing saved results — couldn’t refresh.</p>'); }
    else $('scoreList').innerHTML = '<div class="empty"><div class="big">⚽</div>Scores are unavailable right now.<br><button class="btn btn-ghost btn-sm" style="margin:12px auto 0" onclick="loadScores()">Try again</button></div>';
  });
}
function renderScores(d, view, comp){
  if(view === 'table') return renderTable(d);
  const all = comp === 'ALL';
  let ms = (d.matches || []).filter(function(m){ return all || m.comp === comp; });
  const todays = all && (view === 'today' || view === 'live') ? (d.matches || []).filter(function(m){ return ksaDate(new Date(m.utc)) === ksaDate() || isLive(m); }) : null;
  if(view === 'live') ms = ms.filter(function(m){ return m.status === 'IN_PLAY' || m.status === 'PAUSED' || m.status === 'LIVE'; });
  if(view === 'today'){ const t = ksaDate(); ms = ms.filter(function(m){ return ksaDate(new Date(m.utc)) === t; }); }
  if(view === 'results') ms = ms.slice().reverse();
  ms.forEach(function(m){ matchCache[m.id] = m; });
  const compName = all ? '' : (COMPS.find(function(c){ return c[0] === comp; }) || [0, comp])[1] + ' ';
  const summary = todays ? scoreSummaryHTML(todays, view) : '';
  if(!ms.length){
    const msg = { live:'No ' + compName + 'matches live right now.', today:'No ' + compName + 'matches today.', upcoming:'No upcoming ' + compName + 'matches in the next ' + (all ? 7 : 10) + ' days.', results:'No ' + compName + 'results in the last ' + (all ? 7 : 10) + ' days.' }[view];
    $('scoreList').innerHTML = summary + `<div class="empty"><div class="big">⚽</div>${msg}${view !== 'upcoming' ? '<br><button class="btn btn-ghost btn-sm" style="margin:12px auto 0" onclick="setScoreView(\'upcoming\')">See upcoming</button>' : ''}</div>`;
    return;
  }
  if(all){ $('scoreList').innerHTML = summary + allMatchesHTML(ms, view); return; }
  let lastDay = '';
  $('scoreList').innerHTML = ms.map(function(m, i){
    const day = new Date(m.utc).toLocaleDateString('en-GB', { timeZone:'Asia/Riyadh', weekday:'short', day:'numeric', month:'short' });
    const head = (view === 'upcoming' || view === 'results') && day !== lastDay ? `<h2 class="sec">${day}</h2>` : ''; lastDay = day;
    return head + matchHTML(m, i);
  }).join('');
}
/* ----- All matches: every competition, grouped league by league ----- */
function compIndex(c){ const i = COMPS.findIndex(function(x){ return x[0] === c; }); return i < 0 ? 99 : i; }
function scoreSummaryHTML(list, view){
  const live = list.filter(isLive).length, done = list.filter(function(m){ return m.status === 'FINISHED'; }).length, next = list.length - live - done;
  return `<div class="sc-sum"><button class="s-live ${view === 'live' ? 'on' : ''}" onclick="setScoreView('live')"><b class="${live ? 'lv' : ''}">${live}</b><small>🔴 Live now</small></button><button class="s-today ${view === 'today' ? 'on' : ''}" onclick="setScoreView('today')"><b>${list.length}</b><small>⚽ Today</small></button><button class="s-next" onclick="setScoreView('today')"><b>${next}</b><small>⏳ Still to play</small></button><button class="s-done" onclick="setScoreView('results')"><b>${done}</b><small>✅ Finished</small></button></div>`;
}
function allMatchesHTML(ms, view){
  const byDay = view === 'upcoming' || view === 'results';
  const days = [], groups = {};
  ms.forEach(function(m){
    matchCache[m.id] = m;
    const day = byDay ? new Date(m.utc).toLocaleDateString('en-GB', { timeZone:'Asia/Riyadh', weekday:'long', day:'numeric', month:'short' }) : '';
    const k = day + '|' + m.comp;
    if(!groups[k]){ groups[k] = { day:day, comp:m.comp, name:m.compName, list:[] }; days.push(k); }
    groups[k].list.push(m);
  });
  const keys = days.slice();
  if(!byDay) keys.sort(function(a, b){ const A = groups[a], B = groups[b]; const la = A.list.some(isLive) ? 0 : 1, lb = B.list.some(isLive) ? 0 : 1; return la - lb || compIndex(A.comp) - compIndex(B.comp); });
  let lastDay = '', i = 0;
  return keys.map(function(k){
    const g = groups[k], live = g.list.filter(isLive).length;
    const dh = byDay && g.day !== lastDay ? `<h2 class="sec">${g.day}</h2>` : ''; lastDay = g.day;
    const label = (COMPS.find(function(c){ return c[0] === g.comp; }) || [0, g.name || g.comp])[1];
    return dh + `<div class="comp-box" data-c="${esc(g.comp)}"><button class="comp-head" onclick="setComp('${esc(g.comp)}')"><span class="comp-badge">${esc(g.comp)}</span><b>${esc(label)}</b>${live ? '<span class="live-b">' + live + ' LIVE</span>' : ''}<small>${g.list.length} ${g.list.length === 1 ? 'match' : 'matches'} ›</small></button>` +
      g.list.map(function(m){ return matchHTML(m, i++); }).join('') + '</div>';
  }).join('');
}
function isLive(m){ return m.status === 'IN_PLAY' || m.status === 'PAUSED' || m.status === 'LIVE'; }
function matchStatus(m){
  if(isLive(m)) return '<span class="live-b">' + (m.status === 'PAUSED' ? 'HT' : 'LIVE' + (m.minute ? ' ' + m.minute + "'" : '')) + '</span>';
  if(m.status === 'FINISHED') return 'FT';
  if(m.status === 'POSTPONED') return 'Postponed';
  if(m.status === 'CANCELLED' || m.status === 'SUSPENDED') return m.status.charAt(0) + m.status.slice(1).toLowerCase();
  return ksaTime(new Date(m.utc));
}
function crest(u){ return u ? `<img src="${esc(u)}" alt="" loading="lazy" onerror="this.style.visibility='hidden'">` : '<span class="crest"></span>'; }
function matchHTML(m, i){
  const fav = store.get('favTeam', null), fid = fav && fav.id;
  const hs = m.home.score, as = m.away.score, played = hs != null && as != null;
  const hw = played && hs > as, aw = played && as > hs;
  const st = isLive(m) ? 'm-live' : m.status === 'FINISHED' ? 'm-ft' : (m.status === 'POSTPONED' || m.status === 'CANCELLED' || m.status === 'SUSPENDED') ? 'm-off' : 'm-up';
  return `<button class="match ${st}${hw || aw ? ' m-dec' : ''}" data-c="${esc(m.comp || '')}" style="animation-delay:${Math.min(i, 10) * 0.045}s" onclick="openMatch(${m.id})"><div class="top"><span>${esc(m.stage || m.compName || '')}${m.matchday ? ' · MD ' + m.matchday : ''}</span><span class="mst">${matchStatus(m)}</span></div>
    <div class="team ${hw ? 'win' : ''}">${crest(m.home.crest)}<span class="nm">${m.home.id === fid ? '★ ' : ''}${esc(m.home.name)}</span><span class="sc">${played ? hs : ''}</span></div>
    <div class="team ${aw ? 'win' : ''}">${crest(m.away.crest)}<span class="nm">${m.away.id === fid ? '★ ' : ''}${esc(m.away.name)}</span><span class="sc">${played ? as : ''}</span></div></button>`;
}
function openMatch(id){
  const m = matchCache[id]; if(!m) return;
  const when = new Date(m.utc).toLocaleString('en-GB', { timeZone:'Asia/Riyadh', weekday:'long', day:'numeric', month:'long', hour:'2-digit', minute:'2-digit' });
  const fav = store.get('favTeam', null);
  const played = m.home.score != null;
  showPanel(m.compName || 'Match', `<div class="card" style="text-align:center">
      <div class="small" style="margin-bottom:12px">${matchStatus(m)}</div>
      <div style="display:grid;grid-template-columns:1fr auto 1fr;align-items:center;gap:8px">
        <div>${m.home.crest ? `<img src="${esc(m.home.crest)}" style="width:56px;height:56px;margin:0 auto 6px;object-fit:contain" alt="">` : ''}<b style="font-size:14px">${esc(m.home.name)}</b></div>
        <div style="font-size:34px;font-weight:900">${played ? m.home.score + ' – ' + m.away.score : 'vs'}</div>
        <div>${m.away.crest ? `<img src="${esc(m.away.crest)}" style="width:56px;height:56px;margin:0 auto 6px;object-fit:contain" alt="">` : ''}<b style="font-size:14px">${esc(m.away.name)}</b></div>
      </div>${m.ht && m.ht.home != null ? `<div class="small" style="margin-top:8px">Half-time: ${m.ht.home} – ${m.ht.away}</div>` : ''}</div>
    <div class="card" style="margin-top:12px"><div class="rate"><span>Kick-off</span><b>${when}</b></div>${m.venue ? `<div class="rate"><span>Venue</span><b>${esc(m.venue)}</b></div>` : ''}${m.matchday ? `<div class="rate"><span>Matchday</span><b>${m.matchday}</b></div>` : ''}<div class="rate" style="border:0"><span>Competition</span><b>${esc(m.compName || '')}</b></div></div>
    <h4>Favourite team</h4><div class="p-actions">
      <button class="btn ${fav && fav.id === m.home.id ? 'btn-gold' : 'btn-ghost'} btn-sm" onclick="setFav({id:${m.home.id},name:'${esc(m.home.name).replace(/'/g, '')}',crest:'${esc(m.home.crest || '')}'})">★ ${esc(m.home.name)}</button>
      <button class="btn ${fav && fav.id === m.away.id ? 'btn-gold' : 'btn-ghost'} btn-sm" onclick="setFav({id:${m.away.id},name:'${esc(m.away.name).replace(/'/g, '')}',crest:'${esc(m.away.crest || '')}'})">★ ${esc(m.away.name)}</button></div>
    <p class="small" style="margin-top:10px">Your favourite team appears on the Home screen.</p>`, { id:'match' });
  current.share = function(){ shareText('Match', m.home.name + (played ? ' ' + m.home.score + '–' + m.away.score + ' ' : ' vs ') + m.away.name + ' — live on DigitalSaudi', location.origin); };
}
function setFav(t){ store.set('favTeam', t); toast(t ? '★ ' + t.name + ' is your team' : 'Favourite team removed'); loadFavTeam(); if(current && current.id === 'match') closePanel(); if(current && current.id === 'settings') openItem('settings'); if(liveView === 'scores') loadScores(true); }
function renderTable(d){
  const fav = store.get('favTeam', null);
  const groups = (d.standings || []);
  if(!groups.length){ $('scoreList').innerHTML = '<div class="empty"><div class="big">📊</div>No table for this competition right now.</div>'; return; }
  $('scoreList').innerHTML = groups.map(function(g){
    return (g.group ? `<h2 class="sec">${esc(g.group.replace('GROUP_', 'Group ').replace(/_/g, ' '))}</h2>` : '') + `<table class="tbl"><tr><th>#</th><th style="text-align:left">Team</th><th>P</th><th>GD</th><th>Pts</th></tr>` +
      g.table.map(function(r){ return `<tr class="${fav && fav.id === r.id ? 'fav' : ''}"><td>${r.pos}</td><td class="tn">${crest(r.crest)}<span>${esc(r.name)}</span></td><td>${r.p}</td><td>${r.gd > 0 ? '+' : ''}${r.gd}</td><td><b>${r.pts}</b></td></tr>`; }).join('') + '</table>';
  }).join('');
}
function loadFavTeam(){
  const fav = store.get('favTeam', null);
  if(!fav){ $('hFavT').textContent = 'Football'; $('hFav').textContent = 'Live scores'; $('hFavD').textContent = 'Tap to follow a team'; return; }
  $('hFavT').textContent = '★ ' + fav.name;
  getJSON('/scores?type=team&id=' + fav.id).then(function(d){
    const ms = (d && d.matches) || []; if(!ms.length) throw 0;
    ms.forEach(function(m){ matchCache[m.id] = m; });
    const live = ms.find(isLive), next = ms.find(function(m){ return m.status === 'SCHEDULED' || m.status === 'TIMED'; }), last = ms.filter(function(m){ return m.status === 'FINISHED'; }).pop();
    const m = live || next || last; const opp = m.home.id === fav.id ? m.away.name : m.home.name;
    $('hFav').innerHTML = (live ? '<span class="live-b">LIVE</span> ' : '') + (m.home.score != null ? m.home.score + '–' + m.away.score : 'vs');
    $('hFavD').textContent = (m.home.id === fav.id ? 'vs ' : '@ ') + opp + (live || m === last ? '' : ' · ' + new Date(m.utc).toLocaleString('en-GB', { timeZone:'Asia/Riyadh', weekday:'short', hour:'2-digit', minute:'2-digit' }));
    $('hFavBox').onclick = function(){ openMatch(m.id); };
  }).catch(function(){ $('hFav').textContent = 'Scores'; $('hFavD').textContent = 'Tap to see matches'; });
}

/* ---------- MARKETS ---------- */
function loadMarkets(force){ Promise.all([loadPi(force), loadFx()]).then(renderMarkets); }
function sparkSVG(arr, color){
  if(!arr || arr.length < 2) return '';
  const min = Math.min.apply(null, arr), max = Math.max.apply(null, arr), rng = max - min || 1;
  const pts = arr.map(function(v, i){ return (i / (arr.length - 1) * 300).toFixed(1) + ',' + (66 - (v - min) / rng * 60).toFixed(1); });
  return `<defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${color}" stop-opacity=".4"/><stop offset="1" stop-color="${color}" stop-opacity="0"/></linearGradient></defs><polygon points="0,70 ${pts.join(' ')} 300,70" fill="url(#sg)"/><polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round"/>`;
}
function renderMarkets(){
  const p = store.get('pi', null);
  if(p && p.usd){
    $('piUsd').textContent = '$' + fmt(p.usd, 4);
    const ch = p.change || 0; $('piChg').textContent = (ch >= 0 ? '▲ ' : '▼ ') + Math.abs(ch).toFixed(2) + '% 24h'; $('piChg').style.color = ch >= 0 ? '#86EFAC' : '#FCA5A5';
    $('piOther').textContent = (p.sar ? fmt(p.sar, 4) + ' SAR' : '');
    $('piSpark').innerHTML = sparkSVG(p.spark, '#FFFFFF');   // white line on the green card; the badge shows up/down
    $('piUpd').textContent = (p.stale ? 'Last known price' : '7-day chart · updated ' + ago(p.t)) + (p.src === 'CoinGecko' ? ' · CoinGecko' : '');
    if($('piSrc')) $('piSrc').textContent = 'PI · live price';
  } else { $('piUsd').textContent = '—'; $('piUpd').textContent = 'Pi price unavailable right now'; }
  const fx = store.get('fx', null);
  if(fx && fx.rates){
    const r = [['🇺🇸 USD','USD',4],['🇪🇺 EUR','EUR',4],['🇬🇧 GBP','GBP',4],['🇦🇪 AED','AED',4],['🇪🇬 EGP','EGP',3],['🇵🇰 PKR','PKR',2],['🇮🇳 INR','INR',2],['🇬🇭 GHS','GHS',3],['🌍 XOF','XOF',2]];
    $('rateList').innerHTML = '<div class="small" style="margin-bottom:4px">1 SAR equals</div>' + r.map(function(x){ return fx.rates[x[1]] ? `<div class="rate"><span>${x[0]}</span><b>${fmt(fx.rates[x[1]], x[2])}</b></div>` : ''; }).join('') +
      (p && p.sar ? `<div class="rate" style="border:0"><span>π PI</span><b>${fmt(1 / p.sar, 4)}</b></div>` : '') + `<div class="small" style="margin-top:6px">${esc(t('Updated'))} ${ago(fx.t)}</div>`;
  }
  // home ticker
  if(p && p.usd){ $('hPi').textContent = '$' + fmt(p.usd, 4); const ch = p.change || 0; $('hPiChg').innerHTML = `<span class="${ch >= 0 ? 'up' : 'down'}">${ch >= 0 ? '▲' : '▼'} ${Math.abs(ch).toFixed(2)}%</span> · 24h`; }
  else $('hPiChg').textContent = 'unavailable';
}

/* ---------- WEATHER ---------- */
const WX = { 0:['☀️','Clear'],1:['🌤️','Mostly clear'],2:['⛅','Partly cloudy'],3:['☁️','Cloudy'],45:['🌫️','Fog'],48:['🌫️','Fog'],51:['🌦️','Drizzle'],53:['🌦️','Drizzle'],55:['🌦️','Drizzle'],61:['🌧️','Rain'],63:['🌧️','Rain'],65:['🌧️','Heavy rain'],80:['🌦️','Showers'],81:['🌧️','Showers'],82:['⛈️','Heavy showers'],95:['⛈️','Thunderstorm'],96:['⛈️','Thunderstorm'],99:['⛈️','Thunderstorm'] };
function wx(c){ return WX[c] || ['🌡️','—']; }
function setWxCity(c){ store.set('wxCity', c); loadWeather(); loadHomeWeather(); }
function fetchWeather(city){
  const c = CITY_COORDS[city];
  return getJSON('/weather?lat=' + c[0] + '&lon=' + c[1])   // MET Norway via our server (CC BY 4.0, cached)
    .then(function(d){ if(!d || !d.ok) throw new Error('weather'); store.set('wx_' + city, d); return d; })
    .catch(function(){ return store.get('wx_' + city, null); });
}
function loadWeather(){
  const city = store.get('wxCity', 'Makkah');
  $('wxBox').innerHTML = '<div class="skeleton" style="height:60px;margin-bottom:10px"></div><div class="skeleton"></div>';
  fetchWeather(city).then(function(d){
    const okD = d && d.daily && Array.isArray(d.daily.time) && d.daily.time.length && Array.isArray(d.daily.temperature_2m_max) && Array.isArray(d.daily.temperature_2m_min) && Array.isArray(d.daily.weather_code); if(d && d.daily && !Array.isArray(d.daily.uv_index_max)) d.daily.uv_index_max = [];
    if(!d || !d.current || !okD){ $('wxBox').innerHTML = '<div class="empty"><div class="big">🌡️</div>Weather unavailable.</div>'; return; }
    const cu = d.current, dy = d.daily, w = wx(cu.weather_code), mx = dy.temperature_2m_max[0], uv = dy.uv_index_max[0];
    const warn = mx >= 45 ? ['🔥 Extreme heat', 'Avoid going out between 11am and 4pm. Drink water constantly, use an umbrella and rest in shade. Seek help for dizziness or confusion.'] : mx >= 40 ? ['☀️ Very hot', 'Drink water often, carry an umbrella and avoid midday sun, especially during Tawaf and Saʿi outdoors.'] : uv >= 8 ? ['🕶️ High UV', 'Wear sunscreen and cover up.'] : null;
    const lo = Math.min.apply(null, dy.temperature_2m_min), hi = Math.max.apply(null, dy.temperature_2m_max);
    $('wxBox').innerHTML = `<div class="wx-now"><div class="e">${w[0]}</div><div><div class="t">${Math.round(cu.temperature_2m)}°</div><div class="small">${w[1]} · feels ${Math.round(cu.apparent_temperature)}°</div></div></div>
      <div class="grid-3" style="margin-top:12px"><div class="pt"><small>Humidity</small><b>${cu.relative_humidity_2m}%</b></div><div class="pt"><small>Wind</small><b>${Math.round(cu.wind_speed_10m)} km/h</b></div><div class="pt"><small>UV max</small><b>${uv == null ? "—" : Math.round(uv)}</b></div></div>
      ${warn ? `<div class="alert" style="margin-top:12px">${warn[0].split(' ')[0]}<span><b>${warn[0].slice(warn[0].indexOf(' ') + 1)}</b> — ${warn[1]}</span></div>` : ''}
      <div class="wx-days">${dy.time.map(function(t, i){ const a = dy.temperature_2m_min[i], b = dy.temperature_2m_max[i], l = (a - lo) / (hi - lo || 1) * 100, r = (b - lo) / (hi - lo || 1) * 100;
        return `<div class="wx-day"><span class="d">${i === 0 ? 'Today' : new Date(t + 'T12:00:00').toLocaleDateString('en-GB', { weekday:'short' })}</span><span>${wx(dy.weather_code[i])[0]}</span><span class="small" style="width:30px;text-align:right">${Math.round(a)}°</span><div style="flex:1;height:6px;background:var(--bg-card);border-radius:3px;position:relative"><div class="bar" style="position:absolute;left:${l}%;right:${100 - r}%;top:0;bottom:0"></div></div><b style="width:30px">${Math.round(b)}°</b></div>`; }).join('')}</div>`
      + '<div class="small" style="margin-top:10px">Weather data: <a href="https://www.met.no/en" target="_blank" rel="noopener">MET Norway</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a> · feels-like and daily values calculated by DigitalSaudi</div>';
  });
}
function loadHomeWeather(){
  const city = store.get('wxCity', 'Makkah'); $('hWxCity').textContent = 'Weather · ' + city;
  fetchWeather(city).then(function(d){
    if(!d || !d.current){ $('hWxD').textContent = 'unavailable'; return; }
    $('hWx').textContent = wx(d.current.weather_code)[0] + ' ' + Math.round(d.current.temperature_2m) + '°';
    const mx = d.daily.temperature_2m_max[0]; $('hWxD').innerHTML = (mx >= 45 ? '<span class="down">🔥 Extreme heat</span> · ' : mx >= 40 ? '<span class="down">Very hot</span> · ' : '') + 'H ' + Math.round(mx) + '° L ' + Math.round(d.daily.temperature_2m_min[0]) + '°';
  });
}

/* ================= PRAYER ================= */
const PRAYERS = ['Fajr','Sunrise','Dhuhr','Asr','Maghrib','Isha'];
function prayerCity(){ return store.get('prayerCity', 'Makkah'); }
function setPrayerCity(c){ store.set('prayerCity', c); loadPrayer(true); }
function getTimings(city){
  const key = 'pt_' + city + '_' + ksaDate(), c = store.get(key, null);
  if(c) return Promise.resolve(c);
  return getJSON('https://api.aladhan.com/v1/timingsByCity?city=' + encodeURIComponent(city) + '&country=Saudi%20Arabia&method=4')
    .then(function(d){ const t = {}; PRAYERS.forEach(function(p){ t[p] = String(d.data.timings[p]).slice(0, 5); }); store.set(key, t); store.set('pt_last_' + city, t); return t; })
    .catch(function(){ return store.get('pt_last_' + city, null); });
}
let timings = null;
function toSec(hhmm){ const p = hhmm.split(':'); return parseInt(p[0], 10) * 3600 + parseInt(p[1], 10) * 60; }
function nextPrayer(){
  if(!timings) return null;
  const now = ksaSecondsNow();
  for(const p of PRAYERS){ if(p === 'Sunrise') continue; const s = toSec(timings[p]); if(s > now) return { name:p, time:timings[p], left:s - now }; }
  return { name:'Fajr', time:timings.Fajr, left:toSec(timings.Fajr) + 86400 - now, tomorrow:true };
}
function loadPrayer(force){
  const city = prayerCity();
  if(force) $('prayerList').innerHTML = '<div class="pt"><div class="skeleton"></div></div><div class="pt"><div class="skeleton"></div></div><div class="pt"><div class="skeleton"></div></div>';
  getTimings(city).then(function(t){
    timings = t;
    $('hpCity').textContent = city; $('dpCityLbl').textContent = city;
    if(!t){ $('prayerList').innerHTML = '<p class="small" style="grid-column:1/-1">Could not load prayer times. Check your connection.</p>'; $('hpIn').textContent = 'unavailable'; return; }
    const n = nextPrayer();
    $('prayerList').innerHTML = PRAYERS.map(function(p){ return `<div class="pt ${n && p === n.name && !n.tomorrow ? 'next' : ''}"><small>${p}${n && p === n.name && !n.tomorrow ? ' · next' : ''}</small><b>${t[p]}</b></div>`; }).join('');
    tickPrayer();
  });
}
function fmtLeft(s){ const h = Math.floor(s / 3600), m = Math.floor(s % 3600 / 60), x = s % 60; return String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(x).padStart(2, '0'); }
let lastNext = null;
function tickPrayer(){
  const n = nextPrayer(); if(!n) return;
  if(lastNext && lastNext !== n.name){ notifyPrayer(lastNext, prayerCity()); loadPrayer(); }
  lastNext = n.name;
  if($('dpName')){ $('dpName').textContent = t(n.name) + ' · ' + n.time; $('dpName').classList.add('notr'); $('dpCount').textContent = fmtLeft(n.left); }
  $('hpName').textContent = n.name + ' ' + n.time;
  const h = Math.floor(n.left / 3600), m = Math.floor(n.left % 3600 / 60); $('hpIn').textContent = 'in ' + (h ? h + 'h ' : '') + m + 'm';
}

/* ================= ISLAMIC EVENTS ================= */
const HIJRI_EVENTS = [[1,1,'Islamic New Year','🌙'],[1,10,'Day of Ashura','🤲'],[9,1,'Ramadan begins','🌙'],[10,1,'Eid al-Fitr','🎉'],[12,8,'Hajj begins','🕋'],[12,9,'Day of Arafah','⛰️'],[12,10,'Eid al-Adha','🐑']];
const GREG_EVENTS = [[2,22,'Saudi Founding Day','🇸🇦'],[9,23,'Saudi National Day','🇸🇦']];
function upcomingEvents(){
  const key = 'events_' + ksaDate(), c = store.get(key, null); if(c) return c;
  const out = [], found = {}, d = new Date(); d.setHours(12, 0, 0, 0);
  for(let i = 0; i < 400 && Object.keys(found).length < HIJRI_EVENTS.length; i++){
    const x = new Date(d.getTime() + i * 86400000), h = hijriParts(x); if(!h) break;
    HIJRI_EVENTS.forEach(function(e, k){ if(!found[k] && h.m === e[0] && h.d === e[1]){ found[k] = 1; out.push({ t:e[2], ic:e[3], date:x.toISOString().slice(0, 10), days:i, h:hijriOf(x) }); } });
  }
  GREG_EVENTS.forEach(function(e){ const y = d.getFullYear(); let x = new Date(y, e[0] - 1, e[1], 12); if(x < d) x = new Date(y + 1, e[0] - 1, e[1], 12); out.push({ t:e[2], ic:e[3], date:x.toISOString().slice(0, 10), days:Math.round((x - d) / 86400000), h:hijriOf(x) }); });
  out.sort(function(a, b){ return a.days - b.days; });
  try{ Object.keys(localStorage).filter(function(k){ return k.indexOf('ds_events_') === 0; }).forEach(function(k){ localStorage.removeItem(k); }); }catch(e){}
  store.set(key, out); return out;
}
function eventsHTML(n){
  return upcomingEvents().slice(0, n).map(function(e){
    return `<div class="row"><div class="ic">${e.ic}</div><div class="tx"><b>${e.t}</b><small>${new Date(e.date + 'T12:00:00').toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short', year:'numeric' })} · ${e.h}</small></div><span class="badge">${e.days === 0 ? 'Today' : e.days + ' days'}</span></div>`;
  }).join('') || '<p class="small">Calendar not supported on this device.</p>';
}
function renderEvents(){ $('deenEvents').innerHTML = eventsHTML(4) + `<button class="btn btn-ghost btn-sm" style="margin:6px auto 0" onclick="openItem('calendar')">Full calendar ›</button>`; }
function calcHijri(){ const v = $('hjIn').value; if(!v) return; $('hjOut').textContent = hijriOf(new Date(v + 'T12:00:00')); }

/* ================= QURAN ================= */
let qAudio = null, qNext = null;
function openQuranList(){
  showPanel('Quran', `<div class="search-box"><span>🔍</span><input placeholder="Search surah name or number" oninput="filterSurah(this.value)"></div>
    ${store.get('lastRead', null) ? `<button class="row" onclick="openSurah(${store.get('lastRead').n})" style="border-color:var(--gold)"><div class="ic">📌</div><div class="tx"><b>Continue reading</b><small>${esc(store.get('lastRead').name)}</small></div><span class="chev">›</span></button>` : ''}
    <div id="surahList">${[1,2,3,4,5,6].map(function(){ return '<div class="row"><div class="skeleton"></div></div>'; }).join('')}</div>`, { id:'quran' });
  const c = store.get('surahs', null);
  (c ? Promise.resolve(c) : getJSON('https://api.alquran.cloud/v1/surah').then(function(d){ store.set('surahs', d.data); return d.data; }))
    .then(function(list){ window._surahs = list; filterSurah(''); })
    .catch(function(){ if($('surahList')) $('surahList').innerHTML = '<div class="empty"><div class="big">📖</div>Couldn’t load the Quran. Check your connection.</div>'; });
}
function filterSurah(q){
  if(!window._surahs || !$('surahList')) return; q = q.toLowerCase().trim();
  $('surahList').innerHTML = window._surahs.filter(function(s){ return !q || String(s.number) === q || s.englishName.toLowerCase().indexOf(q) >= 0 || s.englishNameTranslation.toLowerCase().indexOf(q) >= 0; })
    .map(function(s){ return `<button class="row" onclick="openSurah(${s.number})"><div class="ic" style="font-size:14px;font-weight:800;color:var(--gold)">${s.number}</div><div class="tx"><b>${esc(s.englishName)}</b><small>${esc(s.englishNameTranslation)} · ${s.numberOfAyahs} ayahs · ${s.revelationType}</small></div><span class="ar" style="font-size:18px">${s.name}</span></button>`; }).join('');
}
function openSurah(n){
  showPanel('Surah ' + n, '<div class="ayah"><div class="skeleton" style="height:30px;margin-bottom:10px"></div><div class="skeleton"></div></div><div class="ayah"><div class="skeleton" style="height:30px;margin-bottom:10px"></div><div class="skeleton"></div></div>', { id:'surah' });
  panelCleanup = stopQuranAudio;
  const key = 'surah_' + n, c = store.get(key, null);
  // v6.0: our /quran endpoint (small, cached) first; the public API directly as a backup
  const AU = function(g){ return 'https://cdn.islamic.network/quran/audio/128/ar.alafasy/' + g + '.mp3'; };
  const viaOwn = function(){ return getJSON('/quran?surah=' + n, 30000).then(function(d){
    if(!d || !d.ok) throw new Error('quran');
    return { n:n, name:d.name, tr:d.tr, ar:d.ar, ayahs:d.ayahs.map(function(a){ return { k:a.k, ar:a.ar, en:a.en, au:AU(a.g) }; }) };
  }); };
  const viaApi = function(){ return getJSON('https://api.alquran.cloud/v1/surah/' + n + '/editions/quran-uthmani,en.sahih', 45000).then(function(d){
    return { n:n, name:d.data[0].englishName, tr:d.data[0].englishNameTranslation, ar:d.data[0].name, ayahs:d.data[0].ayahs.map(function(a, i){ return { k:a.numberInSurah, ar:a.text, en:d.data[1].ayahs[i].text, au:AU(a.number) }; }) };
  }); };
  (c ? Promise.resolve(c) : viaOwn().catch(viaApi).then(function(s){ try{ store.set(key, s); }catch(e){} return s; })).then(function(s){
    window._surah = s; store.set('lastRead', { n:n, name:s.name }); award('quran');
    if(!current || current.id !== 'surah') return;
    $('pTitle').textContent = s.name;
    $('pBody').innerHTML = `<div class="result" style="margin-bottom:14px"><small>${esc(s.tr)}</small><b class="ar" style="text-align:center;color:#fff">${s.ar}</b></div>
      <div class="p-actions" style="margin:0 0 14px"><button class="btn btn-primary btn-sm" id="qPlayAll" onclick="playAyah(0,true)">▶ Play all</button><button class="btn btn-ghost btn-sm" onclick="stopQuranAudio()">■ Stop</button>${n > 1 ? `<button class="btn btn-ghost btn-sm" onclick="openSurah(${n - 1})">‹ Prev</button>` : ''}${n < 114 ? `<button class="btn btn-ghost btn-sm" onclick="openSurah(${n + 1})">Next ›</button>` : ''}</div>` +
      s.ayahs.map(function(a, i){ return `<div class="ayah" id="ay${i}"><div class="an"><span class="num">${a.k}</span>${a.au ? `<button class="speak" onclick="playAyah(${i},false)" aria-label="Play">▶</button>` : ''}</div><div class="ar">${a.ar}</div><div class="en">${esc(a.en)}</div></div>`; }).join('') +
      '<p class="small" style="text-align:center">Translation: Saheeh International · Recitation: Mishary Alafasy · via alquran.cloud</p>';
  }).catch(function(){ if(!current || current.id !== 'surah') return; $('pBody').innerHTML = '<div class="empty"><div class="big">📖</div>Couldn’t load this surah. Check your connection.<br><button class="btn btn-ghost btn-sm" style="margin:12px auto 0" onclick="openSurah(' + n + ')">Try again</button></div>'; });
}
// v6.0: three places to get each verse; if one doesn't play, the next is tried automatically
function ayahSources(s, i){
  const a = s.ayahs[i], pad = function(x){ return ('00' + x).slice(-3); }, out = [];
  if(a.au) out.push(a.au);
  out.push('https://everyayah.com/data/Alafasy_128kbps/' + pad(s.n) + pad(a.k) + '.mp3');
  out.push('/quran-audio?s=' + s.n + '&a=' + a.k);
  return out.filter(function(u, k, arr){ return arr.indexOf(u) === k; });
}
function playAyah(i, cont){
  const s = window._surah; if(!s || !s.ayahs[i]) return;
  stopQuranAudio(true);
  const srcs = ayahSources(s, i);
  let k = 0, gave = false;
  const el = $('ay' + i);
  document.querySelectorAll('.ayah.playing').forEach(function(x){ x.classList.remove('playing'); });
  if(el){ el.classList.add('playing'); el.scrollIntoView({ behavior:'smooth', block:'center' }); }
  const next = function(){
    if(gave) return;
    if(k >= srcs.length){ gave = true; if(el) el.classList.remove('playing'); toast('Audio could not play. Check your connection and try again.'); return; }
    const a = (k === 0 && qNext && qNext.i === i) ? qNext.a : new Audio(srcs[k]);
    if(k === 0) qNext = null;
    k++; qAudio = a;
    let failed = false;
    const fail = function(){ if(failed || qAudio !== a) return; failed = true; try{ a.pause(); }catch(e){} next(); };
    a.onerror = fail;
    a.onended = function(){ if(qAudio !== a) return; if(el) el.classList.remove('playing'); if(cont && i + 1 < s.ayahs.length && $('ay' + (i + 1))) playAyah(i + 1, true); };
    const pr = a.play(); if(pr && pr.catch) pr.catch(function(e){ if(e && e.name === 'AbortError') return; if(e && e.name === 'NotAllowedError'){ gave = true; toast('Tap ▶ again to play'); return; } fail(); });
  };
  next();
  // load the next verse while this one plays, so "Play all" has no long pauses
  if(cont && s.ayahs[i + 1]){ const na = new Audio(); na.preload = 'auto'; na.src = ayahSources(s, i + 1)[0]; try{ na.load(); }catch(e){} qNext = { i:i + 1, a:na }; }
}
function stopQuranAudio(keep){ if(qAudio){ qAudio.pause(); qAudio = null; } if(!keep && qNext){ try{ qNext.a.src = ''; }catch(e){} qNext = null; } if(!keep) document.querySelectorAll('.ayah.playing').forEach(function(x){ x.classList.remove('playing'); }); }
function loadDailyAyah(){
  const key = 'ayah_' + ksaDate(), c = store.get(key, null);
  const render = function(a){ $('dailyAyah').innerHTML = `<div class="ar">${a.ar}</div><p style="margin:8px 0 6px;color:var(--text-2);font-size:14.5px">${esc(a.en)}</p><div style="display:flex;justify-content:space-between;align-items:center"><span class="small">${esc(a.ref)}</span><button class="btn btn-ghost btn-sm" onclick="openSurah(${a.s})">Read surah ›</button></div>`; };
  if(c) return render(c);
  const start = new Date(new Date().getFullYear(), 0, 0), doy = Math.floor((new Date() - start) / 86400000);
  const n = (doy * 97 + new Date().getFullYear()) % 6236 + 1;
  getJSON('https://api.alquran.cloud/v1/ayah/' + n + '/editions/quran-uthmani,en.sahih').then(function(d){
    const a = { ar:d.data[0].text, en:d.data[1].text, ref:d.data[0].surah.englishName + ' ' + d.data[0].surah.number + ':' + d.data[0].numberInSurah, s:d.data[0].surah.number };
    try{ Object.keys(localStorage).filter(function(k){ return k.indexOf('ds_ayah_') === 0; }).forEach(function(k){ localStorage.removeItem(k); }); }catch(e){}
    store.set(key, a); render(a);
  }).catch(function(){ if(typeof dsAyahFallback === 'function') dsAyahFallback(); else $('dailyAyah').innerHTML = '<p class="small">Ayah of the day is unavailable offline.</p>'; });
}

/* ================= TASBIH ================= */
function tasbihTap(){
  const s = store.get('tasbih', { phrase:0, count:0, target:33, total:0 });
  s.count++; s.total++;
  if(navigator.vibrate) navigator.vibrate(s.count >= s.target ? [60, 40, 60] : 12);
  if(s.count >= s.target){ toast('✨ ' + s.target + ' complete — ' + window._tbP[s.phrase][1]); s.count = 0; }
  store.set('tasbih', s); $('tbN').textContent = s.count; $('tbTotal').textContent = s.total;
  const b = document.querySelector('.tasbih'); b.style.animation = 'none'; void b.offsetWidth; b.style.animation = 'pop .15s';
  if(s.total >= 100) award('dhikr');
}
function tasbihPhrase(i){ const s = store.get('tasbih', { phrase:0, count:0, target:33, total:0 }); s.phrase = i; s.count = 0; store.set('tasbih', s); PANELS.tasbih(); }
function tasbihTarget(t){ const s = store.get('tasbih', { phrase:0, count:0, target:33, total:0 }); s.target = t; s.count = 0; store.set('tasbih', s); PANELS.tasbih(); }
function tasbihReset(){ const s = store.get('tasbih', { phrase:0, count:0, target:33, total:0 }); s.count = 0; store.set('tasbih', s); $('tbN').textContent = 0; }

/* ================= QIBLA ================= */
let qiblaBearing = null, compassHandler = null;
function findQibla(){
  if(!navigator.geolocation){ toast('Location not available'); return; }
  $('qOut').textContent = 'Locating…';
  navigator.geolocation.getCurrentPosition(function(p){
    const r = Math.PI / 180, lat = p.coords.latitude * r, lon = p.coords.longitude * r, kLat = 21.4225 * r, kLon = 39.8262 * r;
    const y = Math.sin(kLon - lon), x = Math.cos(lat) * Math.tan(kLat) - Math.sin(lat) * Math.cos(kLon - lon);
    qiblaBearing = (Math.atan2(y, x) / r + 360) % 360;
    if(!$('qOut')) return;
    $('qOut').textContent = qiblaBearing.toFixed(1) + '°'; $('qNeedle').style.transform = 'rotate(' + qiblaBearing + 'deg)';
    startCompass();
  }, function(){ if($('qOut')) $('qOut').textContent = '—'; toast('Please allow location access'); }, { enableHighAccuracy:true, timeout:15000 });
}
function startCompass(){
  stopCompass();
  compassHandler = function(e){
    const heading = e.webkitCompassHeading != null ? e.webkitCompassHeading : (e.absolute && e.alpha != null ? 360 - e.alpha : null);
    if(heading == null || qiblaBearing == null || !$('qNeedle')) return;
    $('qNeedle').style.transform = 'rotate(' + ((qiblaBearing - heading + 360) % 360) + 'deg)';
  };
  if(typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function'){
    DeviceOrientationEvent.requestPermission().then(function(s){ if(s === 'granted') window.addEventListener('deviceorientation', compassHandler); }).catch(function(){});
  } else { window.addEventListener('deviceorientationabsolute', compassHandler); window.addEventListener('deviceorientation', compassHandler); }
}
function stopCompass(){ if(compassHandler){ window.removeEventListener('deviceorientationabsolute', compassHandler); window.removeEventListener('deviceorientation', compassHandler); compassHandler = null; } }

/* ================= STREAK & BADGES ================= */
function badgeKey(){ return 'badges_' + userKey(); }
function award(id){
  const b = store.get(badgeKey(), []); if(b.indexOf(id) >= 0) return;
  b.push(id); store.set(badgeKey(), b);
  const x = BADGES.find(function(y){ return y.id === id; }); if(x && id !== 'first') setTimeout(function(){ toast('🏅 Badge unlocked: ' + x.t); }, 600);
  if(activeTab === 'profile') renderBadges();
}
function updateStreak(){
  const today = ksaDate(), s = store.get('streak', { last:null, n:0, best:0 });
  if(s.last !== today){
    const y = ksaDate(new Date(Date.now() - 86400000));
    s.n = s.last === y ? s.n + 1 : 1; s.last = today; s.best = Math.max(s.best, s.n); store.set('streak', s);
    if(s.n > 1) setTimeout(function(){ toast('🔥 ' + s.n + '-day streak — welcome back!'); }, 1200);
  }
  $('streakPill').textContent = s.n;
  if($('streakBest')) $('streakBest').textContent = t(s.n === 1 ? 'day' : 'days') + (s.best > s.n ? ' · ' + t('Best') + ' ' + s.best : '');
  award('first'); if(s.n >= 3) award('streak3'); if(s.n >= 7) award('streak7'); if(s.n >= 30) award('streak30');
}
function renderBadges(){
  const got = store.get(badgeKey(), []);
  $('badgeCount').textContent = got.length + '/' + BADGES.length;
  $('badgeGrid').innerHTML = BADGES.map(function(b){ return `<div class="bdg ${got.indexOf(b.id) >= 0 ? 'got' : ''}"><span>${b.ic}</span>${b.t}</div>`; }).join('');
}

/* ================= PREMIUM ================= */
function premKey(){ return 'prem_' + userKey(); }
function getPremium(){ return store.get(premKey(), null); }
function isPremium(){ const p = getPremium(); return !!(p && (p.tier === 'lifetime' || (p.expires && p.expires > Date.now()))); }
function premiumLabel(){
  const p = getPremium(); if(!isPremium()) return p && p.expires ? 'Expired — renew from 1 π' : 'Not active';
  return p.tier === 'lifetime' ? 'Lifetime ⭐' : 'Monthly ⭐ · until ' + new Date(p.expires).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' });
}
function syncPremium(){
  if(!piUser || !piUser.uid) return Promise.resolve();
  return getJSON('/premium?uid=' + encodeURIComponent(piUser.uid)).then(function(d){
    if(d && d.ok && d.premium){ store.set(premKey(), d.premium); if(isPremium()) award('premium'); refreshPremiumUI(); }
  }).catch(function(){});
}
function recordPremium(paymentId, tier){
  const local = function(){ const cur = getPremium(), base = cur && cur.expires > Date.now() ? cur.expires : Date.now();
    store.set(premKey(), tier === 'lifetime' ? { tier:'lifetime' } : { tier:'monthly', expires: base + 30 * 86400000 }); };
  return fetch('/premium', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ paymentId:paymentId }) })
    .then(function(r){ return r.json(); })
    .then(function(d){ if(d && d.ok && d.premium) store.set(premKey(), d.premium); else local(); })
    .catch(local)
    .then(function(){ award('premium'); refreshPremiumUI(); });
}
function refreshPremiumUI(){ renderLists(); renderProfile(); if($('panel').classList.contains('open') && current && current.id === 'premium') renderPremium(); }
function renderPremium(){
  const on = isPremium();
  const perks = ['Umrah packing checklist','7-day Jeddah · Makkah · Madinah plan','Arrival checklist for your first 48 hours','Trip budget planner with live SAR · USD · Pi','Premium badge ⭐ and supporter status','Supports new features and updates'];
  showPanel('DigitalSaudi Premium', (on ? `<div class="lock-wrap"><div class="big">⭐</div><h3>Premium is active</h3><p class="small">${premiumLabel()}</p></div>` + ['umrahPack','travelPlan','arrival','budget'].map(rowHTML).join('') : `<div class="lock-wrap"><div class="big">⭐</div><h3>Go Premium</h3><p class="small">Unlock planners and checklists for your trip.</p></div>`) +
    `<h4>What you get</h4><ul>${perks.map(function(p){ return '<li>' + p + '</li>'; }).join('')}</ul>` +
    (getPremium() && getPremium().tier === 'lifetime' ? '' : `<h4>${on ? 'Extend or upgrade' : 'Choose a plan'}</h4>` +
      Object.keys(TIERS).map(function(k){ const t = TIERS[k]; return `<button class="tier ${k === 'lifetime' ? 'best' : ''}" id="tier_${k}" onclick="buyPremium('${k}')">${k === 'lifetime' ? '<span class="rib">BEST VALUE</span>' : ''}<div style="display:flex;justify-content:space-between;align-items:center"><div><b style="font-size:17px">${t.t}</b><div class="small">${t.desc}</div></div><div class="pr">${t.price} π</div></div></button>`; }).join('') +
      '<p class="small" style="text-align:center">Requires the Pi Browser and a Pi sign-in. Premium is linked to your Pi account and restored on any device.</p><p class="small" style="text-align:center;margin-top:8px">Seeing “Pending payment found”? <button style="color:var(--gold);font-weight:700;font-size:12.5px" onclick="clearStuckPayment()">Fix it</button></p>'), { id:'premium', share:false });
}
function buyPremium(tier){
  const t = TIERS[tier];
  submitPiPayment(t.price, 'DigitalSaudi Premium — ' + t.t, { type:'premium', tier:tier, app:APP_NAME, uid: piUser ? piUser.uid : null }, $('tier_' + tier));
}

/* ================= PI AUTH ================= */
/* Pi.init must run only once per page: calling it again before every sign-in can leave Pi.authenticate waiting. */
let piInited = false, authInFlight = null, authStartedAt = 0;
const PI_SANDBOX = (function(){ try{ const r = document.referrer || '', a = location.ancestorOrigins ? [].slice.call(location.ancestorOrigins).join(' ') : ''; return /sandbox\.minepi\.com/.test(r + ' ' + a); }catch(e){ return false; } })();
function initPi(){ if(!piInited && typeof Pi !== 'undefined'){ try{ Pi.init({ version:'2.0', sandbox:PI_SANDBOX }); piInited = true; }catch(e){ log('Pi.init failed', e); } } }
/* Start the Pi SDK as soon as the page opens (like FinPi), so Pi is ready before anyone taps Sign in. */
if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initPi, { once:true }); else initPi();
function onPiAuth(auth){
  piUser = auth.user; piUser.accessToken = auth.accessToken;
  log('✅ Authenticated:', piUser.username);
  store.set('lastUser', piUser.username);
  enterApp();
  award('pioneer');
  toast('Welcome, @' + piUser.username);
  syncPremium();
  if(pendingAction){ const a = pendingAction; pendingAction = null; a(); }
}
/* One shared Pi sign-in. Two Pi.authenticate calls at the same time (sign-in button, "Fix pending payment",
   a payment) make the Pi Browser hang or fail, so every caller waits for the same request. */
let authRetried = false;
/* Pi's own connection check can fail on a weak signal ("Network error…"). That is retried automatically,
   a few times with short pauses, before anything is shown; a new request only starts after the last one ended. */
const NET_ERR = /network|timeout|timed out|failed to fetch|consent|connection|offline/i;
function piAuth(){
  initPi();
  if(!authInFlight || Date.now() - authStartedAt >= 20000){
    log('Sign-in started');
    authStartedAt = Date.now();
    const run = function(tries){
      return Pi.authenticate(['username','payments','wallet_address'], onIncompletePaymentFound).then(function(auth){
        if(!piUser) onPiAuth(auth); else piUser.accessToken = auth.accessToken;
        return true;
      }, function(err){
        const why = String((err && (err.message || err.error || err)) || '').slice(0, 140);
        log('❌ Sign-in failed:', why);
        if(!piUser && NET_ERR.test(why) && tries < 4){
          if(tries === 1) toast('Weak connection. Trying again…');
          return new Promise(function(ok){ setTimeout(ok, 2500 * tries); }).then(function(){
            if(piUser) return true;
            if(navigator.onLine === false) return new Promise(function(ok){ window.addEventListener('online', ok, { once:true }); setTimeout(ok, 15000); }).then(function(){ return run(tries + 1); });
            return run(tries + 1);
          });
        }
        if(!piUser){ toast(NET_ERR.test(why) ? 'No connection to Pi right now. Check your internet and tap Sign in again.' : 'Sign-in did not complete. Please tap Sign in again.'); store.set('lastAuthError', { at: Date.now(), why: why }); }
        return false;
      });
    };
    const attempt = run(1).then(function(ok){ if(authInFlight === attempt) authInFlight = null; return ok; });
    authInFlight = attempt;
  }
  return authInFlight;
}
function piLogin(){
  if(typeof Pi === 'undefined'){ log('Pi SDK missing: open from the Pi Browser'); toast('Please open DigitalSaudi in the Pi Browser'); return; }
  const btn = $('loginBtn');
  const resetBtn = function(){ if(btn){ btn.disabled = false; btn.innerHTML = '<span>π</span> Sign in with Pi'; } };
  if(btn){ btn.disabled = true; btn.innerHTML = '<div class="spinner"></div> Connecting…'; }
  const current = piAuth();
  // A slow answer from Pi is not a failure: keep waiting and sign in as soon as Pi replies.
  const slow = setTimeout(function(){
    if(authInFlight === current && !piUser){ resetBtn(); toast('Still connecting to Pi… you will be signed in when Pi answers. If nothing happens, tap Sign in again.'); }
  }, 30000);
  current.then(function(){ clearTimeout(slow); resetBtn(); });
}
function dsWaitToken(ms){
  return new Promise(function(res){
    const t0 = Date.now();
    (function poll(){ if(piUser && piUser.accessToken) return res(piUser.accessToken); if(Date.now() - t0 >= ms) return res(''); setTimeout(poll, 250); })();
  });
}
function onIncompletePaymentFound(payment){
  log('incomplete payment', payment); window.__dsFoundIncomplete = true;
  if(!payment || !payment.identifier) return;
  const txid = payment.transaction && payment.transaction.txid;
  const info = { id:payment.identifier, amount:payment.amount, memo:payment.memo || 'Earlier payment', txid:txid || '', at:Date.now(), state:'working' };
  store.set('stuckPayment', info);
  addHistory({ id:info.id, amount:info.amount, memo:info.memo, status:'pending', at:Date.now() });
  showStuckPayment();
  // v6.8: an unpaid payment can only be cancelled by its owner, so wait for the sign-in token (Pi reports this before sign-in finishes)
  dsWaitToken(txid ? 0 : 25000).then(function(tok){ return fetch(PI_ENDPOINTS.cancel, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ paymentId:info.id, txid:txid, accessToken:tok || undefined }) }); })
    .then(function(r){ return r.text().then(function(t){ try{ return JSON.parse(t); }catch(e){ throw new Error('Server replied ' + r.status + ' (not JSON) — is functions/cancel-payment.js uploaded?'); } }); })
    .then(function(d){
      log('incomplete handled', d);
      const sp = store.get('stuckPayment', info);
      if(d && d.ok){
        sp.state = 'fixed'; sp.detail = d.detail || 'Done'; sp.action = d.action;
        if(d.action === 'complete'){ updateHistory(info.id, 'completed', txid || (d.payment && d.payment.txid)); applyPaymentEffect(payment.metadata || (d.payment && d.payment.metadata), payment.amount, info.id); }
        else if(d.action === 'cancel'){ updateHistory(info.id, 'cancelled'); }
        else updateHistory(info.id, /completed/.test(d.detail || '') ? 'completed' : 'cancelled');
      } else {
        sp.state = 'failed'; sp.detail = (d && (d.detail || d.error)) || 'Unknown error'; sp.status = d && d.status; sp.action = d && d.action;
      }
      store.set('stuckPayment', sp); showStuckPayment();
    })
    .catch(function(e){ const sp = store.get('stuckPayment', info); sp.state = 'failed'; sp.detail = (e && e.message) || 'Network error'; store.set('stuckPayment', sp); showStuckPayment(); });
}
function showStuckPayment(){
  const sp = store.get('stuckPayment', null);
  if(!sp){ showPanel('Unfinished payment', '<div class="lock-wrap"><div class="big">✅</div><h3>No unfinished payment</h3><p class="small">You can pay normally.</p></div>', { id:'stuckPay', share:false }); return; }
  const icon = sp.state === 'fixed' ? '✅' : sp.state === 'failed' ? '⚠️' : '⏳';
  const title = sp.state === 'fixed' ? (sp.action === 'complete' ? 'Payment completed' : 'Payment cleared') : sp.state === 'failed' ? 'Couldn’t clear it yet' : 'Fixing your unfinished payment…';
  const msg = sp.state === 'fixed' ? (sp.action === 'complete' ? 'Your earlier payment had already been sent, so we completed it. Thank you!' : 'Your earlier unfinished payment was cancelled. No Pi was taken. You can pay again now.') : sp.state === 'failed' ? 'Pi said: <b>' + esc(sp.detail || '') + '</b>' + (sp.status ? ' (status ' + sp.status + ')' : '') + '<br><br>Please send the Payment ID below to support so it can be fixed.' : 'Checking the payment with Pi. This takes a few seconds.';
  showPanel('Unfinished payment', `<div class="lock-wrap"><div class="big">${icon}</div><h3>${title}</h3><p class="small" style="margin:8px 0 16px">${msg}</p></div>
    <div class="card"><div class="rate"><span>Payment ID</span><b style="word-break:break-all;text-align:right;max-width:65%;font-size:12px">${esc(sp.id)}</b></div><div class="rate"><span>Amount</span><b>${esc(sp.amount)} π</b></div><div class="rate" style="border:0"><span>For</span><b>${esc(sp.memo)}</b></div></div>
    <div class="p-actions" style="justify-content:center"><button class="btn btn-ghost btn-sm" onclick="copyText('${esc(sp.id)}')">📋 Copy Payment ID</button>${sp.state === 'failed' ? '<button class="btn btn-primary btn-sm" onclick="clearStuckPayment()">↻ Try again</button><button class="btn btn-ghost btn-sm" onclick="openFeedback(\'Payment issue: ' + esc(sp.id) + '\')">✉️ Contact support</button>' : ''}${sp.state === 'fixed' ? '<button class="btn btn-primary btn-sm" onclick="store.set(\'stuckPayment\',null);openItem(\'premium\')">Continue</button>' : ''}</div>`, { id:'stuckPay', share:false });
}
function clearStuckPayment(){
  if(typeof Pi === 'undefined') return toast('Open DigitalSaudi in the Pi Browser');
  initPi();
  showPanel('Unfinished payment', '<div class="lock-wrap"><div class="big">⏳</div><h3>Checking with Pi…</h3></div>', { id:'stuckPay', share:false });
  window.__dsFoundIncomplete = false;
  if(!authInFlight) authStartedAt = 0; // ask Pi again so it reports any unfinished payment
  piAuth().then(function(ok){
    if(!ok) return toast('Sign-in failed — open the app from the Pi Browser app link');
    if(!window.__dsFoundIncomplete){ store.set('stuckPayment', null); showStuckPayment(); }
  });
}

/* ================= PI PAYMENTS (Copa exact pattern) ================= */
function submitPiPayment(amount, memo, metadata, btn){
  if(typeof Pi === 'undefined'){ toast('Payments work only in the Pi Browser'); return; }
  if(!piUser){ pendingAction = function(){ submitPiPayment(amount, memo, metadata, btn); }; piLogin(); return; }
  if(authInFlight){ toast('Connecting to Pi…'); authInFlight.then(function(){ submitPiPayment(amount, memo, metadata, btn); }); return; }
  if(metadata && metadata.type === 'premium') metadata.uid = piUser.uid;
  initPi();
  const label = btn ? btn.innerHTML : '';
  if(btn){ btn.disabled = true; btn.innerHTML = '<div class="spinner" style="margin:0 auto"></div>'; }
  const reset = function(){ if(btn && document.body.contains(btn)){ btn.disabled = false; btn.innerHTML = label; } };

  Pi.createPayment({ amount: amount, memo: memo, metadata: metadata }, {
    onReadyForServerApproval: function(paymentId){
      addHistory({ id:paymentId, amount:amount, memo:memo, status:'pending', at:Date.now() });
      fetch(PI_ENDPOINTS.approve, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ paymentId:paymentId }) })
        .then(function(r){ return r.json(); })
        .then(function(d){ log('approved', d); if(d && d.ok === false){ toast('Payment approval failed (' + (d.status || d.error || 'server') + '). Please contact support.'); } })
        .catch(function(e){ log('approve error', e); });
    },
    onReadyForServerCompletion: function(paymentId, txid){
      toast('Confirming your payment…');
      confirmPayment(paymentId, txid, 0)
        .then(function(d){
          log('completed', d);
          updateHistory(paymentId, 'completed', txid);
          applyPaymentEffect(metadata, amount, paymentId);
          reset();
        })
        .catch(function(e){ log('complete error', e); updateHistory(paymentId, 'pending'); reset(); toast('Payment sent — still confirming. Reopen the app and it will finish automatically.'); });
    },
    onCancel: function(paymentId){
      log('cancelled', paymentId);
      updateHistory(paymentId, 'cancelled');
      reset();
      toast('Payment cancelled');
    },
    onError: function(error, payment){
      log('payment error', error, payment);
      if(payment && payment.identifier) updateHistory(payment.identifier, 'failed');
      reset();
      const msg = error && error.message ? error.message : '';
      if(/pending|incomplete/i.test(msg)){ toast('You have an unfinished payment — clearing it…'); setTimeout(clearStuckPayment, 600); }
      else toast('Payment error: ' + (msg || 'please try again'));
    }
  });
}
function applyPaymentEffect(metadata, amount, paymentId){
  if(metadata && metadata.type === 'transfer'){ if(window.dsTransferSync) dsTransferSync(); return; }
  if(metadata && metadata.type === 'premium'){
    recordPremium(paymentId, metadata.tier || 'monthly').then(function(){ toast('⭐ Premium unlocked — thank you!'); });
  } else {
    award('supporter');
    toast('💚 Thank you for your ' + amount + ' π support!');
    if($('panel').classList.contains('open') && current && current.id === 'support') closePanel();
  }
}

/* Confirm (complete) a payment with retries; falls back to /cancel-payment, which also completes paid payments. */
function postJSON(url, body){
  return fetch(url, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) })
    .then(function(r){ return r.text().then(function(t){ try{ return JSON.parse(t); }catch(e){ throw new Error(url + ' not available (' + r.status + ')'); } }); });
}
function confirmPayment(paymentId, txid, attempt){
  const body = { paymentId:paymentId, txid:txid };
  return postJSON(PI_ENDPOINTS.complete, body)
    .then(function(d){ if(d && (d.ok || /already/i.test(JSON.stringify(d.data || '')))) return d; throw new Error((d && (d.error || d.status)) || 'complete failed'); })
    .catch(function(e1){
      log('complete attempt failed', e1);
      return postJSON(PI_ENDPOINTS.cancel, body).then(function(d){ if(d && d.ok && (d.action === 'complete' || /completed/i.test(d.detail || ''))) return d; throw new Error((d && (d.detail || d.error)) || String(e1)); });
    })
    .catch(function(e){
      if(attempt < 2) return new Promise(function(res){ setTimeout(res, 2500); }).then(function(){ return confirmPayment(paymentId, txid, attempt + 1); });
      throw e;
    });
}
let supportAmt = 0;
function selAmt(el, a){ document.querySelectorAll('.amt').forEach(function(b){ b.classList.remove('sel'); }); el.classList.add('sel'); supportAmt = a; $('supAmt').value = ''; }
function sendSupport(){
  const custom = parseFloat($('supAmt').value);
  const amt = custom > 0 ? custom : supportAmt;
  if(!amt || amt <= 0){ toast('Choose an amount first'); return; }
  submitPiPayment(amt, 'Support DigitalSaudi', { type:'support', app:APP_NAME }, $('supBtn'));
}

/* ================= HISTORY & RECEIPTS ================= */
function histKey(){ return 'hist_' + userKey(); }
function addHistory(h){ const list = store.get(histKey(), []); if(!list.find(function(x){ return x.id === h.id; })) list.unshift(h); store.set(histKey(), list.slice(0, 50)); if(activeTab === 'profile') renderHistory(); }
function updateHistory(id, status, txid){
  const list = store.get(histKey(), []); const it = list.find(function(x){ return x.id === id; });
  if(it){ it.status = status; if(txid) it.txid = txid; if(status === 'completed') it.done = Date.now(); store.set(histKey(), list); }
  if(activeTab === 'profile') renderHistory();
}
function renderHistory(){
  const list = store.get(histKey(), []);
  if(!list.length){ $('payHistory').innerHTML = '<p class="small" style="text-align:center;padding:10px">No payments yet.</p>'; return; }
  const cls = { completed:'s-ok', pending:'s-pend', cancelled:'s-bad', failed:'s-bad' };
  $('payHistory').innerHTML = list.map(function(h){
    return `<button class="h" onclick="openReceipt('${esc(h.id)}')"><div><b>${esc(h.memo)}</b><div class="small">${new Date(h.at).toLocaleString('en-GB', { day:'numeric', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' })}</div></div><div style="text-align:right;flex:0 0 auto"><b>${h.amount} π</b><div><span class="status ${cls[h.status] || 's-pend'}">${h.status}</span></div></div></button>`;
  }).join('') + '<p class="small" style="text-align:center;margin-top:8px">Tap a payment to see its receipt.</p>';
}
function openReceipt(id){
  const h = store.get(histKey(), []).find(function(x){ return x.id === id; }); if(!h) return;
  const rl = function(a, b){ return `<div class="rl"><span>${a}</span><span style="text-align:right">${b}</span></div>`; };
  showPanel('Receipt', `<div class="receipt"><div style="text-align:center;margin-bottom:14px"><div style="font-size:34px">🧾</div><b style="font-size:18px">DigitalSaudi</b><div style="color:#666;font-size:12px">Pi Network payment receipt</div></div>
    ${rl('Status', h.status.toUpperCase())}${rl('Item', esc(h.memo))}${rl('Amount', h.amount + ' π')}${rl('Paid by', piUser ? '@' + esc(piUser.username) : '—')}${rl('Date', new Date(h.done || h.at).toLocaleString('en-GB'))}${rl('Payment ID', esc(h.id))}${h.txid ? rl('Blockchain TX', esc(h.txid)) : ''}
    <div style="text-align:center;color:#666;font-size:12px;margin-top:14px">Thank you for supporting DigitalSaudi 💚</div></div>
    <div class="p-actions" style="justify-content:center"><button class="btn btn-primary btn-sm" onclick="current.share()">📤 Share receipt</button><button class="btn btn-ghost btn-sm" onclick="copyText('${esc(h.txid || h.id)}')">📋 Copy ${h.txid ? 'TX ID' : 'payment ID'}</button></div>`, { id:'receipt' });
  current.share = function(){ shareText('DigitalSaudi receipt', '🧾 DigitalSaudi receipt\n' + h.memo + '\n' + h.amount + ' π · ' + String(h.status).toUpperCase() + '\n' + new Date(h.done || h.at).toLocaleString('en-GB') + '\nPayment ID: ' + h.id + (h.txid ? '\nBlockchain TX: ' + h.txid : ''), ''); };
}
function copyText(t){ if(navigator.clipboard) navigator.clipboard.writeText(t).then(function(){ toast('Copied'); }).catch(function(){ toast(t); }); else toast(t); }

/* ================= PROFILE / ENTRY ================= */
function renderProfile(){
  const name = piUser ? '@' + piUser.username : 'Guest';
  const initial = piUser ? piUser.username.charAt(0).toUpperCase() : 'G';
  $('uname').textContent = name; $('avatar').textContent = initial;
  $('bigAv').textContent = initial; $('profName').textContent = name + (isPremium() ? ' ⭐' : '');
  $('profStatus').textContent = piUser ? 'Signed in with Pi' : 'Not signed in';
  $('heroName').textContent = piUser ? 'Welcome, ' + piUser.username : 'Welcome to DigitalSaudi';
  $('premStatus').textContent = premiumLabel();
  $('profAuthBtn').innerHTML = piUser ? '<button class="btn btn-ghost" style="margin:0 auto" onclick="signOut()">Sign out</button>' : '<button class="btn btn-primary" style="margin:0 auto" onclick="piLogin()"><span>π</span> Sign in with Pi</button>';
}
function signOut(){ piUser = null; renderProfile(); renderHistory(); renderBadges(); renderLists(); toast('Signed out'); }

/* ---------- onboarding ---------- */
let obIndex = 0;
function showOnboarding(){ obIndex = 0; obShow(); $('onboard').style.display = 'flex'; }
function obShow(){
  document.querySelectorAll('.ob-slide').forEach(function(s){ s.classList.toggle('on', +s.dataset.i === obIndex); });
  document.querySelectorAll('.ob-dots i').forEach(function(d, i){ d.classList.toggle('on', i === obIndex); });
  $('obNext').textContent = obIndex === 2 ? 'Get started' : 'Next';
  const p = store.get('persona', null); document.querySelectorAll('#personaPick button').forEach(function(b){ b.classList.toggle('sel', b.dataset.p === p); });
}
function obNext(){ if(obIndex < 2){ obIndex++; obShow(); } else finishOnboarding(); }
function pickPersona(el){ store.set('persona', el.dataset.p); obShow(); }
function finishOnboarding(){ store.set('onboarded', true); if(!store.get('persona', null)) store.set('persona', 'visitor'); $('onboard').style.display = 'none'; renderLists(); }

let entered = false;
function enterApp(){
  $('splash').style.display = 'none';
  $('app').style.display = 'flex';
  renderProfile();
  if(entered){ renderLists(); return; }
  entered = true;
  renderLists(); renderNewsCats(); renderHomeAlerts(); renderGreenTip(); updateStreak();
  if(!store.get('onboarded', false)) showOnboarding();
  loadPrayer(); loadDailyAyah(); loadHomeNews(); loadHomeWeather(); loadFavTeam();
  loadMarkets(false);
  setInterval(tickPrayer, 1000);
  setInterval(function(){ if(activeTab === 'home') loadMarkets(true); }, 60000);
  v3Boot();
  const hash = location.hash.slice(1); if(hash && itemInfo(hash)) setTimeout(function(){ openItem(hash); }, 400);
}

/* ================= CLOCK ================= */
function tickClock(){
  const now = new Date();
  $('ksaTime').textContent = ksaTime(now);
  const hj = hijriParts(now), ar = typeof LANG !== 'undefined' && (LANG === 'ar' || LANG === 'ur');
  $('hijri').textContent = hj.d + ' ' + hijriMonth(hj.m);
  if($('hijriY')) $('hijriY').textContent = hj.y + (ar ? ' هـ' : ' AH');
  const h = parseInt(new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Riyadh', hour:'2-digit', hourCycle:'h23' }).format(now), 10);
  $('greet').textContent = t(h >= 4 && h < 12 ? 'Sabah al-khair · Good morning' : h >= 12 && h < 17 ? 'Assalamu alaikum · Good afternoon' : 'Masa al-khair · Good evening');
}

/* ================= INIT ================= */
document.addEventListener('DOMContentLoaded', function(){
  applySettings();
  tickClock(); setInterval(tickClock, 30000);
  setupInfinite();
  const off = function(){ $('offline').classList.toggle('on', !navigator.onLine); };
  window.addEventListener('online', function(){ off(); toast('Back online'); }); window.addEventListener('offline', off); off();
  if('serviceWorker' in navigator){ navigator.serviceWorker.register('/sw.js').catch(function(){}); addEventListener('load', function () { navigator.serviceWorker.ready.then(function (reg) { setTimeout(function () { try { var o = location.origin, L = [location.pathname + location.search].concat(performance.getEntriesByType('resource').map(function (x) { return x.name; }).filter(function (x) { return x.indexOf(o + '/') === 0 && !/\.(mp4|webm|mp3)(\?|$)/.test(x); }).map(function (x) { return x.slice(o.length); })); if (reg.active) reg.active.postMessage({ warm: L }); } catch (e) {} }, 20000); }); }); }
});
document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closePanel(); });

/* ================= 🌱 GREEN SAUDI ================= */
const GREEN = {
  gridKg: 0.51,          // kg CO2 per kWh, Saudi grid (Climate Transparency 2021 report, 2020 data)
  petrolKg: 2.31,        // kg CO2 per litre of petrol burned
  flightKgHr: 90,        // kg CO2 per passenger per flight hour (economy, typical estimate)
  saudiT: 20.4,          // tonnes CO2 per person, Saudi Arabia 2024 (Our World in Data — includes industry)
  worldT: 4.7,           // tonnes CO2 per person, world average (Our World in Data)
  tariff: [[6000, 0.18], [Infinity, 0.30]], // SAR per kWh, residential (SEC)
  meterFee: 10, vat: 0.15,
  waterAvg: 235,         // litres per person per day, Saudi network average (commonly cited estimate)
  waterTarget: 150       // litres per person per day, national reduction target (Qatrah programme)
};
const DIETS = { heavy:['Meat with most meals', 3.3], avg:['Average', 2.5], low:['Little meat', 1.9], veg:['Vegetarian', 1.7] };

const GREEN_TIPS = [
  'Set your AC to 24°C. Each degree cooler adds roughly 6% to cooling energy.',
  'Use a mug for wudu instead of a running tap — it can save several litres each time.',
  'Close curtains and blinds in the afternoon to keep the sun’s heat out.',
  'Carry a refillable bottle — Zamzam and water stations are everywhere in the Haramain.',
  'Switch to LED bulbs: they use about 80% less electricity than old bulbs.',
  'Fix a dripping tap — it can waste over 20 litres a day.',
  'Wash the car with a bucket, not a hose: about 20 litres instead of 150+.',
  'Run the washing machine and dishwasher only when full.',
  'Clean AC filters every month — dirty filters make the AC work harder.',
  'Say no to extra plastic bags; keep a cloth bag in the car.',
  'Take the Haramain train or metro instead of driving where you can.',
  'Water plants early morning or after sunset so less evaporates.',
  'Unplug chargers and TVs on standby — they still use power.',
  'Recycle cans and plastic bottles at supermarket and mall collection points.',
  'Share rides with colleagues or classmates to cut fuel and costs.'
];

const LESSONS = [
  { id:'cc', ic:'🌍', t:'What is climate change?', min:3, body:`
    <p>Burning oil, gas and coal releases carbon dioxide (CO₂) and other greenhouse gases. They trap heat in the atmosphere like a blanket, so the planet slowly warms.</p>
    <h4>What it causes</h4><ul><li>Hotter summers and more extreme heatwaves</li><li>Changing rainfall — more droughts in some places, floods in others</li><li>Rising sea levels as ice melts and oceans warm</li><li>Stress on crops, water supplies and health</li></ul>
    <h4>The good news</h4><p>Cleaner energy, efficient homes and less waste reduce emissions. Small daily choices add up across millions of people.</p>` },
  { id:'heat', ic:'🔥', t:'Heat in the Arabian Peninsula', min:3, body:`
    <p>The Arabian Peninsula is already one of the hottest places on Earth, and studies show it is warming faster than the global average.</p>
    <h4>Why it matters</h4><ul><li>Summer temperatures above 45°C are becoming more common</li><li>Heat raises electricity demand for air-conditioning</li><li>Outdoor workers and pilgrims face higher risk of heat illness</li></ul>
    <h4>Stay safe</h4><ul><li>Drink water often, even if you are not thirsty</li><li>Use shade and an umbrella; avoid the midday sun</li><li>Know the signs of heat exhaustion: dizziness, headache, nausea, heavy sweating</li></ul>` },
  { id:'water', ic:'💧', t:'Water scarcity & desalination', min:4, body:`
    <p>Saudi Arabia has no permanent rivers or lakes. Its water comes from underground aquifers (much of it non-renewable) and from desalination — turning seawater into fresh water.</p>
    <h4>Desalination</h4><ul><li>The Kingdom is one of the world’s largest producers of desalinated water</li><li>Desalination uses a lot of energy, so saving water also saves energy and emissions</li></ul>
    <h4>Using less</h4><p>Average home water use has been estimated at over ${GREEN.waterAvg} litres per person per day — well above many countries. The national water-saving programme aims to bring this down to around ${GREEN.waterTarget} litres.</p>
    <p><button class="btn btn-ghost btn-sm" onclick="openItem('waterCalc')">💧 Try the water calculator</button></p>` },
  { id:'sgi', ic:'🌳', t:'Saudi Green Initiative', min:3, body:`
    <p>Launched in 2021, the Saudi Green Initiative (SGI) sets national climate goals.</p>
    <h4>Main targets</h4><ul><li>Plant 10 billion trees across the Kingdom over the coming decades</li><li>Protect 30% of land and sea areas by 2030</li><li>Generate 50% of electricity from renewables by 2030</li><li>Reach net-zero emissions by 2060</li></ul>
    <p>SGI is linked to Vision 2030 and the wider Middle East Green Initiative.</p>` },
  { id:'desert', ic:'🏜️', t:'Deserts, dust & land', min:3, body:`
    <p>Desertification means once-productive land turning to desert through drought, overgrazing and poor land use.</p>
    <ul><li>Native desert plants and trees stabilise soil and reduce dust storms</li><li>Protected areas and reserves help wildlife like the Arabian oryx recover</li><li>Smart irrigation (drip systems, watering at night) saves precious groundwater</li></ul>` },
  { id:'you', ic:'🙋', t:'What can one person do?', min:2, body:`
    <ul><li><b>Energy:</b> AC at 24°C, LED lights, unplug standby devices</li><li><b>Water:</b> short showers, mug for wudu, fix leaks</li><li><b>Travel:</b> train, metro, car-sharing, fewer short car trips</li><li><b>Waste:</b> refuse plastic, reuse, recycle</li><li><b>Food:</b> don’t waste food; take only what you will eat at buffets and feasts</li></ul>
    <p>In Islam, the earth is an amanah (trust) and waste (israf) is discouraged — including using more water than needed for wudu.</p>` }
];

const RECYCLE = [
  { ic:'🧴', t:'Plastic', yes:['Water and soft-drink bottles (PET)','Milk and juice bottles','Clean food containers'], no:['Greasy food boxes','Plastic bags mixed with food'], tip:'Empty and rinse bottles, crush them and keep the caps on.' },
  { ic:'📦', t:'Paper & cardboard', yes:['Delivery boxes (flattened)','Newspapers, magazines','Office paper'], no:['Wet or oily paper','Tissues and napkins'], tip:'Flatten boxes to save space; keep paper dry.' },
  { ic:'🥫', t:'Metal cans', yes:['Drink cans (aluminium)','Food tins','Clean foil trays'], no:['Paint or chemical cans'], tip:'Aluminium can be recycled again and again with no loss of quality.' },
  { ic:'🍾', t:'Glass', yes:['Bottles and jars'], no:['Mirrors, window glass','Light bulbs','Ceramics'], tip:'Rinse and remove lids.' },
  { ic:'📱', t:'E-waste', yes:['Old phones, laptops, tablets','Chargers and cables','Small appliances'], no:['Normal household bins'], tip:'Wipe your data first. Use retailer take-back schemes or licensed e-waste collectors.' },
  { ic:'🔋', t:'Batteries', yes:['AA / AAA and phone batteries','Power banks'], no:['Household bins — risk of fire'], tip:'Tape the ends and take them to collection boxes in electronics shops or malls.' },
  { ic:'🍎', t:'Food waste', yes:['Compost fruit & vegetable scraps if you have a garden'], no:['Throwing away edible food'], tip:'Plan meals and share leftovers — food waste is a big source of methane in landfills.' },
  { ic:'👕', t:'Clothes & textiles', yes:['Donate clothes in good condition','Clothing donation boxes'], no:['Dirty or wet textiles in donation boxes'], tip:'Charities and donation boxes at mosques and malls accept clean clothes.' }
];

const GREENTECH = [
  { ic:'☀️', t:'Solar power', d:'Saudi Arabia has some of the strongest sunshine on Earth. Large solar parks such as Sudair are feeding clean electricity into the grid, and rooftop solar is growing for homes and businesses.' },
  { ic:'🌬️', t:'Wind power', d:'The Dumat Al Jandal wind farm in Al-Jouf was the Kingdom’s first utility-scale wind project, showing that wind can add to solar in the energy mix.' },
  { ic:'⚗️', t:'Green hydrogen', d:'Green hydrogen is made by splitting water with renewable electricity. NEOM is home to one of the world’s largest planned green-hydrogen plants, aimed at clean fuel exports.' },
  { ic:'🚗', t:'Electric vehicles', d:'The Kingdom is building an EV industry, including a local car brand and manufacturing in King Abdullah Economic City, plus a growing charging network.' },
  { ic:'🚇', t:'Clean transport', d:'The Riyadh Metro and the Haramain High-Speed Railway move large numbers of people with far less fuel per passenger than cars.' },
  { ic:'🏭', t:'Carbon capture', d:'Carbon capture, utilisation and storage (CCUS) traps CO₂ from industry and stores it underground or reuses it, part of the circular carbon economy approach.' },
  { ic:'💧', t:'Efficient desalination', d:'Newer reverse-osmosis plants use far less energy than older thermal plants, and some are being paired with solar power.' },
  { ic:'🏢', t:'Green buildings', d:'Better insulation, reflective roofs, efficient AC and smart meters cut energy use in the Kingdom’s hot climate.' }
];

Object.assign(META, {
  greenHub:{ t:'Green Saudi', ic:'🌱', s:'Calculators, guides & lessons' },
  carbonCalc:{ t:'Carbon calculator', ic:'👣', s:'Your yearly CO₂ footprint' },
  waterCalc:{ t:'Water-saving calculator', ic:'💧', s:'Daily litres & savings' },
  energyCalc:{ t:'Energy & bill calculator', ic:'⚡', s:'kWh and SAR estimate' },
  recycle:{ t:'Recycling guide', ic:'♻️', s:'What, how and where' },
  greenLiving:{ t:'Sustainable living', ic:'🏡', s:'Home, travel, shopping, Umrah' },
  climateEdu:{ t:'Climate education', ic:'🎓', s:'6 short lessons' },
  greenTech:{ t:'Green technology', ic:'🔋', s:'Solar, wind, hydrogen & more' }
});
BADGES.push({ id:'green', ic:'🌱', t:'Green champion' });

function greenUse(k){
  const u = store.get('greenUsed', []); if(u.indexOf(k) < 0){ u.push(k); store.set('greenUsed', u); }
  if(u.filter(function(x){ return ['carbon','water','energy'].indexOf(x) >= 0; }).length >= 3 || store.get('lessonsRead', []).length >= LESSONS.length) award('green');
}
function greenRowsHTML(){ return ['carbonCalc','waterCalc','energyCalc','recycle','greenLiving','climateEdu','greenTech'].map(rowHTML).join(''); }
function renderGreenTip(){
  const start = new Date(new Date().getFullYear(), 0, 0), doy = Math.floor((new Date() - start) / 86400000);
  $('greenTip').innerHTML = `<div style="display:flex;gap:12px;align-items:flex-start"><div style="font-size:28px">🌱</div><div style="flex:1"><div class="small" style="font-weight:800;color:var(--accent)">GREEN TIP OF THE DAY</div><p style="margin:4px 0 8px;font-size:14.5px">${GREEN_TIPS[doy % GREEN_TIPS.length]}</p><button class="btn btn-ghost btn-sm" onclick="openItem('greenHub')">Explore Green Saudi ›</button></div></div>`;
}
function bar(label, val, max, unit){ const w = max ? Math.min(100, Math.round(val / max * 100)) : 0; return `<div style="margin:8px 0"><div style="display:flex;justify-content:space-between;font-size:13.5px"><span>${label}</span><b>${unit === 't' ? fmt(val, 2) + ' t' : fmt(val, 0) + ' ' + unit}</b></div><div class="progress" style="margin:4px 0 0"><i style="width:${w}%"></i></div></div>`; }
function srcNote(t){ return `<p class="small" style="margin-top:14px">ℹ️ Estimates only. ${t}</p>`; }

Object.assign(PANELS, {
  greenHub: function(){
    showPanel('Green Saudi', `<div class="hero" style="margin-bottom:14px"><div class="greet">Saudi Green Initiative · Vision 2030</div><h3 style="margin-bottom:4px">Live greener, save money 🌱</h3><p class="small" style="color:#BFE6CF;position:relative;z-index:1">Calculators, practical guides and short lessons for life in the Kingdom.</p></div>
      <h4>Calculators</h4>${['carbonCalc','waterCalc','energyCalc'].map(rowHTML).join('')}
      <h4>Guides</h4>${['recycle','greenLiving'].map(rowHTML).join('')}
      <h4>Learn</h4>${['climateEdu','greenTech'].map(rowHTML).join('')}`, { id:'greenHub' });
  },

  carbonCalc: function(){
    const c = store.get('carbon', { kwh:1500, people:4, km:250, lper100:10, flights:6, diet:'avg' });
    showPanel('Carbon calculator', `<p class="small" style="margin-bottom:12px">Your personal CO₂ footprint per year. Change the numbers to see the effect.</p>
      <div class="two"><div class="field"><label>Home electricity (kWh / month)</label><input id="cb_kwh" type="number" inputmode="decimal" value="${c.kwh}" oninput="calcCarbon()"></div>
      <div class="field"><label>People in home</label><input id="cb_people" type="number" inputmode="numeric" min="1" value="${c.people}" oninput="calcCarbon()"></div></div>
      <p class="small" style="margin:-4px 0 10px">Don’t know your kWh? Divide your bill (SAR, before VAT) by 0.18.</p>
      <div class="two"><div class="field"><label>Car driving (km / week)</label><input id="cb_km" type="number" inputmode="decimal" value="${c.km}" oninput="calcCarbon()"></div>
      <div class="field"><label>Fuel use (L / 100 km)</label><input id="cb_l" type="number" inputmode="decimal" value="${c.lper100}" oninput="calcCarbon()"></div></div>
      <div class="two"><div class="field"><label>Flight hours / year</label><input id="cb_fl" type="number" inputmode="decimal" value="${c.flights}" oninput="calcCarbon()"></div>
      <div class="field"><label>Diet</label><select id="cb_diet" onchange="calcCarbon()">${Object.keys(DIETS).map(function(k){ return `<option value="${k}" ${k === c.diet ? 'selected' : ''}>${DIETS[k][0]}</option>`; }).join('')}</select></div></div>
      <div class="result"><small>Your footprint</small><b id="cbTot">—</b><small id="cbCmp"></small></div>
      <div class="card" style="margin-top:12px" id="cbBreak"></div><div id="cbTips"></div>
      ${srcNote('Grid ' + GREEN.gridKg + ' kg CO₂/kWh (Climate Transparency), petrol ' + GREEN.petrolKg + ' kg/L, flights ~' + GREEN.flightKgHr + ' kg per passenger-hour, diet averages from published studies. Saudi average ' + GREEN.saudiT + ' t and world average ' + GREEN.worldT + ' t per person (Our World in Data) include industry and energy exports, not just household use.')}`, { id:'carbonCalc' });
    calcCarbon(); greenUse('carbon');
  },

  waterCalc: function(){
    const w = store.get('water', { shower:10, showerFlow:'std', wudu:5, wuduMode:'tap', flush:6, toilet:'std', dishes:'hand', laundry:4, car:'hose', carPerMonth:2, garden:0 });
    const sel = function(id, opts, v){ return `<select id="wt_${id}" onchange="calcWater()">${opts.map(function(o){ return `<option value="${o[0]}" ${o[0] === v ? 'selected' : ''}>${o[1]}</option>`; }).join('')}</select>`; };
    const num = function(id, v){ return `<input id="wt_${id}" type="number" inputmode="decimal" value="${v}" oninput="calcWater()">`; };
    showPanel('Water-saving calculator', `<p class="small" style="margin-bottom:12px">Estimate your daily water use per person and how much you could save.</p>
      <div class="two"><div class="field"><label>Shower minutes / day</label>${num('shower', w.shower)}</div><div class="field"><label>Shower head</label>${sel('showerFlow', [['std','Standard (~9 L/min)'],['eco','Low-flow (~6 L/min)']], w.showerFlow)}</div></div>
      <div class="two"><div class="field"><label>Wudu / day</label>${num('wudu', w.wudu)}</div><div class="field"><label>Wudu method</label>${sel('wuduMode', [['tap','Running tap (~4 L)'],['mug','Mug / jug (~1.5 L)']], w.wuduMode)}</div></div>
      <div class="two"><div class="field"><label>Toilet flushes / day</label>${num('flush', w.flush)}</div><div class="field"><label>Toilet type</label>${sel('toilet', [['std','Standard (~9 L)'],['dual','Dual-flush (~4.5 L)']], w.toilet)}</div></div>
      <div class="two"><div class="field"><label>Dishes</label>${sel('dishes', [['hand','By hand, tap running (~60 L/day)'],['bowl','By hand in a bowl (~20 L/day)'],['machine','Dishwasher (~12 L/day)']], w.dishes)}</div><div class="field"><label>Laundry loads / week</label>${num('laundry', w.laundry)}</div></div>
      <div class="two"><div class="field"><label>Car washes / month</label>${num('carPerMonth', w.carPerMonth)}</div><div class="field"><label>Car wash method</label>${sel('car', [['hose','Hose (~150 L)'],['bucket','Bucket (~20 L)'],['none','Car wash / none']], w.car)}</div></div>
      <div class="field"><label>Garden watering (minutes / day, hose)</label>${num('garden', w.garden)}</div>
      <div class="grid"><div class="result"><small>You use</small><b id="wtUse">—</b><small>litres / day</small></div><div class="result"><small>You could save</small><b id="wtSave">—</b><small>litres / day</small></div></div>
      <div class="card" style="margin-top:12px" id="wtBreak"></div>
      ${srcNote('Typical fixture flows. Laundry ~60 L per load. Saudi average around ' + GREEN.waterAvg + ' L/person/day; national target about ' + GREEN.waterTarget + ' L.')}`, { id:'waterCalc' });
    calcWater(); greenUse('water');
  },

  energyCalc: function(){
    const e = store.get('energy', { ac:3, acKw:1.8, acHrs:10, setpoint:22, fridge:1, heater:1, heaterHrs:1, lights:12, lightW:40, tv:2, tvHrs:5, washer:4 });
    const f = function(id, l, v){ return `<div class="field"><label>${l}</label><input id="en_${id}" type="number" inputmode="decimal" value="${v}" oninput="calcEnergy()"></div>`; };
    showPanel('Energy & bill calculator', `<p class="small" style="margin-bottom:12px">Estimate your monthly electricity use and SEC bill, and see what you could save.</p>
      <h4>❄️ Air-conditioning (biggest user)</h4><div class="two">${f('ac','Number of AC units',e.ac)}${f('acKw','Power per unit (kW)',e.acKw)}</div><div class="two">${f('acHrs','Hours per day',e.acHrs)}${f('setpoint','Thermostat °C',e.setpoint)}</div>
      <h4>🏠 Other appliances</h4><div class="two">${f('fridge','Fridges',e.fridge)}${f('washer','Laundry loads / week',e.washer)}</div>
      <div class="two">${f('heater','Water heaters',e.heater)}${f('heaterHrs','Heater hours / day',e.heaterHrs)}</div>
      <div class="two">${f('lights','Light bulbs',e.lights)}${f('lightW','Watts per bulb',e.lightW)}</div>
      <div class="two">${f('tv','TVs / computers',e.tv)}${f('tvHrs','Hours per day',e.tvHrs)}</div>
      <div class="grid"><div class="result"><small>Monthly use</small><b id="enKwh">—</b><small>kWh</small></div><div class="result"><small>Estimated bill</small><b id="enBill">—</b><small>SAR incl. VAT</small></div></div>
      <div class="card" style="margin-top:12px" id="enBreak"></div><div id="enSave"></div>
      ${srcNote('Residential tariff: 0.18 SAR/kWh up to 6,000 kWh a month, 0.30 SAR above, plus a meter fee (about ' + GREEN.meterFee + ' SAR) and 15% VAT (SEC). Each 1°C higher on the AC saves roughly 6% of cooling energy. Your real bill depends on your meter and appliances.')}`, { id:'energyCalc' });
    calcEnergy(); greenUse('energy');
  },

  recycle: function(){
    showPanel('Recycling guide', `<p style="margin-bottom:12px">Recycling saves energy, water and landfill space. Here’s what to do with common waste.</p>` +
      RECYCLE.map(function(r){ return `<div class="ayah"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><span style="font-size:26px">${r.ic}</span><b style="font-size:16px">${r.t}</b></div>
        <div class="small recycle-yes" style="color:var(--ok);font-weight:800">✓ YES</div><ul>${r.yes.map(function(x){ return '<li>' + x + '</li>'; }).join('')}</ul>
        <div class="small" style="color:var(--danger);font-weight:800;margin-top:6px">✗ NO</div><ul>${r.no.map(function(x){ return '<li>' + x + '</li>'; }).join('')}</ul>
        <p class="small" style="margin-top:6px">💡 ${r.tip}</p></div>`; }).join('') +
      `<h4>Where to recycle</h4><ul><li>Collection points and reverse-vending machines at many supermarkets and malls</li><li>Recycling bins in some compounds, universities and offices</li><li>Retailer take-back for phones and electronics</li><li>Your municipality (via Balady) for bulky items</li></ul>
      <div class="note">Waste management is overseen by the National Center for Waste Management (MWAN). Collection options differ by city and district — check locally.</div>` + reviewedHTML('Recycling guide'), { id:'recycle' });
  },

  greenLiving: function(){
    const sec = [
      ['🏠 At home', ['AC at 24°C and ceiling fans on — you’ll feel cooler for less power','Close curtains on sunny sides in the afternoon','LED bulbs and switch off lights in empty rooms','Service AC units and clean filters monthly','Unplug devices on standby']],
      ['💧 Water', ['Mug or jug for wudu; turn the tap off between steps','Showers under 5 minutes; fit a low-flow head','Fix leaking taps and toilets quickly','Water plants early or late; use drip irrigation']],
      ['🚗 Getting around', ['Use the Haramain train, Riyadh Metro and buses','Car-share for work or university','Keep tyres properly inflated to save fuel','Avoid idling with the engine running']],
      ['🛒 Shopping & food', ['Bring a reusable bag and bottle','Buy local dates, fruit and vegetables','Choose products with less packaging','At feasts and buffets, take only what you’ll eat; donate extra food']],
      ['🕋 Green Umrah & Hajj', ['Use a refillable bottle for Zamzam and water','Use the bins provided and keep the Haram clean','Walk or use the train and shuttle buses','Take reusable cutlery and a cloth bag','Share leftover food with those in need']]
    ];
    showPanel('Sustainable living', sec.map(function(s){ return `<h4>${s[0]}</h4><ul>${s[1].map(function(x){ return '<li>' + x + '</li>'; }).join('')}</ul>`; }).join('') + reviewedHTML('Sustainable living'), { id:'greenLiving' });
  },

  climateEdu: function(){
    const read = store.get('lessonsRead', []);
    showPanel('Climate education', `<div class="small">${read.length} of ${LESSONS.length} lessons read</div><div class="progress"><i style="width:${Math.round(read.length / LESSONS.length * 100)}%"></i></div>` +
      LESSONS.map(function(l){ return `<button class="row" onclick="openLesson('${l.id}')"><div class="ic">${l.ic}</div><div class="tx"><b>${l.t}</b><small>${l.min} min read</small></div>${read.indexOf(l.id) >= 0 ? '<span class="status s-ok">✓ Read</span>' : '<span class="chev">›</span>'}</button>`; }).join(''), { id:'climateEdu' });
  },

  greenTech: function(){
    showPanel('Green technology', `<p style="margin-bottom:12px">How technology is helping Saudi Arabia move to cleaner energy.</p>` +
      GREENTECH.map(function(g){ return `<div class="ayah"><div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><span style="font-size:26px">${g.ic}</span><b style="font-size:16px">${g.t}</b></div><p>${g.d}</p></div>`; }).join('') + reviewedHTML('Green technology'), { id:'greenTech' });
  }
});

function openLesson(id){
  const i = LESSONS.findIndex(function(l){ return l.id === id; }), l = LESSONS[i];
  const read = store.get('lessonsRead', []); if(read.indexOf(id) < 0){ read.push(id); store.set('lessonsRead', read); }
  if(read.length === LESSONS.length){ toast('🎓 All lessons complete!'); greenUse('lessons'); }
  const next = LESSONS[i + 1];
  showPanel(l.t, `<div class="small" style="margin-bottom:10px">Lesson ${i + 1} of ${LESSONS.length} · ${l.min} min</div>` + l.body +
    `<div class="p-actions"><button class="btn btn-ghost btn-sm" onclick="openItem('climateEdu')">‹ All lessons</button>${next ? `<button class="btn btn-primary btn-sm" onclick="openLesson('${next.id}')">Next: ${next.t} ›</button>` : ''}</div>` + reviewedHTML(l.t), { id:'climateEdu' });
}

function calcCarbon(){
  if(!$('cb_kwh')) return;
  const g = function(k){ return Math.max(0, parseFloat($(k).value) || 0); };
  const c = { kwh:g('cb_kwh'), people:Math.max(1, g('cb_people') || 1), km:g('cb_km'), lper100:g('cb_l'), flights:g('cb_fl'), diet:$('cb_diet').value };
  store.set('carbon', c);
  const elec = c.kwh * 12 * GREEN.gridKg / c.people / 1000;
  const car = c.km * 52 * c.lper100 / 100 * GREEN.petrolKg / 1000;
  const fly = c.flights * GREEN.flightKgHr / 1000;
  const food = DIETS[c.diet][1];
  const tot = elec + car + fly + food;
  $('cbTot').textContent = fmt(tot, 1) + ' tonnes CO₂ / year';
  $('cbCmp').textContent = tot < GREEN.worldT ? 'Below the world average (' + GREEN.worldT + ' t) 👏' : tot < GREEN.saudiT ? 'Above the world average (' + GREEN.worldT + ' t)' : 'Above the Saudi average (' + GREEN.saudiT + ' t)';
  const max = Math.max(elec, car, fly, food);
  $('cbBreak').innerHTML = bar('⚡ Home electricity', elec, max, 't') + bar('🚗 Car', car, max, 't') + bar('✈️ Flights', fly, max, 't') + bar('🍽️ Food', food, max, 't');
  const tips = [];
  if(elec === max) tips.push('Electricity is your biggest source. Raising the AC from 22°C to 24°C could cut about ' + fmt(elec * 0.12, 2) + ' t a year.');
  if(car === max || car > 1.5) tips.push('Driving 20% less (car-sharing, train, metro) would save about ' + fmt(car * 0.2, 2) + ' t a year.');
  if(fly > 1) tips.push('Flights add up quickly — one long-haul return trip can be over a tonne.');
  if(c.diet === 'heavy') tips.push('Eating meat a little less often could save around 0.8 t a year.');
  $('cbTips').innerHTML = tips.length ? '<h4>How to cut it</h4><ul>' + tips.map(function(t){ return '<li>' + t + '</li>'; }).join('') + '</ul>' : '';
}

function calcWater(){
  if(!$('wt_shower')) return;
  const v = function(k){ return $('wt_' + k).value; }, n = function(k){ return Math.max(0, parseFloat(v(k)) || 0); };
  const w = { shower:n('shower'), showerFlow:v('showerFlow'), wudu:n('wudu'), wuduMode:v('wuduMode'), flush:n('flush'), toilet:v('toilet'), dishes:v('dishes'), laundry:n('laundry'), car:v('car'), carPerMonth:n('carPerMonth'), garden:n('garden') };
  store.set('water', w);
  const parts = [
    ['🚿 Showers', w.shower * (w.showerFlow === 'eco' ? 6 : 9), w.shower * 6 * Math.min(1, 5 / Math.max(w.shower, 0.01))],
    ['🤲 Wudu', w.wudu * (w.wuduMode === 'mug' ? 1.5 : 4), w.wudu * 1.5],
    ['🚽 Toilet', w.flush * (w.toilet === 'dual' ? 4.5 : 9), w.flush * 4.5],
    ['🍽️ Dishes', { hand:60, bowl:20, machine:12 }[w.dishes], 12],
    ['👕 Laundry', w.laundry * 60 / 7, w.laundry * 60 / 7],
    ['🚗 Car', w.car === 'none' ? 0 : w.carPerMonth * (w.car === 'hose' ? 150 : 20) / 30, w.car === 'none' ? 0 : w.carPerMonth * 20 / 30],
    ['🌿 Garden', w.garden * 15, w.garden * 15 * 0.5]
  ];
  const use = parts.reduce(function(s, p){ return s + p[1]; }, 0), best = parts.reduce(function(s, p){ return s + Math.min(p[1], p[2]); }, 0);
  $('wtUse').textContent = fmt(use, 0); $('wtSave').textContent = fmt(Math.max(0, use - best), 0);
  const max = Math.max.apply(null, parts.map(function(p){ return p[1]; }));
  $('wtBreak').innerHTML = parts.map(function(p){ return bar(p[0], p[1], max, 'L'); }).join('') +
    `<p class="small" style="margin-top:10px">That’s about <b>${fmt((use - best) * 365, 0)} litres a year</b> you could save — ${use <= GREEN.waterTarget ? 'you are already at or below the national target of ' + GREEN.waterTarget + ' L 👏' : 'the national target is about ' + GREEN.waterTarget + ' L per person per day.'}</p>`;
}

function secBill(kwh){
  let rest = kwh, prev = 0, cost = 0;
  GREEN.tariff.forEach(function(t){ const band = Math.min(rest, t[0] - prev); if(band > 0){ cost += band * t[1]; rest -= band; } prev = t[0]; });
  return (cost + GREEN.meterFee) * (1 + GREEN.vat);
}
function calcEnergy(){
  if(!$('en_ac')) return;
  const g = function(k){ return Math.max(0, parseFloat($('en_' + k).value) || 0); };
  const e = { ac:g('ac'), acKw:g('acKw'), acHrs:g('acHrs'), setpoint:g('setpoint') || 24, fridge:g('fridge'), heater:g('heater'), heaterHrs:g('heaterHrs'), lights:g('lights'), lightW:g('lightW'), tv:g('tv'), tvHrs:g('tvHrs'), washer:g('washer') };
  store.set('energy', e);
  const acAdj = Math.max(0.4, 1 + (24 - e.setpoint) * 0.06);
  const parts = [
    ['❄️ Air-conditioning', e.ac * e.acKw * e.acHrs * 30 * 0.7 * acAdj],   // 0.7 = compressor duty cycle
    ['🧊 Fridges', e.fridge * 1.3 * 30],
    ['🚿 Water heaters', e.heater * 2 * e.heaterHrs * 30],
    ['💡 Lighting', e.lights * e.lightW * 5 * 30 / 1000],
    ['📺 TVs & computers', e.tv * 0.12 * e.tvHrs * 30],
    ['👕 Laundry', e.washer * 1.0 * 30 / 7]
  ];
  const kwh = parts.reduce(function(s, p){ return s + p[1]; }, 0);
  $('enKwh').textContent = fmt(kwh, 0); $('enBill').textContent = fmt(secBill(kwh), 0);
  const max = Math.max.apply(null, parts.map(function(p){ return p[1]; }));
  $('enBreak').innerHTML = parts.map(function(p){ return bar(p[0], p[1], max, 'kWh'); }).join('');
  const saves = [];
  if(e.setpoint < 24){ const k = parts[0][1] * (1 - 1 / (1 + (24 - e.setpoint) * 0.06)); saves.push(['Set AC to 24°C', k]); }
  if(e.lightW > 12){ saves.push(['Switch to LED bulbs', parts[3][1] * (1 - 10 / e.lightW)]); }
  if(e.acHrs > 8){ saves.push(['Run AC 2 hours less a day', parts[0][1] * 2 / e.acHrs]); }
  $('enSave').innerHTML = saves.length ? '<h4>Ways to save</h4>' + saves.map(function(s){ const sar = secBill(kwh) - secBill(kwh - s[1]); return `<div class="rate"><span>${s[0]}</span><b class="up">−${fmt(s[1], 0)} kWh · ${fmt(sar, 0)} SAR/mo</b></div>`; }).join('') + `<p class="small" style="margin-top:8px">CO₂ from your electricity: about ${fmt(kwh * 12 * GREEN.gridKg / 1000, 1)} tonnes a year.</p>` : '';
}

/* =====================================================================
   v3 — EXPLORE: map, places, hotels, food, transport, trips,
   experiences, knowledge, business directory, Pi hub
   ===================================================================== */
const HARAM = { Makkah:[21.4225, 39.8262, 'Masjid al-Haram'], Madinah:[24.4672, 39.6111, 'Al-Masjid an-Nabawi'] };
Object.assign(CITY_COORDS, { Taif:CITY_COORDS.Taif || [21.2703, 40.4158], Hail:[27.5114, 41.7208], Buraidah:[26.3592, 43.9818], Jazan:[16.8892, 42.5511], Najran:[17.4933, 44.1277], Khobar:[26.2172, 50.1971], Yanbu:[24.0895, 38.0618], KAEC:[22.4545, 39.1234], Hofuf:[25.3833, 49.5833], AlJouf:[29.9697, 40.2064] });
const MAP_CITIES = ['Makkah','Madinah','Riyadh','Jeddah','Dammam','Khobar','Taif','Abha','AlUla','Tabuk','Yanbu','Hail','Buraidah','Jazan','Najran','Hofuf'];

const PLACE_CATS = [
  { id:'all', t:'All', ic:'📍', c:'#00A859' },
  { id:'hotels', t:'Hotels', ic:'🏨', c:'#2563EB' },
  { id:'food', t:'Restaurants', ic:'🍽️', c:'#EA580C' },
  { id:'cafes', t:'Cafés', ic:'☕', c:'#92400E' },
  { id:'mosques', t:'Mosques', ic:'🕌', c:'#059669' },
  { id:'health', t:'Hospitals', ic:'🏥', c:'#DC2626' },
  { id:'pharmacy', t:'Pharmacies', ic:'💊', c:'#DB2777' },
  { id:'malls', t:'Malls', ic:'🛍️', c:'#7C3AED' },
  { id:'attractions', t:'Attractions', ic:'🏛️', c:'#CA8A04' },
  { id:'transport', t:'Stations', ic:'🚆', c:'#0891B2' },
  { id:'money', t:'Banks & ATMs', ic:'🏧', c:'#4B5563' },
  { id:'fuel', t:'Fuel', ic:'⛽', c:'#65A30D' },
  { id:'pi', t:'Pi merchants', ic:'π', c:'#0A7A4B' }
];
function pcat(id){ return PLACE_CATS.find(function(c){ return c.id === id; }) || PLACE_CATS[0]; }
function haversine(a, b){
  const r = Math.PI / 180, dLat = (b[0] - a[0]) * r, dLng = (b[1] - a[1]) * r;
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLng / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
}
function fmtDist(km){ return km < 1 ? Math.round(km * 1000) + ' m' : fmt(km, km < 10 ? 1 : 0) + ' km'; }
function walkMin(km){ return Math.max(1, Math.round(km * 1000 / 80)); }

/* ---------- lazy libraries ---------- */
const LIBS = {};
function loadScript(src){ if(LIBS[src]) return LIBS[src]; LIBS[src] = new Promise(function(res, rej){ const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = function(){ delete LIBS[src]; rej(new Error('load ' + src)); }; document.head.appendChild(s); }); return LIBS[src]; }
function loadCSS(href){ if(document.querySelector('link[href="' + href + '"]')) return; const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = href; document.head.appendChild(l); }
function loadLeaflet(){ loadCSS('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'); return window.L ? Promise.resolve() : loadScript('https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'); }

/* ---------- places data ---------- */
function fetchPlaces(cat, center, radius){
  const key = 'pl_' + cat + '_' + center[0].toFixed(2) + '_' + center[1].toFixed(2) + '_' + radius;
  const api = cat === 'pi'
    ? getJSON('/directory?pi=1&limit=200').then(function(d){ return (d.items || []).filter(function(b){ return b.lat && b.lng; }).map(bizToPlace); })
    : getJSON('/places?cat=' + cat + '&lat=' + center[0].toFixed(5) + '&lng=' + center[1].toFixed(5) + '&r=' + radius, 25000).then(function(d){ if(!d || d.ok === false) throw new Error((d && d.error) || 'places'); return d.places || []; });
  const withBiz = cat === 'all' ? Promise.all([api, getJSON('/directory?limit=200').then(function(d){ return (d.items || []).filter(function(b){ return b.lat && b.lng; }).map(bizToPlace); }).catch(function(){ return []; })]).then(function(r){ return r[1].concat(r[0]); }) : api;
  return withBiz.then(function(list){ try{ store.set(key, list.slice(0, 150)); }catch(e){} return list; })
    .catch(function(e){ const c = store.get(key, null); if(c) return c; throw e; });
}
function bizToPlace(b){ return { id:'biz_' + b.id, bizId:b.id, name:b.name, cat:b.accepts_pi ? 'pi' : 'biz', lat:+b.lat, lng:+b.lng, tags:{ phone:b.phone, website:b.website, addr:b.address, desc:b.description, category:b.category, pi:b.accepts_pi ? 1 : 0 } }; }
function placeSub(p){
  const t = p.tags || {}, bits = [];
  if(p.cat === 'pi' || p.cat === 'biz') bits.push(t.category || 'Business');
  else bits.push(pcat(p.cat).t.replace(/s$/, ''));
  if(t.stars) bits.push('★'.repeat(Math.min(5, parseInt(t.stars, 10) || 0)));
  if(t.cuisine) bits.push(t.cuisine.split(';').slice(0, 2).join(', ').replace(/_/g, ' '));
  if(t.brand && t.brand !== p.name) bits.push(t.brand);
  return bits.filter(Boolean).join(' · ');
}

/* ---------- MAP ---------- */
const mapState = { cat:'all', center:null, label:'', me:null, list:[], map:null, layer:null, radius:5000 };
function mapCity(){ return store.get('mapCity', 'Makkah'); }
function openMap(cat, nearMe, city){
  award('mapper');
  mapState.cat = cat || mapState.cat || 'all';
  if(city){ store.set('mapCity', city); mapState.center = null; mapState.me = null; }
  showPanel('Explore map', `
    <div style="display:flex;gap:8px;margin-bottom:10px"><select id="mapCitySel" onchange="mapSetCity(this.value)" style="flex:1">${MAP_CITIES.map(function(c){ return `<option ${c === mapCity() ? 'selected' : ''}>${c}</option>`; }).join('')}</select>
    <button class="btn btn-primary btn-sm" onclick="mapNearMe()">📍 Near me</button></div>
    <div class="chips" id="mapCats">${PLACE_CATS.map(function(c){ return `<button class="chip ${c.id === mapState.cat ? 'on' : ''}" data-c="${c.id}" onclick="mapSetCat('${c.id}')">${c.ic} ${c.t}</button>`; }).join('')}</div>
    <div id="map"></div>
    <div class="small" id="mapInfo" style="margin-bottom:8px">Loading places…</div>
    <div id="mapList"></div>`, { id:'map', share:false });
  panelCleanup = function(){ if(mapState.map){ mapState.map.remove(); mapState.map = null; } };
  loadLeaflet().then(function(){
    if(!$('map')) return;
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    const start = mapState.center || (CITY_COORDS[mapCity()] || CITY_COORDS.Makkah);
    mapState.map = L.map('map', { zoomControl:true, attributionControl:false }).setView(start, 14);
    $('map').classList.toggle('dark-tiles', dark);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom:19, attribution:'© OpenStreetMap' }).addTo(mapState.map);
    mapState.layer = L.layerGroup().addTo(mapState.map);
    mapState.map.on('moveend', function(){ const c = mapState.map.getCenter(); mapState.pending = [c.lat, c.lng]; if(!$('mapHere') && mapState.center && haversine(mapState.pending, mapState.center) > 1.5){ $('mapInfo').insertAdjacentHTML('beforeend', ' <button class="btn btn-ghost btn-sm" id="mapHere" onclick="mapSearchHere()">🔄 Search this area</button>'); } });
    if(nearMe) mapNearMe(); else { mapState.center = start; mapState.label = HARAM[mapCity()] ? HARAM[mapCity()][2] : mapCity(); if(HARAM[mapCity()] && !mapState.me) mapState.center = [HARAM[mapCity()][0], HARAM[mapCity()][1]]; loadMapPlaces(); }
    setTimeout(function(){ if(mapState.map) mapState.map.invalidateSize(); }, 350);
  }).catch(function(){ if(!$('map')) return; $('map').innerHTML = '<div class="empty"><div class="big">🗺️</div>Map could not load. Showing the list only.</div>'; mapState.center = CITY_COORDS[mapCity()]; loadMapPlaces(); });
}
function mapSetCity(c){ store.set('mapCity', c); mapState.me = null; mapState.center = HARAM[c] ? [HARAM[c][0], HARAM[c][1]] : CITY_COORDS[c]; mapState.label = HARAM[c] ? HARAM[c][2] : c; if(mapState.map) mapState.map.setView(mapState.center, 14); loadMapPlaces(); }
function mapSetCat(c){ mapState.cat = c; document.querySelectorAll('#mapCats .chip').forEach(function(b){ b.classList.toggle('on', b.dataset.c === c); }); loadMapPlaces(); }
function mapSearchHere(){ if(!mapState.pending) return; mapState.center = mapState.pending; mapState.label = 'this area'; loadMapPlaces(); }
function mapNearMe(){
  if(!navigator.geolocation){ toast('Location not available on this device'); return; }
  if($('mapInfo')) $('mapInfo').textContent = '📍 Finding your location…';
  navigator.geolocation.getCurrentPosition(function(pos){
    mapState.me = [pos.coords.latitude, pos.coords.longitude]; mapState.center = mapState.me; mapState.label = 'you';
    if(!$('mapList')) return;
    if(mapState.map) mapState.map.setView(mapState.me, 15);
    loadMapPlaces();
  }, function(){ if(!$('mapList')) return; toast('Location permission denied — showing ' + mapCity()); mapSetCity(mapCity()); }, { enableHighAccuracy:true, timeout:15000, maximumAge:60000 });
}
function loadMapPlaces(){
  if(!$('mapList')) return;
  const cat = mapState.cat, center = mapState.center || CITY_COORDS[mapCity()];
  const radius = cat === 'transport' ? 25000 : cat === 'all' ? 2500 : mapState.me ? 4000 : 6000;
  if($('mapHere')) $('mapHere').remove();
  $('mapInfo').textContent = 'Loading ' + pcat(cat).t.toLowerCase() + '…';
  $('mapList').innerHTML = [1,2,3,4].map(function(){ return '<div class="row"><div class="skeleton"></div></div>'; }).join('');
  fetchPlaces(cat, center, radius).then(function(list){
    if(mapState.cat !== cat || !$('mapList')) return;
    list.forEach(function(p){ p.d = haversine(center, [p.lat, p.lng]); });
    list.sort(function(a, b){ return a.d - b.d; });
    mapState.list = list.slice(0, 120);
    window._places = window._places || {}; mapState.list.forEach(function(p){ window._places[p.id] = p; });
    drawMarkers(center);
    $('mapInfo').innerHTML = `<b>${mapState.list.length}</b> ${esc(pcat(cat).t.toLowerCase())} near ${esc(mapState.label || mapCity())}`;
    $('mapList').innerHTML = mapState.list.length ? mapState.list.slice(0, 60).map(placeRowHTML).join('') :
      `<div class="empty"><div class="big">${pcat(cat).ic}</div>${cat === 'pi' ? 'No Pi merchants listed here yet.<br><button class="btn btn-primary btn-sm" style="margin:12px auto 0" onclick="openItem(\'addBusiness\')">＋ Add a business that accepts Pi</button>' : 'Nothing found here. Try another area or category.'}</div>`;
  }).catch(function(){
    if(!$('mapList')) return;
    $('mapInfo').textContent = '';
    $('mapList').innerHTML = '<div class="empty"><div class="big">📡</div>Couldn’t load places right now.<br><button class="btn btn-ghost btn-sm" style="margin:12px auto 0" onclick="loadMapPlaces()">Try again</button></div>';
  });
}
function pinIcon(cat){ const c = pcat(cat === 'biz' ? 'all' : cat); return L.divIcon({ className:'', html:`<div class="map-pin" style="background:${c.c}"><span>${c.ic}</span></div>`, iconSize:[34, 34], iconAnchor:[17, 34], popupAnchor:[0, -30] }); }
function drawMarkers(center){
  if(!mapState.map || !window.L) return;
  mapState.layer.clearLayers();
  if(mapState.me) L.marker(mapState.me, { icon:L.divIcon({ className:'', html:'<div class="me-dot"></div>', iconSize:[18, 18], iconAnchor:[9, 9] }) }).addTo(mapState.layer);
  if(HARAM[mapCity()] && !mapState.me) L.marker([HARAM[mapCity()][0], HARAM[mapCity()][1]], { icon:pinIcon('mosques') }).bindPopup('<b>' + HARAM[mapCity()][2] + '</b>').addTo(mapState.layer);
  const pts = [];
  mapState.list.forEach(function(p){
    pts.push([p.lat, p.lng]);
    L.marker([p.lat, p.lng], { icon:pinIcon(p.cat) }).bindPopup(`<b>${esc(p.name)}</b><br><small>${esc(placeSub(p))}</small><br><a href="#" onclick="openPlace('${p.id}');return false">Details ›</a>`).addTo(mapState.layer);
  });
  if(pts.length > 1){ try{ mapState.map.fitBounds(L.latLngBounds(pts.slice(0, 40).concat([center])), { padding:[30, 30], maxZoom:16 }); }catch(e){} }
}
function placeRowHTML(p){
  const saved = isSavedPlace(p.id), c = pcat(p.cat === 'biz' ? 'all' : p.cat);
  return `<button class="row place" onclick="openPlace('${p.id}')"><div class="ic">${c.ic}</div><div class="tx"><b>${esc(p.name)}${saved ? ' ★' : ''}</b><small>${esc(placeSub(p))}${p.tags && p.tags.pi ? ' <span class="tagl pi">Accepts Pi</span>' : ''}</small></div><span class="dist">${p.d != null ? fmtDist(p.d) : ''}</span></button>`;
}
function openPlace(id){
  const p = (window._places || {})[id] || store.get('savedPlaces', []).find(function(x){ return x.id === id; }); if(!p) return;
  if(p.bizId) { openBiz(p.bizId); return; }
  const t = p.tags || {}, c = pcat(p.cat), city = mapCity();
  const fromHaram = HARAM[city] ? haversine([HARAM[city][0], HARAM[city][1]], [p.lat, p.lng]) : null;
  const fromMe = mapState.me ? haversine(mapState.me, [p.lat, p.lng]) : null;
  const addr = [t.street, t.district, t.city].filter(Boolean).join(', ') || t.addr || '';
  const rows = [
    addr && ['📫 Address', esc(addr)],
    fromMe != null && ['📍 From you', fmtDist(fromMe) + ' · ~' + walkMin(fromMe) + ' min walk'],
    fromHaram != null && ['🕋 From ' + HARAM[city][2], fmtDist(fromHaram) + ' · ~' + walkMin(fromHaram) + ' min walk'],
    t.stars && ['⭐ Stars', esc(t.stars)],
    t.cuisine && ['🍴 Cuisine', esc(t.cuisine.replace(/;/g, ', ').replace(/_/g, ' '))],
    t.hours && ['🕒 Opening hours', esc(t.hours)],
    t.phone && ['📞 Phone', `<a href="tel:${esc(t.phone.split(';')[0])}">${esc(t.phone.split(';')[0])}</a>`],
    t.website && ['🌐 Website', `<a href="${esc(t.website)}">${esc(t.website.replace(/^https?:\/\//, '').slice(0, 40))}</a>`]
  ].filter(Boolean);
  showPanel(p.name, `<div class="card" style="text-align:center"><div style="font-size:42px">${c.ic}</div><h3 style="margin:6px 0 2px">${esc(p.name)}</h3><div class="small">${esc(placeSub(p))}</div></div>
    <div class="card" style="margin-top:12px">${rows.length ? rows.map(function(r){ return `<div class="rate"><span>${r[0]}</span><b style="text-align:right;max-width:60%">${r[1]}</b></div>`; }).join('') : '<p class="small">No extra details listed for this place.</p>'}</div>
    <div class="p-actions"><button class="btn ${isSavedPlace(p.id) ? 'btn-gold' : 'btn-primary'} btn-sm" id="savePl" onclick="toggleSavePlace('${p.id}')">${isSavedPlace(p.id) ? '★ Saved' : '☆ Save place'}</button>
    <a class="btn btn-ghost btn-sm" href="https://www.google.com/maps/dir/?api=1&destination=${p.lat},${p.lng}">🧭 Directions</a>
    ${mapState.map !== undefined ? `<button class="btn btn-ghost btn-sm" onclick="openMap()">‹ Back to map</button>` : ''}</div>`, { id:'place' });
  current.share = function(){ shareText(p.name, p.name + ' — ' + placeSub(p) + '\nhttps://www.openstreetmap.org/?mlat=' + p.lat + '&mlon=' + p.lng + '#map=18/' + p.lat + '/' + p.lng, location.origin); };
  $('pShare').classList.add('on');
}
function isSavedPlace(id){ return store.get('savedPlaces', []).some(function(x){ return x.id === id; }); }
function toggleSavePlace(id){
  const list = store.get('savedPlaces', []), i = list.findIndex(function(x){ return x.id === id; });
  if(i >= 0){ list.splice(i, 1); toast('Removed from saved places'); }
  else { const p = window._places[id]; list.unshift({ id:p.id, name:p.name, cat:p.cat, lat:p.lat, lng:p.lng, tags:p.tags, city:mapCity() }); toast('★ Place saved'); if(p.cat === 'food' || p.cat === 'cafes') award('foodie'); if(p.cat === 'hotels') award('hotelier'); }
  store.set('savedPlaces', list.slice(0, 100));
  const b = $('savePl'); if(b){ b.textContent = i >= 0 ? '☆ Save place' : '★ Saved'; b.className = 'btn ' + (i >= 0 ? 'btn-primary' : 'btn-gold') + ' btn-sm'; }
}

/* ---------- HOTELS & FOOD finders (list view, same data) ---------- */
function finderPanel(kind){
  const isHotel = kind === 'hotels', city = store.get(kind + 'City', isHotel ? 'Makkah' : 'Riyadh');
  showPanel(isHotel ? 'Hotels & stays' : 'Restaurants & cafés', `
    <div class="chips">${MAP_CITIES.slice(0, 10).map(function(c){ return `<button class="chip ${c === city ? 'on' : ''}" onclick="store.set('${kind}City','${c}');openItem('${kind}')">${c}</button>`; }).join('')}</div>
    ${isHotel ? '' : `<div class="chips" id="foodSub">${[['food','🍽️ Restaurants'],['cafes','☕ Cafés']].map(function(x, i){ return `<button class="chip ${i === 0 ? 'on' : ''}" data-f="${x[0]}" onclick="finderLoad('${x[0]}','${city}',this)">${x[1]}</button>`; }).join('')}</div>`}
    ${isHotel && HARAM[city] ? `<div class="note" style="margin-top:0">🕋 Sorted by walking distance to ${HARAM[city][2]}.</div>` : ''}
    <div class="search-box"><span>🔍</span><input id="finderQ" placeholder="${isHotel ? 'Filter by name' : 'Filter by name or cuisine (e.g. mandi, indian, burger)'}" oninput="finderFilter()"></div>
    <div id="finderList"><div class="row"><div class="skeleton"></div></div><div class="row"><div class="skeleton"></div></div></div>
    <div class="p-actions"><button class="btn btn-ghost btn-sm" onclick="openMap('${isHotel ? 'hotels' : 'food'}', false, '${city}')">🗺️ View on map</button>${isHotel ? '<button class="btn btn-ghost btn-sm" onclick="openItem(\'hotelCalc\')">🧮 Hotel cost calculator</button>' : '<button class="btn btn-ghost btn-sm" onclick="openItem(\'k-food\')">🥘 Saudi food guide</button>'}</div>
    <div class="note">${isHotel ? 'Book through licensed booking platforms or directly with the hotel. For Umrah packages use Nusuk or an approved agent. Check whether quoted prices include 15% VAT.' : 'All food sold in Saudi Arabia is halal by law. Popular delivery apps include HungerStation, Jahez and Mrsool.'}</div>`, { id:kind });
  finderLoad(isHotel ? 'hotels' : 'food', city);
}
function finderLoad(cat, city, btn){
  if(btn) document.querySelectorAll('#foodSub .chip').forEach(function(b){ b.classList.toggle('on', b === btn); });
  const center = HARAM[city] ? [HARAM[city][0], HARAM[city][1]] : CITY_COORDS[city];
  window._finder = { cat:cat, city:city, list:[] };
  fetchPlaces(cat, center, cat === 'hotels' && HARAM[city] ? 3000 : 6000).then(function(list){
    if(!$('finderList')) return;
    list.forEach(function(p){ p.d = haversine(center, [p.lat, p.lng]); });
    list.sort(function(a, b){ return a.d - b.d; });
    window._places = window._places || {}; list.forEach(function(p){ window._places[p.id] = p; });
    window._finder.list = list; store.set('mapCity', city); finderFilter();
  }).catch(function(){ if($('finderList')) $('finderList').innerHTML = '<div class="empty"><div class="big">📡</div>Couldn’t load places. Check your connection.</div>'; });
}
function finderFilter(){
  const f = window._finder; if(!f || !$('finderList')) return; const q = ($('finderQ').value || '').toLowerCase();
  const list = f.list.filter(function(p){ return !q || (p.name + ' ' + ((p.tags || {}).cuisine || '')).toLowerCase().indexOf(q) >= 0; }).slice(0, 80);
  $('finderList').innerHTML = list.length ? list.map(function(p){
    const walk = HARAM[f.city] && f.cat === 'hotels' ? ' · 🚶 ' + walkMin(p.d) + ' min to Haram' : '';
    return `<button class="row place" onclick="openPlace('${p.id}')"><div class="ic">${pcat(p.cat).ic}</div><div class="tx"><b>${esc(p.name)}${isSavedPlace(p.id) ? ' ★' : ''}</b><small>${esc(placeSub(p))}${walk}</small></div><span class="dist">${fmtDist(p.d)}</span></button>`;
  }).join('') : '<div class="empty">No matches.</div>';
}

/* ---------- TRANSPORT PLANNER ---------- */
const RAIL = [ { n:'Haramain High-Speed Railway', c:['Makkah','Jeddah','KAEC','Madinah'], v:190 }, { n:'SAR East Line', c:['Riyadh','Hofuf','Dammam'], v:110 }, { n:'SAR North Line', c:['Riyadh','Buraidah','Hail','AlJouf'], v:120 } ];
function railFor(a, b){ return RAIL.find(function(r){ return r.c.indexOf(a) >= 0 && r.c.indexOf(b) >= 0; }); }
function hm(h){ const H = Math.floor(h), M = Math.round((h - H) * 60); return (H ? H + ' h ' : '') + (M ? M + ' min' : (H ? '' : '0 min')); }
function calcTransport(){
  if(!$('trFrom')) return;
  const a = $('trFrom').value, b = $('trTo').value, lp = parseFloat($('trL').value) || 0, price = parseFloat($('trP').value) || 0, pax = Math.max(1, parseInt($('trPax').value, 10) || 1);
  store.set('transport', { from:a, to:b, l:lp, p:price, pax:pax });
  if(a === b){ $('trOut').innerHTML = '<div class="empty">Choose two different cities.</div>'; return; }
  const air = haversine(CITY_COORDS[a], CITY_COORDS[b]), road = air * 1.22, driveH = road / 100 + Math.floor(road / 300) * 0.25;
  const fuel = road * lp / 100 * price, rail = railFor(a, b);
  const opts = [];
  opts.push(['🚗 Car', hm(driveH), fmt(fuel, 0) + ' SAR fuel' + (pax > 1 ? ' (' + fmt(fuel / pax, 0) + ' each)' : ''), 'About ' + fmt(road, 0) + ' km by road. Rest every 2 hours; carry water.']);
  if(rail) opts.push(['🚄 Train', '~' + hm(air * 1.15 / rail.v + 0.3), 'Check official fares', rail.n + ' serves both cities. Book early for weekends, Ramadan and Hajj season.']);
  if(road > 350) opts.push(['✈️ Flight', '~' + hm(air / 700 + 0.5) + ' flying', '+ ~2.5 h airport time', 'Domestic flights connect most major cities. Compare fares with the airlines directly.']);
  opts.push(['🚌 Intercity bus', '~' + hm(road / 85 + Math.floor(road / 300) * 0.3), 'Usually the cheapest', 'Intercity coaches link most cities — check the operator’s app for times.']);
  $('trOut').innerHTML = `<div class="result"><small>${a} → ${b}</small><b>${fmt(air, 0)} km</b><small>straight-line · ~${fmt(road, 0)} km by road</small></div>` +
    opts.map(function(o){ return `<div class="row" style="align-items:flex-start"><div class="ic">${o[0].split(' ')[0]}</div><div class="tx"><b>${o[0].slice(o[0].indexOf(' ') + 1)} · ${o[1]}</b><small>${o[2]}</small><small style="margin-top:4px">${o[3]}</small></div></div>`; }).join('') +
    '<p class="small">Times and costs are estimates. Fuel price is editable — check the current price at the pump.</p>';
}

/* ---------- TRIPS ---------- */
const PURPOSES = { umrah:['🕋','Umrah'], hajj:['🤲','Hajj'], tourism:['🧳','Tourism'], work:['💼','Work'], family:['👨‍👩‍👧','Family visit'], business:['🤝','Business'] };
const PURPOSE_DOC = { umrah:'umrah', hajj:'hajj', tourism:'tourist', work:'work', family:'family', business:'tourist' };
const PACK_GENERIC = ['Passport & visa (plus copies)','Phone, charger & power bank','Universal travel adapter (Type G plugs are common)','Modest, light, breathable clothes','Sunglasses, sunscreen & hat','Refillable water bottle','Comfortable walking shoes','Personal medicines with prescription','Bank card + some SAR cash','Printed hotel booking & emergency contacts'];
function trips(){ return store.get('trips', []); }
function tripStatus(t){ const s = daysUntil(t.start), e = daysUntil(t.end || t.start); if(s > 0) return { k:'soon', d:s, txt:s + ' day' + (s === 1 ? '' : 's') + ' to go' }; if(e >= 0) return { k:'now', d:-s + 1, txt:'Day ' + (-s + 1) + ' of ' + (e - s + 1) }; return { k:'done', d:-e, txt:'Completed' }; }
function activeTrip(){ return trips().filter(function(t){ return tripStatus(t).k !== 'done'; }).sort(function(a, b){ return a.start < b.start ? -1 : 1; })[0]; }
function renderHomeTrip(){
  if(!$('homeTrip')) return; const t = activeTrip();
  $('homeTrip').innerHTML = t ? `<button class="trip-card" onclick="openTrip(${t.id})"><div class="small" style="color:#BFDBFE">${PURPOSES[t.purpose][0]} MY TRIP · ${esc(t.city)}</div><div class="big">${tripStatus(t).txt}</div><div class="small" style="color:#DBEAFE">${esc(t.name)} · ${new Date(t.start + 'T12:00:00').toLocaleDateString('en-GB', { day:'numeric', month:'short' })}${t.end ? ' – ' + new Date(t.end + 'T12:00:00').toLocaleDateString('en-GB', { day:'numeric', month:'short' }) : ''}</div></button>` : '';
}
function tripForm(t){
  t = t || { name:'', city:'Makkah', purpose:'umrah', start:ksaDate(new Date(Date.now() + 30 * 86400000)), end:'', flight:'', hotel:'', notes:'' };
  showPanel(t.id ? 'Edit trip' : 'New trip', `
    <div class="field"><label>Trip name</label><input id="tp_name" value="${esc(t.name)}" placeholder="e.g. Umrah with family"></div>
    <div class="two"><div class="field"><label>Purpose</label><select id="tp_purpose">${Object.keys(PURPOSES).map(function(k){ return `<option value="${k}" ${k === t.purpose ? 'selected' : ''}>${PURPOSES[k][0]} ${PURPOSES[k][1]}</option>`; }).join('')}</select></div>
    <div class="field"><label>Main city</label><select id="tp_city">${MAP_CITIES.map(function(c){ return `<option ${c === t.city ? 'selected' : ''}>${c}</option>`; }).join('')}</select></div></div>
    <div class="two"><div class="field"><label>Arrive</label><input id="tp_start" type="date" value="${t.start}"></div><div class="field"><label>Leave</label><input id="tp_end" type="date" value="${t.end}"></div></div>
    <div class="field"><label>Flight (optional)</label><input id="tp_flight" value="${esc(t.flight)}" placeholder="e.g. SV 3413 · 14:20"></div>
    <div class="field"><label>Hotel (optional)</label><input id="tp_hotel" value="${esc(t.hotel)}" placeholder="Hotel name"></div>
    <div class="field"><label>Notes</label><textarea id="tp_notes" rows="3">${esc(t.notes)}</textarea></div>
    <button class="btn btn-primary" style="margin:0 auto" onclick="saveTrip(${t.id || 0})">${t.id ? 'Save changes' : 'Create trip'}</button>
    ${t.id ? `<button class="btn btn-ghost btn-sm" style="margin:12px auto 0;color:var(--danger)" onclick="deleteTrip(${t.id})">Delete trip</button>` : ''}`, { id:'tripEdit', share:false });
}
function saveTrip(id){
  const v = function(k){ return $('tp_' + k).value.trim(); };
  if(!v('start')){ toast('Choose an arrival date'); return; }
  if(v('end') && v('end') < v('start')){ toast('Leave date is before arrival'); return; }
  const list = trips(), t = { id:id || Date.now(), name:v('name') || (PURPOSES[v('purpose')][1] + ' in ' + v('city')), city:v('city'), purpose:v('purpose'), start:v('start'), end:v('end'), flight:v('flight'), hotel:v('hotel'), notes:v('notes') };
  const i = list.findIndex(function(x){ return x.id === id; }); if(i >= 0) list[i] = t; else list.push(t);
  store.set('trips', list); award('trip'); toast('🧳 Trip saved'); renderHomeTrip(); openTrip(t.id);
}
function deleteTrip(id){ if(!confirm('Delete this trip?')) return; store.set('trips', trips().filter(function(t){ return t.id !== id; })); renderHomeTrip(); openItem('trips'); }
function openTrip(id){
  const t = trips().find(function(x){ return x.id === id; }); if(!t) return;
  const st = tripStatus(t), dk = PURPOSE_DOC[t.purpose], docs = DOC_TYPES[dk], dst = store.get('chk_doc_' + dk, {}), dDone = Object.values(dst).filter(Boolean).length;
  const packKey = t.purpose === 'umrah' || t.purpose === 'hajj' ? 'umrahpack' : 'pack_' + t.id, packItems = packKey === 'umrahpack' ? UMRAH_PACK : PACK_GENERIC, pst = store.get('chk_' + packKey, {}), pDone = Object.values(pst).filter(Boolean).length;
  const places = store.get('savedPlaces', []).filter(function(p){ return p.city === t.city; });
  showPanel(t.name, `<div class="trip-card" style="margin-top:0"><div class="small" style="color:#BFDBFE">${PURPOSES[t.purpose][0]} ${PURPOSES[t.purpose][1].toUpperCase()} · ${esc(t.city)}</div><div class="big">${st.txt}</div>
      <div class="small" style="color:#DBEAFE">${new Date(t.start + 'T12:00:00').toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short', year:'numeric' })}${t.end ? ' → ' + new Date(t.end + 'T12:00:00').toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' }) : ''}</div>
      ${t.flight ? `<div style="margin-top:8px">✈️ ${esc(t.flight)}</div>` : ''}${t.hotel ? `<div>🏨 ${esc(t.hotel)}</div>` : ''}</div>
    <h4>Get ready</h4>
    <button class="row" onclick="openDocType('${dk}')"><div class="ic">📋</div><div class="tx"><b>Documents</b><small>${dDone} of ${docs.items.length} ready</small><div class="progress" style="margin:6px 0 0"><i style="width:${Math.round(dDone / docs.items.length * 100)}%"></i></div></div><span class="chev">›</span></button>
    <button class="row" onclick="${packKey === 'umrahpack' ? "openItem('umrahPack')" : `renderChecklist('Packing list','${packKey}',PACK_GENERIC,null)`}"><div class="ic">🎒</div><div class="tx"><b>Packing</b><small>${pDone} of ${packItems.length} packed${packKey === 'umrahpack' && !isPremium() ? ' · Premium' : ''}</small><div class="progress" style="margin:6px 0 0"><i style="width:${Math.round(pDone / packItems.length * 100)}%"></i></div></div><span class="chev">›</span></button>
    ${rowHTML('budget')}
    <h4>In ${esc(t.city)}</h4>
    <div class="card" id="tripWx"><div class="skeleton"></div></div>
    <div class="grid-4" style="margin-top:10px">
      <button class="tile" onclick="openMap('hotels',false,'${t.city}')"><div class="ic">🏨</div><span>Hotels</span></button>
      <button class="tile" onclick="openMap('food',false,'${t.city}')"><div class="ic">🍽️</div><span>Food</span></button>
      <button class="tile" onclick="openMap('attractions',false,'${t.city}')"><div class="ic">🏛️</div><span>See & do</span></button>
      <button class="tile" onclick="setPrayerCity('${CITY_COORDS[t.city] && ['Makkah','Madinah','Riyadh','Jeddah','Dammam','Abha','Tabuk','Taif'].indexOf(t.city) >= 0 ? t.city : 'Makkah'}');toast('Prayer times set to ${t.city}')"><div class="ic">🕌</div><span>Prayer</span></button>
    </div>
    ${places.length ? '<h4>Saved places</h4>' + places.slice(0, 8).map(function(p){ window._places = window._places || {}; window._places[p.id] = p; return `<button class="row" onclick="openPlace('${p.id}')"><div class="ic">${pcat(p.cat).ic}</div><div class="tx"><b>${esc(p.name)}</b><small>${esc(placeSub(p))}</small></div><span class="chev">›</span></button>`; }).join('') : ''}
    <h4>Safety</h4>${['ecard','emergency','transport'].map(rowHTML).join('')}
    ${t.notes ? `<h4>Notes</h4><p>${esc(t.notes).replace(/\n/g, '<br>')}</p>` : ''}
    <div class="p-actions"><button class="btn btn-ghost btn-sm" onclick="tripForm(trips().find(function(x){return x.id===${t.id}}))">✏️ Edit trip</button><button class="btn btn-ghost btn-sm" onclick="openAI('travel','Plan my ${esc(PURPOSES[t.purpose][1])} trip to ${esc(t.city)} from ${t.start}${t.end ? ' to ' + t.end : ''}. Give a day-by-day plan with tips.')">🤖 Plan with AI</button></div>`, { id:'trip' });
  current.share = function(){ shareText(t.name, t.name + ' — ' + t.city + ', ' + t.start + (t.end ? ' to ' + t.end : '') + ' · planned with DigitalSaudi', location.origin); }; $('pShare').classList.add('on');
  if(CITY_COORDS[t.city]) fetchWeather(t.city).then(function(d){ if(!$('tripWx')) return; if(!d || !d.current){ $('tripWx').innerHTML = '<p class="small">Weather unavailable.</p>'; return; } const w = wx(d.current.weather_code); $('tripWx').innerHTML = `<div class="wx-now"><div class="e" style="font-size:40px">${w[0]}</div><div><div class="t" style="font-size:32px">${Math.round(d.current.temperature_2m)}°</div><div class="small">${w[1]} · today H ${Math.round(d.daily.temperature_2m_max[0])}° L ${Math.round(d.daily.temperature_2m_min[0])}°${d.daily.temperature_2m_max[0] >= 40 ? ' · <span class="down">very hot</span>' : ''}</div></div></div>`; });
}

/* ---------- EXPERIENCES ---------- */
const EXPERIENCES = [
  { id:'x-desert', ic:'🐪', t:'Desert adventures', s:'Dunes, camps & stargazing', bg:'linear-gradient(135deg,#C27A2C,#7A4313)', body:`<p>Saudi Arabia's deserts are spectacular — from the red dunes near Riyadh to the vast Rub' al Khali (Empty Quarter), the largest sand desert on Earth.</p><h4>Try</h4><ul><li><b>Edge of the World</b> — dramatic cliffs of the Tuwaiq escarpment, a day trip from Riyadh</li><li>Desert camps with Bedouin-style dinners and stargazing</li><li>Dune driving, sandboarding and camel rides with licensed operators</li></ul><h4>Best time</h4><p>November to March. Avoid summer heat.</p>`, cat:'attractions', city:'Riyadh' },
  { id:'x-alula', ic:'🏜️', t:'AlUla', s:'Hegra, rock art & canyons', bg:'linear-gradient(135deg,#C2410C,#7C2D12)', img:'/onboarding/s2-hegra.webp', body:`<p>An open-air museum of sandstone mountains and ancient sites.</p><ul><li><b>Hegra</b> — Nabataean tombs; Saudi Arabia's first UNESCO World Heritage Site</li><li><b>Elephant Rock</b> — especially beautiful at sunset</li><li>AlUla Old Town, Dadan and Jabal Ikmah inscriptions</li><li>Hot-air balloon flights, hiking and stargazing</li></ul><h4>Tips</h4><p>Most heritage sites need a pre-booked ticket and guided tour. Best from October to March.</p>`, cat:'attractions', city:'AlUla' },
  { id:'x-redsea', ic:'🤿', t:'Red Sea & diving', s:'Coral reefs & islands', bg:'linear-gradient(135deg,#0369A1,#0C4A6E)', img:'/onboarding/login-hero.webp', body:`<p>The Red Sea has some of the healthiest coral reefs in the world.</p><ul><li>Diving and snorkelling off Jeddah, Yanbu and Umluj</li><li><b>Farasan Islands</b> near Jazan — marine reserve with turtles and dolphins</li><li>New island resorts along the coast</li></ul><h4>Tips</h4><p>Dive only with licensed centres. Use reef-safe sunscreen and never touch coral.</p>`, cat:'attractions', city:'Jeddah' },
  { id:'x-mountains', ic:'⛰️', t:'Mountains & hiking', s:'Cool air in the southwest', bg:'linear-gradient(135deg,#1F7A4D,#0E3B26)', body:`<p>The southwest is green, cool and mountainous — a summer escape.</p><ul><li><b>Abha & Asir</b> — Jabal Sawda, the Kingdom's highest peak, and cable cars</li><li><b>Taif</b> — rose farms, fruit markets and mountain roads</li><li><b>Al Baha</b> — juniper forests and cliff-top villages</li></ul><h4>Safety</h4><p>Fog can roll in quickly; hike with a guide and tell someone your route.</p>`, cat:'attractions', city:'Abha' },
  { id:'x-heritage', ic:'🏘️', t:'Heritage villages', s:'Traditional architecture', bg:'linear-gradient(135deg,#A9743A,#5E3B17)', body:`<ul><li><b>Al-Balad, Jeddah</b> — coral-stone houses with wooden balconies (UNESCO)</li><li><b>Diriyah (At-Turaif)</b> — mud-brick birthplace of the first Saudi state (UNESCO)</li><li><b>Rijal Almaa</b> — colourful stone towers in Asir</li><li><b>Dhee Ain</b> — marble village in Al Baha</li><li><b>Ushaiqer</b> — historic Najdi village near Shaqra</li></ul>`, cat:'attractions', city:'Jeddah' },
  { id:'x-museums', ic:'🏛️', t:'Museums & culture', s:'History, art & Islam', bg:'linear-gradient(135deg,#2F4858,#16242E)', body:`<ul><li><b>National Museum, Riyadh</b> — the story of Arabia from prehistory</li><li><b>Ithra</b>, Dhahran — culture centre with exhibitions, library and cinema</li><li><b>Hira Cultural District</b>, Makkah — Revelation exhibition near Jabal al-Nour</li><li><b>Diriyah</b> — museums and heritage walks</li><li>Madinah museums on the Prophet's ﷺ life and Islamic history</li></ul>`, cat:'attractions', city:'Riyadh' },
  { id:'x-family', ic:'🎡', t:'Family fun', s:'Parks, aquariums & shows', bg:'linear-gradient(135deg,#0E7C6B,#0B4A40)', body:`<ul><li>Entertainment zones and parks in Riyadh and Jeddah, especially during the seasons</li><li>Aquariums, science centres and indoor play areas in major malls</li><li>Corniche walks and waterfront parks in Jeddah, Dammam and Khobar</li></ul><h4>Tip</h4><p>Many attractions sell tickets online and are busiest on Thursday and Friday evenings.</p>`, cat:'attractions', city:'Riyadh' },
  { id:'x-seasons', ic:'🎆', t:'Seasonal festivals', s:'Riyadh Season & more', bg:'linear-gradient(135deg,#1E3A5F,#0F1F33)', img:'/onboarding/s1-terrace.webp', body:`<p>Big seasonal programmes bring concerts, sports, food and shows:</p><ul><li><b>Riyadh Season</b> — usually from autumn into winter</li><li><b>Jeddah Season</b> — usually summer</li><li>Winter programmes in AlUla and events around National Day</li></ul><p>Dates are announced each year — see <b>Live › Events</b> for what's on.</p>`, cat:'attractions', city:'Riyadh' }
];

/* ---------- KNOWLEDGE ---------- */
const KNOW = [
  { id:'k-geo', ic:'🗺️', t:'Geography', s:'Deserts, coasts, mountains', body:`<ul><li>Saudi Arabia covers about 80% of the Arabian Peninsula — around 2.15 million km²</li><li>The <b>Red Sea</b> is to the west and the <b>Arabian Gulf</b> to the east</li><li>The <b>Rub' al Khali</b> (Empty Quarter) in the south is the largest continuous sand desert on Earth</li><li>The <b>Sarawat mountains</b> run along the west; Jabal Sawda in Asir is the highest peak (about 3,000 m)</li><li>There are no permanent rivers — water comes from aquifers and desalination</li><li>13 administrative regions, including Riyadh, Makkah, Madinah, Eastern Province and Asir</li></ul>` },
  { id:'k-history', ic:'📜', t:'History', s:'From Diriyah to today', body:`<ul><li><b>Ancient times:</b> incense trade routes, the Nabataeans at Hegra, and the kingdom of Dadan in AlUla</li><li><b>7th century:</b> the Prophet Muhammad ﷺ born in Makkah; Islam spreads from Makkah and Madinah</li><li><b>1727:</b> the first Saudi state is founded in Diriyah — celebrated as <b>Founding Day</b> (22 February)</li><li><b>1932:</b> King Abdulaziz unifies the country as the Kingdom of Saudi Arabia — celebrated as <b>National Day</b> (23 September)</li><li><b>1938:</b> commercial oil discovered in Dhahran</li><li><b>2016:</b> Vision 2030 launched to diversify the economy</li></ul>` },
  { id:'k-culture', ic:'🎭', t:'Culture & traditions', s:'Hospitality, dress, arts', body:`<ul><li><b>Hospitality</b> is central: guests are welcomed with <b>qahwa</b> (Arabic coffee with cardamom) and dates</li><li>Traditional dress: the <b>thobe</b> and <b>shemagh</b> or <b>ghutra</b> for men; the <b>abaya</b> for women</li><li><b>Ardah</b> — the traditional sword dance, recognised by UNESCO</li><li>Falconry, camel racing and poetry have deep roots</li><li>Friday is the main day for family gatherings</li></ul>` },
  { id:'k-food', ic:'🥘', t:'Saudi food guide', s:'Kabsa, mandi, jareesh…', body:`<ul><li><b>Kabsa</b> — the national dish: spiced rice with chicken or lamb</li><li><b>Mandi</b> — tender meat and rice slow-cooked in an underground oven</li><li><b>Jareesh</b> — cracked wheat cooked with meat or chicken</li><li><b>Saleeg</b> — creamy rice from the Hijaz, cooked in broth and milk</li><li><b>Mutabbaq</b> — stuffed, pan-fried pastry, a street-food favourite</li><li><b>Harees</b> — wheat and meat porridge, popular in Ramadan</li><li><b>Dates & qahwa</b> — served everywhere; Madinah's Ajwa and Qassim's Sukkari are famous</li></ul><h4>Good to know</h4><ul><li>All food is halal by law; pork and alcohol are not sold</li><li>Many restaurants have family sections</li><li>Popular delivery apps: HungerStation, Jahez, Mrsool</li></ul>` },
  { id:'k-landmarks', ic:'🏙️', t:'Famous landmarks', s:'Holy sites to skyscrapers', body:`<ul><li><b>Masjid al-Haram</b> and the Kaaba, Makkah</li><li><b>Al-Masjid an-Nabawi</b>, Madinah</li><li><b>Kingdom Centre</b> and <b>Al Faisaliah</b> towers, Riyadh</li><li><b>Diriyah</b> — At-Turaif district</li><li><b>Hegra</b> and <b>Elephant Rock</b>, AlUla</li><li><b>King Fahd's Fountain</b>, Jeddah — one of the tallest fountains in the world</li><li><b>Edge of the World</b>, near Riyadh</li></ul>` },
  { id:'k-expr', ic:'💬', t:'Saudi expressions', s:'Everyday dialect', body:`<ul><li><b>Yā halā</b> — welcome!</li><li><b>Hala wallah</b> — warm welcome</li><li><b>Tfaddal</b> — please, go ahead / help yourself</li><li><b>Abshir</b> — consider it done</li><li><b>Zain</b> — good, OK</li><li><b>Yallah</b> — let's go / come on</li><li><b>Khalas</b> — enough / finished</li><li><b>Wallah</b> — I swear / really</li><li><b>Mā shā' Allāh</b> — said to admire something</li><li><b>In shā' Allāh</b> — God willing</li><li><b>Ma‘alesh</b> — never mind, sorry</li></ul><p><button class="btn btn-ghost btn-sm" onclick="openItem('phrases')">🗣️ Arabic phrases with audio</button></p>` },
  { id:'k-cities', ic:'🌆', t:'Major cities', s:'At a glance', body:`<ul><li><b>Riyadh</b> — capital, government and business centre</li><li><b>Jeddah</b> — Red Sea port and gateway for pilgrims</li><li><b>Makkah</b> — holiest city in Islam (Muslims only)</li><li><b>Madinah</b> — city of the Prophet ﷺ</li><li><b>Dammam, Khobar & Dhahran</b> — Eastern Province, energy industry</li><li><b>Abha & Taif</b> — mountain cities, cooler summers</li><li><b>AlUla & Tabuk</b> — heritage and nature in the northwest</li></ul><p><button class="btn btn-ghost btn-sm" onclick="switchTab('explore');closePanel()">🧭 Explore city guides</button></p>` }
];

/* ---------- SAFETY / CAREER / HEALTH / TRANSPORT CONTENT ---------- */
const SAFETY = [
  { id:'s-passport', ic:'🛂', t:'Lost passport', s:'What to do, step by step', body:`<ol><li>Report the loss to the police (call 999 or use Absher if you are a resident) and get a report</li><li>Contact your embassy or consulate for an emergency travel document</li><li>Residents: report the lost passport on Absher; your employer or sponsor may need to be involved</li><li>Visitors: keep a copy of your visa and entry details — you'll need them</li><li>Tell your airline if you have a flight booked</li></ol><div class="note">Keep a photo of your passport and visa on your phone and in email before you travel.</div>` },
  { id:'s-phone', ic:'📱', t:'Lost phone', s:'Protect your accounts', body:`<ol><li>Use "Find My" (iPhone) or "Find My Device" (Android) from another device to locate, lock or erase it</li><li>Call your mobile operator to block the SIM</li><li>Change passwords for email, banking and social media</li><li>Tell your bank if banking apps were on the phone</li><li>Report to the police if it was stolen</li><li>Your Pi account: your passphrase is never stored on the phone by Pi — keep it written somewhere safe</li></ol>` },
  { id:'s-scams', ic:'🚫', t:'Scam awareness', s:'Common tricks & how to avoid them', body:`<ul><li><b>Fake visa or job offers</b> asking you to pay fees — real employers pay visa costs</li><li><b>Fake Hajj/Umrah packages</b> on social media — use Nusuk or licensed agents only</li><li><b>Messages pretending to be banks, Absher or couriers</b> asking for codes — never share OTP codes</li><li><b>Pi scams:</b> nobody legitimate will ask for your Pi passphrase. Never type it into any website or send it to anyone</li><li><b>Crypto "doubling"</b> or investment promises — if it sounds too good, it's a scam</li></ul><div class="note">If you are targeted, report it to the police (999) and your bank immediately.</div>` },
  { id:'s-heat', ic:'🥵', t:'Heat safety', s:'Stay safe in extreme heat', body:`<h4>Prevent</h4><ul><li>Drink water regularly — don't wait until you're thirsty</li><li>Use an umbrella and light-coloured, loose clothes</li><li>Avoid being outdoors from late morning to mid-afternoon in summer</li><li>Rest in shade and air-conditioned places</li></ul><h4>Warning signs</h4><ul><li><b>Heat exhaustion:</b> heavy sweating, weakness, dizziness, nausea — move to shade, cool down, sip water</li><li><b>Heat stroke</b> (emergency): very high body temperature, confusion, fainting, hot dry skin — <b>call 997 or 911</b> and cool the person immediately</li></ul>` },
  { id:'s-desert', ic:'🏜️', t:'Desert safety', s:'Before you go off-road', body:`<ul><li>Never go alone — travel with at least two vehicles</li><li>Tell someone your route and return time</li><li>Carry plenty of water (several litres per person per day), food, fuel, a spare tyre and a power bank</li><li>Mobile coverage may disappear — download offline maps</li><li>If your car gets stuck or breaks down, stay with the vehicle</li><li>Nights can be cold in winter; bring warm layers</li></ul>` },
  { id:'s-road', ic:'🚦', t:'Road safety', s:'Driving in Saudi Arabia', body:`<ul><li>Drive on the right; seatbelts are required for everyone</li><li>Speed and traffic cameras are widespread; fines can be checked on Absher</li><li>Using a phone while driving is prohibited</li><li>Watch for camels crossing on rural highways, especially at night</li><li>After an accident with no injuries, move to safety and report via the official app or 993</li><li>With injuries, call 997 or 911</li></ul>` },
  { id:'s-medical', ic:'🩺', t:'Medical emergencies', s:'Where to go & what to do', body:`<ul><li>For emergencies call <b>997</b> (ambulance) or <b>911</b></li><li>Go to the emergency department of the nearest hospital — use <b>Explore › Hospitals</b> to find one</li><li>Carry your passport or Iqama and insurance card</li><li>Pharmacies are widespread; many medicines need a prescription</li><li>In Makkah and Madinah, medical centres operate near the Haram during peak seasons</li></ul><p><button class="btn btn-ghost btn-sm" onclick="openMap('health',true)">🏥 Hospitals near me</button> <button class="btn btn-ghost btn-sm" onclick="openMap('pharmacy',true)">💊 Pharmacies near me</button></p>` },
  { id:'s-docs', ic:'🗂️', t:'Important documents', s:'What to keep copies of', body:`<p>Keep digital copies (phone + email) and paper copies separate from the originals:</p><ul><li>Passport photo page and visa</li><li>Iqama (residents) and Absher login details stored securely</li><li>Flight tickets and hotel bookings</li><li>Travel / medical insurance card</li><li>Vaccination certificates</li><li>Emergency contacts and embassy details</li><li>Bank card emergency numbers</li></ul><div class="note">Don't store passwords or your Pi passphrase in photos or notes on your phone.</div>` },
  { id:'s-tourist', ic:'🧳', t:'Tourist safety', s:'General tips', body:`<ul><li>Saudi Arabia is generally safe for visitors; normal precautions apply</li><li>Respect local laws and dress codes, especially at religious sites</li><li>Use licensed taxis and ride-hailing apps</li><li>Keep valuables secure in crowded areas like the Haram and markets</li><li>Agree on a meeting point with your group in case you get separated</li></ul>` }
];
const CAREER_CONTENT = [
  { id:'c-cvguide', ic:'📝', t:'Saudi CV guide', s:'What employers expect', body:`<ul><li><b>Length:</b> 1–2 pages; clear headings</li><li><b>Personal details:</b> name, phone, email, city; nationality and visa/Iqama status are often included</li><li><b>Photo:</b> common in the region but optional — use a professional one if included</li><li><b>Summary:</b> 3–4 lines on your strengths and goal</li><li><b>Experience:</b> newest first, with achievements and numbers</li><li><b>Education & certifications:</b> attested degrees matter for work visas</li><li><b>Languages:</b> Arabic and English levels are valued</li><li>Save as PDF with your name in the file name</li></ul><p><button class="btn btn-primary btn-sm" onclick="openItem('cvBuilder')">📄 Build my CV</button></p>` },
  { id:'c-interview', ic:'🎤', t:'Interview preparation', s:'Common questions & tips', body:`<h4>Common questions</h4><ol><li>Tell me about yourself.</li><li>Why do you want to work in Saudi Arabia / with us?</li><li>Describe a challenge you solved.</li><li>How do you work in a multicultural team?</li><li>What are your salary expectations?</li><li>Where do you see yourself in five years?</li></ol><h4>Tips</h4><ul><li>Research the company and Vision 2030 links to its sector</li><li>Use the STAR method: Situation, Task, Action, Result</li><li>Dress formally and arrive early; for video calls test your connection</li><li>Ask about the contract, housing, transport allowance and probation period</li></ul><p><button class="btn btn-ghost btn-sm" onclick="openAI('career','Run a mock job interview with me. Ask one question at a time and give feedback.')">🤖 Practise with AI</button></p>` },
  { id:'c-roadmap', ic:'🧭', t:'Career roadmap', s:'From student to professional', body:`<ol><li><b>Know your direction</b> — pick 1–2 target roles and sectors</li><li><b>Build skills</b> — courses, certifications and projects in those areas</li><li><b>Get experience</b> — internships, volunteering, freelance work</li><li><b>Build your profile</b> — CV, LinkedIn, portfolio</li><li><b>Network</b> — events, alumni, professional groups</li><li><b>Apply smartly</b> — tailor your CV for each job; follow up politely</li><li><b>Grow</b> — ask for feedback, set yearly goals</li></ol>` },
  { id:'c-jobs', ic:'🔎', t:'Where to find jobs', s:'Trusted platforms', body:`<ul><li><b>Jadarat</b> — national unified employment platform</li><li><b>Qiwa</b> — contracts and job mobility for private-sector workers</li><li>Company career pages directly</li><li>LinkedIn and established job boards</li><li>University career centres and graduate programmes</li></ul><div class="note">Never pay a recruiter for a job or visa. Legitimate employers cover visa costs.</div>` }
];
const EXTRA_CONTENT = EXPERIENCES.concat(KNOW, SAFETY, CAREER_CONTENT, [
  { id:'k-health', ic:'🏥', t:'Healthcare information', s:'Hospitals, insurance, pharmacies', body:`<ul><li>Visitors need medical insurance (usually included with the visa)</li><li>Residents are covered through employer health insurance</li><li>Book appointments and view records in the <b>Sehhaty</b> app</li><li>Emergencies: <b>997</b> or <b>911</b></li><li>Pharmacies are widespread and many open late</li></ul><p><button class="btn btn-ghost btn-sm" onclick="openMap('health',true)">🏥 Hospitals near me</button></p>` },
  { id:'t-guide', ic:'🚕', t:'Getting around guide', s:'Taxis, ride-hailing, parking', body:`<h4>Ride-hailing & taxis</h4><ul><li>Licensed apps such as Uber and Careem operate in major cities</li><li>Airport taxis are licensed and metered — use the official rank</li></ul><h4>Public transport</h4><ul><li>Haramain High-Speed Railway (Makkah–Jeddah–Madinah)</li><li>Riyadh Metro and city buses</li><li>Intercity coaches between most cities</li></ul><h4>Parking</h4><ul><li>Paid parking in city centres is often by app or machine</li><li>Near the Haram in peak seasons, park at designated car parks and use shuttle buses</li></ul><p><button class="btn btn-ghost btn-sm" onclick="openItem('transport')">🚆 Transport planner</button></p>` }
]);

/* ---------- BUSINESS DIRECTORY & PI HUB ---------- */
const BIZ_CATS = ['Restaurant','Café','Hotel','Shop','Services','Freelancer','Startup','Health','Education','Transport','Travel agency','Other'];
const dirState = { pi:false, cat:'', city:'' };
function openDirectory(piOnly){
  if(piOnly != null) dirState.pi = piOnly;
  showPanel(dirState.pi ? 'Pi merchants' : 'Business directory', `
    <div class="chips"><button class="chip ${!dirState.pi ? 'on' : ''}" onclick="dirState.pi=false;openDirectory()">All businesses</button><button class="chip ${dirState.pi ? 'on' : ''}" onclick="dirState.pi=true;openDirectory()">π Accepts Pi</button></div>
    <div class="two"><select onchange="dirState.cat=this.value;loadDirectory()"><option value="">All categories</option>${BIZ_CATS.map(function(c){ return `<option ${c === dirState.cat ? 'selected' : ''}>${c}</option>`; }).join('')}</select>
    <select onchange="dirState.city=this.value;loadDirectory()"><option value="">All cities</option>${MAP_CITIES.map(function(c){ return `<option ${c === dirState.city ? 'selected' : ''}>${c}</option>`; }).join('')}</select></div>
    <div id="dirList" style="margin-top:12px"></div>
    <button class="btn btn-primary" style="margin:14px auto 0" onclick="openItem('addBusiness')">＋ Add your business</button>
    <p class="small" style="text-align:center;margin-top:10px">Every listing is reviewed before it appears. DigitalSaudi does not endorse listed businesses.</p>`, { id:'directory' });
  loadDirectory();
}
function loadDirectory(){
  if(!$('dirList')) return;
  $('dirList').innerHTML = '<div class="row"><div class="skeleton"></div></div><div class="row"><div class="skeleton"></div></div>';
  getJSON('/directory?' + (dirState.pi ? 'pi=1&' : '') + (dirState.cat ? 'cat=' + encodeURIComponent(dirState.cat) + '&' : '') + (dirState.city ? 'city=' + encodeURIComponent(dirState.city) : '')).then(function(d){
    const items = (d && d.items) || []; window._biz = window._biz || {}; items.forEach(function(b){ window._biz[b.id] = b; });
    store.set('dir_cache', items.slice(0, 50)); if(!$('dirList')) return;
    $('dirList').innerHTML = items.length ? items.map(bizRowHTML).join('') : `<div class="empty"><div class="big">${dirState.pi ? 'π' : '🏪'}</div>No listings here yet.<br>Be the first to add one!</div>`;
  }).catch(function(){ if($('dirList')) $('dirList').innerHTML = '<div class="empty"><div class="big">📡</div>Directory unavailable right now.</div>'; });
}
function bizRowHTML(b){ return `<button class="row" onclick="openBiz(${b.id})"><div class="ic">${b.accepts_pi ? 'π' : '🏪'}</div><div class="tx"><b>${esc(b.name)}</b><small>${esc(b.category)} · ${esc(b.city)}${b.accepts_pi ? ' <span class="tagl pi">Accepts Pi</span>' : ''}</small></div><span class="chev">›</span></button>`; }
function openBiz(id){
  const b = (window._biz || {})[id] || store.get('dir_cache', []).find(function(x){ return x.id === id; });
  if(!b){ getJSON('/directory?id=' + id).then(function(d){ if(d && d.items && d.items[0]){ window._biz = window._biz || {}; window._biz[id] = d.items[0]; openBiz(id); } }); return; }
  award('business'); if(b.accepts_pi) award('piMerchant');
  const wa = (b.whatsapp || '').replace(/[^\d]/g, '');
  showPanel(b.name, `<div class="card" style="text-align:center"><div style="font-size:42px">${b.accepts_pi ? 'π' : '🏪'}</div><h3 style="margin:6px 0 2px">${esc(b.name)}</h3><div class="small">${esc(b.category)} · ${esc(b.city)}</div>${b.accepts_pi ? '<div style="margin-top:8px"><span class="tagl pi" style="font-size:12px">✓ Accepts Pi</span></div>' : ''}</div>
    ${b.description ? `<p style="margin:14px 0">${esc(b.description)}</p>` : ''}
    <div class="card">${b.address ? `<div class="rate"><span>📫 Address</span><b style="text-align:right;max-width:60%">${esc(b.address)}</b></div>` : ''}${b.phone ? `<div class="rate"><span>📞 Phone</span><b><a href="tel:${esc(b.phone)}">${esc(b.phone)}</a></b></div>` : ''}${b.website ? `<div class="rate"><span>🌐 Website</span><b><a href="${esc(b.website)}">${esc(b.website.replace(/^https?:\/\//, '').slice(0, 36))}</a></b></div>` : ''}${b.pi_username ? `<div class="rate" style="border:0"><span>π Pi username</span><b>@${esc(b.pi_username)}</b></div>` : ''}</div>
    <div class="p-actions">${b.phone ? `<a class="btn btn-primary btn-sm" href="tel:${esc(b.phone)}">📞 Call</a>` : ''}${wa ? `<a class="btn btn-ghost btn-sm" href="https://wa.me/${wa}">💬 WhatsApp</a>` : ''}${b.lat && b.lng ? `<a class="btn btn-ghost btn-sm" href="https://www.google.com/maps/dir/?api=1&destination=${b.lat},${b.lng}">🧭 Directions</a>` : ''}${b.pi_username ? `<button class="btn btn-ghost btn-sm" onclick="copyText('${esc(b.pi_username)}')">📋 Copy Pi username</button>` : ''}</div>
    ${b.accepts_pi ? `<div class="note">π <b>Paying with Pi:</b> confirm the price and the merchant's Pi username in person before sending. Pi transfers can't be reversed.</div>` : ''}
    <p class="small" style="margin-top:12px">Listed by the business owner and reviewed by DigitalSaudi. <button style="color:var(--gold);font-weight:700;font-size:12px" onclick="openFeedback('Report listing #${b.id}: ${esc(b.name).replace(/'/g, '')}')">Report this listing</button></p>`, { id:'biz' });
  current.share = function(){ shareText(b.name, b.name + ' — ' + b.category + ', ' + b.city + (b.accepts_pi ? ' · accepts Pi' : '') + ' · on DigitalSaudi', location.origin); }; $('pShare').classList.add('on');
}
function addBusinessPanel(){
  if(!piUser){
    showPanel('Add your business', `<div class="lock-wrap"><div class="big">🏪</div><h3>Sign in to add a business</h3><p class="small" style="margin:6px 0 18px">We ask for a Pi sign-in to keep the directory free of spam.</p><button class="btn btn-primary" style="margin:0 auto" onclick="pendingAction=function(){openItem('addBusiness')};piLogin()">π Sign in with Pi</button></div>`, { id:'addBusiness', share:false });
    return;
  }
  const f = function(id, l, ph, type){ return `<div class="field"><label>${l}</label><input id="bz_${id}" ${type ? 'type="' + type + '"' : ''} placeholder="${ph || ''}"></div>`; };
  showPanel('Add your business', `<p class="small" style="margin-bottom:12px">Free listing. Reviewed within about 48 hours before it appears.</p>
    ${f('name','Business name *','')}
    <div class="two"><div class="field"><label>Category *</label><select id="bz_category">${BIZ_CATS.map(function(c){ return '<option>' + c + '</option>'; }).join('')}</select></div><div class="field"><label>City *</label><select id="bz_city">${MAP_CITIES.map(function(c){ return '<option>' + c + '</option>'; }).join('')}</select></div></div>
    <div class="field"><label>Description *</label><textarea id="bz_description" rows="3" maxlength="500" placeholder="What you offer, opening hours…"></textarea></div>
    ${f('address','Address','Street, district')}
    <div class="two">${f('phone','Phone','+966…','tel')}${f('whatsapp','WhatsApp','+966…','tel')}</div>
    ${f('website','Website','https://…','url')}
    <div class="field"><label>Location</label><button class="btn btn-ghost btn-sm" onclick="bizLocate()" id="bzLoc">📍 Use my current location</button><input type="hidden" id="bz_lat"><input type="hidden" id="bz_lng"></div>
    <div class="setting"><div><b>Accepts Pi</b><div class="small">Show in Pi merchants & on the map</div></div><button class="toggle" id="bz_pi" onclick="this.classList.toggle('on');$('bzPiUser').style.display=this.classList.contains('on')?'block':'none'"></button></div>
    <div id="bzPiUser" style="display:none;margin-top:12px">${f('pi_username','Pi username for payments', piUser.username)}</div>
    <label style="display:flex;gap:10px;align-items:flex-start;margin:14px 0;font-size:13.5px"><input type="checkbox" id="bz_ok" style="width:22px;min-height:22px;margin-top:2px"> I own or represent this business and the information is accurate.</label>
    <button class="btn btn-primary" id="bzSend" style="margin:0 auto" onclick="submitBusiness()">Submit for review</button>`, { id:'addBusiness', share:false });
}
function bizLocate(){
  if(!navigator.geolocation) return toast('Location not available');
  $('bzLoc').textContent = 'Locating…';
  navigator.geolocation.getCurrentPosition(function(p){ $('bz_lat').value = p.coords.latitude.toFixed(6); $('bz_lng').value = p.coords.longitude.toFixed(6); $('bzLoc').textContent = '✓ Location added'; }, function(){ $('bzLoc').textContent = '📍 Use my current location'; toast('Location permission denied'); }, { enableHighAccuracy:true, timeout:15000 });
}
function submitBusiness(){
  const v = function(k){ const el = $('bz_' + k); return el ? el.value.trim() : ''; };
  if(!v('name') || !v('description')) return toast('Please add a name and description');
  if(!$('bz_ok').checked) return toast('Please confirm the information is accurate');
  const body = { name:v('name'), category:v('category'), city:v('city'), description:v('description'), address:v('address'), phone:v('phone'), whatsapp:v('whatsapp'), website:v('website'), lat:v('lat'), lng:v('lng'), accepts_pi:$('bz_pi').classList.contains('on'), pi_username:$('bz_pi').classList.contains('on') ? (v('pi_username') || piUser.username) : '', uid:piUser.uid, username:piUser.username, accessToken:piUser.accessToken };
  const b = $('bzSend'); b.disabled = true; b.innerHTML = '<div class="spinner"></div>';
  fetch('/directory', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(body) }).then(function(r){ return r.json(); }).then(function(d){
    if(d && d.ok){ showPanel('Submitted', '<div class="lock-wrap"><div class="big">✅</div><h3>Thanks — submitted for review</h3><p class="small" style="margin:6px 0 18px">Your listing will appear once approved, usually within 48 hours.</p><button class="btn btn-ghost" style="margin:0 auto" onclick="openItem(\'directory\')">Back to directory</button></div>', { id:'addBusiness', share:false }); }
    else { toast((d && d.error) || 'Could not submit — try again'); b.disabled = false; b.textContent = 'Submit for review'; }
  }).catch(function(){ toast('Network error — try again'); b.disabled = false; b.textContent = 'Submit for review'; });
}
function piHubPanel(){
  const p = store.get('pi', null);
  showPanel('Pi Hub', `<div class="pi-card"><div style="display:flex;align-items:center;gap:10px"><div class="sym" aria-hidden="true"><svg class="i"><use href="#i-chart"/></svg></div><div><b>Pi Network</b><br><small>Live from ${p && p.src ? esc(p.src) : 'market data'}</small></div></div>
      <div class="price">${p && p.usd ? '$' + fmt(p.usd, 4) : '—'}</div><small>${p && p.sar ? fmt(p.sar, 4) + ' SAR' : ''}${p && p.change != null ? ' · ' + (p.change >= 0 ? '▲' : '▼') + Math.abs(p.change).toFixed(2) + '% 24h' : ''}</small></div>
    <div class="grid-4" style="margin-top:12px">
      <button class="tile" onclick="openItem('piWallet')"><div class="ic">🧾</div><span>Requests</span></button>
      <button class="tile" onclick="openDirectory(true)"><div class="ic">π</div><span>Merchants</span></button>
      <button class="tile" onclick="openMap('pi',true)"><div class="ic">🗺️</div><span>Pi map</span></button>
      <button class="tile" onclick="openItem('merchantQR')"><div class="ic">▦</div><span>Merchant QR</span></button></div>
    <h4>Pi merchants</h4><div id="piMerch"><div class="row"><div class="skeleton"></div></div></div>
    <button class="row" onclick="openItem('addBusiness')"><div class="ic">🏪</div><div class="tx"><b>Accept Pi at your business</b><small>Get listed free — shown on the Pi map</small></div><span class="chev">›</span></button>
    <h4>Stay safe with Pi</h4><ul><li>Never share your Pi passphrase — not with anyone, not on any website</li><li>Only use Pi apps inside the Pi Browser</li><li>Confirm the merchant's username and amount before paying</li><li>Pi transfers can't be reversed</li></ul>
    <p class="small">Prices are for information only and are not financial advice.</p>`, { id:'piHub' });
  getJSON('/directory?pi=1&limit=5').then(function(d){ const items = (d && d.items) || []; window._biz = window._biz || {}; items.forEach(function(b){ window._biz[b.id] = b; }); if($('piMerch')) $('piMerch').innerHTML = items.length ? items.map(bizRowHTML).join('') : '<p class="small">No Pi merchants listed yet — be the first!</p>'; }).catch(function(){ if($('piMerch')) $('piMerch').innerHTML = '<p class="small">Merchants unavailable right now.</p>'; });
}
function merchantQRPanel(){
  showPanel('Merchant QR', `<p style="margin-bottom:12px">Show customers a QR code with your Pi username or wallet address so they can pay you accurately in their Pi Wallet.</p>
    <div class="field"><label>Pi username or wallet address</label><input id="qrIn" value="${piUser ? esc(piUser.username) : ''}" placeholder="username or G… address"></div>
    <div class="field"><label>Label (optional)</label><input id="qrLbl" placeholder="e.g. Al Noor Café"></div>
    <button class="btn btn-primary" style="margin:0 auto" onclick="makeQR()">Generate QR</button>
    <div id="qrOut" style="text-align:center"></div>
    <p class="small" style="margin-top:12px">Customers should always confirm the amount with you before sending. Pi transfers can't be reversed.</p>`, { id:'merchantQR', share:false });
}
function makeQR(){
  const v = $('qrIn').value.trim(); if(!v) return toast('Enter a username or address');
  $('qrOut').innerHTML = '<div class="spinner" style="margin:16px auto;border-color:var(--line);border-top-color:var(--accent)"></div>';
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js').then(function(){
    if(!$('qrOut')) return;
    $('qrOut').innerHTML = '<div class="qr" id="qrBox"></div><b>' + esc($('qrLbl').value || 'Pay with Pi') + '</b><div class="small">' + esc(v) + '</div>';
    new QRCode($('qrBox'), { text:v, width:220, height:220, correctLevel:QRCode.CorrectLevel.M });
  }).catch(function(){ if($('qrOut')) $('qrOut').innerHTML = '<p class="small">QR generator could not load. Check your connection.</p>'; });
}

/* ---------- hotel cost calculator ---------- */
function hotelCalcPanel(){
  showPanel('Hotel cost calculator', `<div class="two"><div class="field"><label>Nights</label><input id="hc_n" type="number" value="5" oninput="calcHotel()"></div><div class="field"><label>Rooms</label><input id="hc_r" type="number" value="1" oninput="calcHotel()"></div></div>
    <div class="field"><label>Price per room per night (SAR)</label><input id="hc_p" type="number" value="450" oninput="calcHotel()"></div>
    <div class="field"><label>Price includes VAT?</label><select id="hc_v" onchange="calcHotel()"><option value="no">No — add 15% VAT</option><option value="yes">Yes</option></select></div>
    <div class="field"><label>Other fees % (optional)</label><input id="hc_o" type="number" value="0" oninput="calcHotel()"></div>
    <div class="result"><small>Total</small><b id="hcT">—</b><small id="hcO"></small></div>`, { id:'hotelCalc' });
  ensureRates().then(calcHotel); calcHotel();
}
function calcHotel(){
  if(!$('hc_n')) return;
  const g = function(k){ return Math.max(0, parseFloat($('hc_' + k).value) || 0); };
  let t = g('n') * g('r') * g('p'); if($('hc_v').value === 'no') t *= 1.15; t *= 1 + g('o') / 100;
  const c = function(x){ const r = convert(t, 'SAR', x); return r == null ? '' : fmt(r, x === 'PI' ? 1 : 0) + ' ' + (x === 'PI' ? 'π' : x); };
  $('hcT').textContent = fmt(t, 0) + ' SAR'; $('hcO').textContent = [c('USD'), c('EUR'), c('PI')].filter(Boolean).join(' · ');
}

/* =====================================================================
   v3 — TOOLS: career, safety, notifications, events, AI, badges
   ===================================================================== */

/* ---------- CAREER ---------- */
function cvData(){ return store.get('cv', { name:piUser ? piUser.username : '', title:'', phone:'', email:'', city:'', nationality:'', summary:'', experience:'', education:'', skills:'', languages:'English, Arabic', certs:'' }); }
function cvBuilderPanel(){
  const c = cvData();
  const f = function(k, l, ph){ return `<div class="field"><label>${l}</label><input id="cv_${k}" value="${esc(c[k])}" placeholder="${ph || ''}" oninput="cvSave()"></div>`; };
  const t = function(k, l, ph, r){ return `<div class="field"><label>${l}</label><textarea id="cv_${k}" rows="${r || 4}" placeholder="${ph || ''}" oninput="cvSave()">${esc(c[k])}</textarea></div>`; };
  showPanel('CV builder', `<p class="small" style="margin-bottom:12px">Fill in your details — saved automatically on this device. Then preview and download as PDF.</p>
    ${f('name','Full name')}${f('title','Job title / target role','e.g. Agricultural Engineer')}
    <div class="two">${f('phone','Phone','+234… / +966…')}${f('email','Email')}</div>
    <div class="two">${f('city','City, Country','Jeddah, Saudi Arabia')}${f('nationality','Nationality / visa status (optional)')}</div>
    ${t('summary','Professional summary','3–4 lines about your strengths and goals', 3)}
    ${t('experience','Experience — one per line','Role — Organisation — 2023–2025 — key achievement', 5)}
    ${t('education','Education — one per line','B.Eng Agricultural Engineering — University — 2026', 3)}
    ${f('skills','Skills (comma separated)','Project management, GIS, Excel')}
    ${f('languages','Languages','English (fluent), Arabic (basic)')}
    ${t('certs','Certifications & volunteering — one per line','', 3)}
    <div class="p-actions"><button class="btn btn-primary btn-sm" onclick="cvPreview()">👁️ Preview CV</button><button class="btn btn-ghost btn-sm" onclick="openItem('c-cvguide')">📝 CV tips</button></div>`, { id:'cvBuilder', share:false });
}
function cvSave(){ const c = {}; ['name','title','phone','email','city','nationality','summary','experience','education','skills','languages','certs'].forEach(function(k){ c[k] = $('cv_' + k).value; }); store.set('cv', c); }
function cvLines(s){ return String(s || '').split('\n').map(function(x){ return x.trim(); }).filter(Boolean); }
function cvPreview(){
  const c = cvData(); if(!c.name) return toast('Add your name first');
  const sec = function(h, body){ return body ? `<h3>${h}</h3>${body}` : ''; };
  const list = function(s){ const l = cvLines(s); return l.length ? '<ul style="padding-left:18px;margin:0">' + l.map(function(x){ return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' : ''; };
  showPanel('CV preview', `<div class="cv-prev"><h2>${esc(c.name)}</h2><div style="color:#006C35;font-weight:700">${esc(c.title)}</div><div style="color:#555;margin-top:4px">${[c.phone, c.email, c.city, c.nationality].filter(Boolean).map(esc).join(' · ')}</div>
    ${sec('Profile', c.summary ? '<p style="margin:0">' + esc(c.summary) + '</p>' : '')}${sec('Experience', list(c.experience))}${sec('Education', list(c.education))}
    ${sec('Skills', c.skills ? '<p style="margin:0">' + esc(c.skills) + '</p>' : '')}${sec('Languages', c.languages ? '<p style="margin:0">' + esc(c.languages) + '</p>' : '')}${sec('Certifications & volunteering', list(c.certs))}</div>
    <div class="p-actions" style="justify-content:center"><button class="btn btn-primary btn-sm" id="cvPdf" onclick="cvPDF()">⬇️ Download PDF</button><button class="btn btn-ghost btn-sm" onclick="openItem('cvBuilder')">✏️ Edit</button><button class="btn btn-ghost btn-sm" onclick="cvShare()">📤 Share text</button></div>`, { id:'cvBuilder', share:false });
  award('cv');
}
function cvText(){ const c = cvData(); return [c.name, c.title, [c.phone, c.email, c.city].filter(Boolean).join(' · '), '', c.summary && 'PROFILE\n' + c.summary, cvLines(c.experience).length && 'EXPERIENCE\n' + cvLines(c.experience).map(function(x){ return '• ' + x; }).join('\n'), cvLines(c.education).length && 'EDUCATION\n' + cvLines(c.education).map(function(x){ return '• ' + x; }).join('\n'), c.skills && 'SKILLS\n' + c.skills, c.languages && 'LANGUAGES\n' + c.languages, cvLines(c.certs).length && 'CERTIFICATIONS\n' + cvLines(c.certs).map(function(x){ return '• ' + x; }).join('\n')].filter(function(x){ return x !== false && x !== undefined; }).join('\n\n'); }
function cvShare(){ shareText('My CV', cvText(), location.origin); }
function cvPDF(){
  const b = $('cvPdf'); b.disabled = true; b.textContent = 'Preparing…';
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js').then(function(){
    const c = cvData(), doc = new window.jspdf.jsPDF({ unit:'pt', format:'a4' }), W = 595, M = 48; let y = 60;
    const line = function(txt, size, bold, color, gap){ doc.setFont('helvetica', bold ? 'bold' : 'normal'); doc.setFontSize(size); doc.setTextColor.apply(doc, color || [20, 20, 20]); doc.splitTextToSize(String(txt), W - 2 * M).forEach(function(l){ if(y > 790){ doc.addPage(); y = 60; } doc.text(l, M, y); y += size * 1.35; }); y += gap || 0; };
    const head = function(h){ y += 8; line(h.toUpperCase(), 10.5, true, [0, 108, 53]); doc.setDrawColor(0, 108, 53); doc.setLineWidth(1.2); doc.line(M, y - 9, W - M, y - 9); y += 4; };
    line(c.name, 22, true); if(c.title) line(c.title, 12, true, [0, 108, 53]);
    line([c.phone, c.email, c.city, c.nationality].filter(Boolean).join('  ·  '), 9.5, false, [90, 90, 90], 6);
    if(c.summary){ head('Profile'); line(c.summary, 10.5); }
    [['Experience', c.experience], ['Education', c.education]].forEach(function(s){ const l = cvLines(s[1]); if(l.length){ head(s[0]); l.forEach(function(x){ line('•  ' + x, 10.5, false, null, 2); }); } });
    if(c.skills){ head('Skills'); line(c.skills, 10.5); }
    if(c.languages){ head('Languages'); line(c.languages, 10.5); }
    const ce = cvLines(c.certs); if(ce.length){ head('Certifications & volunteering'); ce.forEach(function(x){ line('•  ' + x, 10.5, false, null, 2); }); }
    doc.save((c.name || 'CV').replace(/[^\w\- ]/g, '').replace(/\s+/g, '_') + '_CV.pdf');
    if(document.body.contains(b)){ b.disabled = false; b.textContent = '⬇️ Download PDF'; } toast('📄 CV downloaded');
  }).catch(function(){ b.disabled = false; b.textContent = '⬇️ Download PDF'; toast('PDF tool could not load — use Share text instead'); });
}
function salaryPanel(){
  const s = store.get('salary', { basic:6000, housing:1500, transport:500, other:0, nat:'expat', gosi:0 });
  const f = function(k, l){ return `<div class="field"><label>${l}</label><input id="sl_${k}" type="number" inputmode="decimal" value="${s[k]}" oninput="calcSalary()"></div>`; };
  showPanel('Salary calculator', `<p class="small" style="margin-bottom:12px">Monthly amounts in SAR.</p>
    <div class="two">${f('basic','Basic salary')}${f('housing','Housing allowance')}</div><div class="two">${f('transport','Transport allowance')}${f('other','Other allowances')}</div>
    <div class="two"><div class="field"><label>You are</label><select id="sl_nat" onchange="$('sl_gosi').value=this.value==='saudi'?9.75:0;calcSalary()"><option value="expat" ${s.nat === 'expat' ? 'selected' : ''}>Non-Saudi</option><option value="saudi" ${s.nat === 'saudi' ? 'selected' : ''}>Saudi national</option></select></div>${f('gosi','Your GOSI deduction %')}</div>
    <div class="grid"><div class="result"><small>Gross / month</small><b id="slG">—</b></div><div class="result"><small>Net / month</small><b id="slN">—</b></div></div>
    <div class="card" style="margin-top:12px" id="slX"></div>
    <p class="small" style="margin-top:12px">GOSI is calculated on basic + housing. Saudi employees commonly contribute about 9.75% (rates for new entrants are being phased up); non-Saudi employees usually pay 0% — the employer pays occupational hazard cover. Check your payslip. There is no personal income tax in Saudi Arabia.</p>`, { id:'salary' });
  ensureRates().then(calcSalary); calcSalary();
}
function calcSalary(){
  if(!$('sl_basic')) return;
  const g = function(k){ return Math.max(0, parseFloat($('sl_' + k).value) || 0); };
  const s = { basic:g('basic'), housing:g('housing'), transport:g('transport'), other:g('other'), nat:$('sl_nat').value, gosi:g('gosi') };
  store.set('salary', s);
  const gross = s.basic + s.housing + s.transport + s.other, ded = Math.min(s.basic + s.housing, 45000) * s.gosi / 100, net = gross - ded;
  $('slG').textContent = fmt(gross, 0); $('slN').textContent = fmt(net, 0);
  const c = function(x){ const r = convert(net, 'SAR', x); return r == null ? '—' : fmt(r, 0); };
  const ngn = c('EUR'), usd = c('USD');   // v6.3: no "−0" and no "₦—" rows when a rate is missing
  $('slX').innerHTML = `<div class="rate"><span>${t('GOSI deduction')}</span><b>${ded > 0 ? '−' : ''}${fmt(ded, 0)} SAR</b></div><div class="rate"${ngn === '—' && usd === '—' ? ' style="border:0"' : ''}><span>${t('Net per year')}</span><b>${fmt(net * 12, 0)} SAR</b></div>` +
    (ngn !== '—' ? `<div class="rate"><span>${t('Net / month in EUR')}</span><b>€${ngn}</b></div>` : '') + (usd !== '—' ? `<div class="rate" style="border:0"><span>${t('Net / month in USD')}</span><b>$${usd}</b></div>` : '');
}
function gratuityPanel(){
  const g = store.get('gratuity', { start:'2020-01-01', end:ksaDate(), wage:8000, reason:'end' });
  showPanel('End-of-service gratuity', `<p class="small" style="margin-bottom:12px">Estimate under the Saudi Labor Law (Articles 84–85).</p>
    <div class="two"><div class="field"><label>Start date</label><input id="gr_start" type="date" value="${g.start}" onchange="calcGratuity()"></div><div class="field"><label>End date</label><input id="gr_end" type="date" value="${g.end}" onchange="calcGratuity()"></div></div>
    <div class="field"><label>Last monthly wage (SAR)</label><input id="gr_wage" type="number" inputmode="decimal" value="${g.wage}" oninput="calcGratuity()"></div>
    <div class="field"><label>How the job ended</label><select id="gr_reason" onchange="calcGratuity()"><option value="end" ${g.reason === 'end' ? 'selected' : ''}>Contract ended / employer terminated</option><option value="resign" ${g.reason === 'resign' ? 'selected' : ''}>I resigned</option></select></div>
    <div class="result"><small>Estimated gratuity</small><b id="grOut">—</b><small id="grYrs"></small></div>
    <div class="card" style="margin-top:12px" id="grHow"></div>
    <p class="small" style="margin-top:12px">Wage usually means your last actual wage (basic plus fixed allowances such as housing) — check your contract. Special cases (e.g. force majeure, women resigning after marriage or childbirth) can differ. This is an estimate, not legal advice.</p>`, { id:'gratuity' });
  calcGratuity();
}
function calcGratuity(){
  if(!$('gr_start')) return;
  const s = $('gr_start').value, e = $('gr_end').value, w = Math.max(0, parseFloat($('gr_wage').value) || 0), r = $('gr_reason').value;
  store.set('gratuity', { start:s, end:e, wage:w, reason:r });
  if(!s || !e || e <= s){ $('grOut').textContent = '—'; $('grYrs').textContent = 'Check the dates'; $('grHow').innerHTML = ''; return; }
  const yrs = (new Date(e) - new Date(s)) / (365.25 * 86400000);
  const first = Math.min(yrs, 5) * w / 2, rest = Math.max(0, yrs - 5) * w, full = first + rest;
  let factor = 1, note = 'Full award';
  if(r === 'resign'){ if(yrs < 2){ factor = 0; note = 'Less than 2 years: no award on resignation'; } else if(yrs < 5){ factor = 1 / 3; note = '2–5 years: one-third of the award'; } else if(yrs < 10){ factor = 2 / 3; note = '5–10 years: two-thirds of the award'; } else note = '10+ years: full award'; }
  $('grOut').textContent = fmt(full * factor, 0) + ' SAR'; $('grYrs').textContent = fmt(yrs, 2) + ' years of service';
  $('grHow').innerHTML = `<div class="rate"><span>First 5 years (½ month/year)</span><b>${fmt(first, 0)}</b></div><div class="rate"><span>After 5 years (1 month/year)</span><b>${fmt(rest, 0)}</b></div><div class="rate"${r === 'resign' ? '' : ' style="border:0"'}><span>${t('Full award')}</span><b>${fmt(full, 0)}</b></div>` + (r === 'resign' ? `<div class="rate" style="border:0"><span>${t(note)}</span><b>${factor === 1 ? t('100%') : factor === 0 ? t('None') : factor < .5 ? '⅓' : '⅔'}</b></div>` : '');   // v6.3: the "Full award × 1" row repeated itself
}
const SKILLS = [['Communication','I explain ideas clearly in writing and speaking'],['Digital','I use Excel, email and online tools confidently'],['English','I can work fully in English'],['Arabic','I can communicate in Arabic'],['Teamwork','I work well in diverse teams'],['Problem solving','I find practical solutions under pressure'],['Leadership','I have led a team, project or group'],['Technical','I have strong skills in my field']];
function skillsPanel(){
  const s = store.get('skills', {});
  showPanel('Skills assessment', `<p class="small" style="margin-bottom:12px">Rate yourself from 1 (not yet) to 5 (very strong).</p>` + SKILLS.map(function(x, i){ return `<div class="card" style="margin-bottom:8px"><b>${x[0]}</b><div class="small">${x[1]}</div><div class="opt" style="margin-top:8px">${[1,2,3,4,5].map(function(n){ return `<button class="${s[i] === n ? 'on' : ''}" onclick="rateSkill(${i},${n},this)">${n}</button>`; }).join('')}</div></div>`; }).join('') + '<button class="btn btn-primary" style="margin:8px auto 0" onclick="skillsResult()">See my results</button><div id="skRes"></div>', { id:'skills', share:false });
}
function rateSkill(i, n, el){ const s = store.get('skills', {}); s[i] = n; store.set('skills', s); el.parentNode.querySelectorAll('button').forEach(function(b){ b.classList.toggle('on', b === el); }); }
function skillsResult(){
  const s = store.get('skills', {}); if(Object.keys(s).length < SKILLS.length) return toast('Rate all ' + SKILLS.length + ' skills first');
  const strong = SKILLS.filter(function(x, i){ return s[i] >= 4; }).map(function(x){ return x[0]; }), grow = SKILLS.filter(function(x, i){ return s[i] <= 2; }).map(function(x){ return x[0]; });
  const tips = { Communication:'Join a public-speaking club or present in class/work meetings.', Digital:'Take a free Excel or digital-skills course and practise weekly.', English:'Read and listen daily; practise interviews in English.', Arabic:'Learn 5 phrases a week — start with the Arabic phrases tool.', Teamwork:'Volunteer on group projects and community work.', 'Problem solving':'Practise case questions and write STAR stories.', Leadership:'Lead a small project, club or volunteer activity.', Technical:'Earn a certification in your field and build a portfolio.' };
  $('skRes').innerHTML = `<div class="card" style="margin-top:14px"><h4 style="margin-top:0">💪 Your strengths</h4><p>${strong.length ? strong.join(', ') : 'Keep building — everyone starts somewhere.'}</p><h4>🎯 Grow next</h4>${grow.length ? '<ul>' + grow.map(function(g){ return '<li><b>' + g + ':</b> ' + tips[g] + '</li>'; }).join('') + '</ul>' : '<p>Great balance! Aim for certifications that prove your skills.</p>'}</div>`;
}
function careerPanel(){
  showPanel('Career hub', `<div class="hero" style="margin-bottom:12px"><div class="greet">Jobs & career</div><h3 style="margin-bottom:4px">Build your Saudi career 💼</h3><p class="small" style="color:#BFE6CF;position:relative;z-index:1">CV, interviews, salary and your rights — in one place.</p></div>` +
    ['cvBuilder','c-cvguide','c-interview','salary','gratuity','skills','c-roadmap','c-jobs','l-jobs'].map(rowHTML).join('') +
    `<button class="row" onclick="openAI('career')"><div class="ic">🤖</div><div class="tx"><b>Career assistant (AI)</b><small>CV feedback, mock interviews, cover letters</small></div><span class="chev">›</span></button>`, { id:'career' });
}

/* ---------- SAFETY ---------- */
function safetyPanel(){
  showPanel('Safety center', `<div class="note" style="margin-top:0">🚨 In an emergency call <b>911</b>. DigitalSaudi is an information app and cannot contact emergency services for you.</div>
    <div class="grid-3" style="margin-bottom:12px"><a class="card qa" href="tel:911" style="text-decoration:none"><div class="ic">🚨</div><span>911</span></a><a class="card qa" href="tel:997" style="text-decoration:none"><div class="ic">🚑</div><span>997 Ambulance</span></a><a class="card qa" href="tel:999" style="text-decoration:none"><div class="ic">👮</div><span>999 Police</span></a></div>` +
    ['whatToDo','ecard','emergency'].map(rowHTML).join('') + '<h4>Guides</h4>' + SAFETY.map(function(s){ return rowHTML(s.id); }).join(''), { id:'safety' });
}
const WTD = [
  { ic:'🚑', t:'Someone is seriously ill or injured', s:['Call <b>997</b> or <b>911</b> now','Tell them your location — share a landmark, hotel or pin','Don’t move an injured person unless they are in danger','Stay with them until help arrives'], call:'997' },
  { ic:'🥵', t:'Heat illness', s:['Move the person to shade or air-conditioning','Loosen clothing, cool with water and fanning','Give small sips of water if they are conscious','If confused, fainting or very hot and dry — call <b>997</b>'], call:'997' },
  { ic:'👥', t:'Separated from my group', s:['Stay calm and stay where you are if it’s safe','Call or message your group leader','Go to the agreed meeting point or the nearest help desk / security officer','In the Haramain, staff and lost-and-found centres can help'], call:null },
  { ic:'🛂', t:'Lost my passport', s:['Report to the police (999) and get a report','Contact your embassy for an emergency travel document','Residents: report it on Absher'], open:'s-passport', call:'999' },
  { ic:'📱', t:'Lost my phone', s:['Lock or erase it with Find My / Find My Device','Block the SIM with your operator','Change important passwords'], open:'s-phone', call:null },
  { ic:'💳', t:'Lost wallet or bank cards', s:['Block cards in your banking app or call the bank','Report to the police (999)','Check for unknown transactions'], call:'999' },
  { ic:'🚗', t:'Car accident', s:['Check for injuries — call <b>997</b> if anyone is hurt','Move to safety and switch on hazard lights','Report the accident (<b>993</b> traffic police or the official app)','Take photos and exchange details'], call:'993' },
  { ic:'🚫', t:'I think I’ve been scammed', s:['Stop contact and don’t send more money or codes','Call your bank to block cards/transfers','Report to the police (999)','Change passwords; never share your Pi passphrase'], open:'s-scams', call:'999' }
];
function whatToDoPanel(){
  showPanel('What should I do?', `<p class="small" style="margin-bottom:12px">Choose what’s happening for clear next steps.</p>` + WTD.map(function(w, i){ return `<button class="row" onclick="wtdOpen(${i})"><div class="ic">${w.ic}</div><div class="tx"><b>${w.t}</b></div><span class="chev">›</span></button>`; }).join('') + '<div class="note">In any emergency call <b>911</b>.</div>', { id:'whatToDo' });
}
function wtdOpen(i){
  const w = WTD[i];
  showPanel(w.t, stepsHTML(w.s.map(function(x){ return ['', x]; })).replace(/<b><\/b><p>/g, '<p style="font-size:15px;color:var(--text)">') +
    `<div class="p-actions">${w.call ? `<a class="btn btn-primary btn-sm" href="tel:${w.call}">📞 Call ${w.call}</a>` : ''}<a class="btn btn-ghost btn-sm" href="tel:911">🚨 911</a>${w.open ? `<button class="btn btn-ghost btn-sm" onclick="openItem('${w.open}')">Full guide ›</button>` : ''}<button class="btn btn-ghost btn-sm" onclick="openItem('whatToDo')">‹ Back</button></div>`, { id:'whatToDo', noMark:true });
}

/* ---------- NOTIFICATIONS ---------- */
const NOTIF_TYPES = [['prayer','🕌','Prayer times','When each prayer time begins'],['heat','🔥','Heat warnings','Very hot days in your weather city'],['docs','⏰','Document expiry','30, 7 and 1 day before'],['trip','🧳','Trip countdown','Milestones before your trip'],['match','⚽','Favourite team','When your team is playing'],['pi','π','Pi price moves','Moves of 5% or more in 24h'],['islamic','🌙','Islamic dates','Ramadan, Eid, Arafah…'],['events','🎟️','Saved events','The day before an event you saved'],['news','📰','Top news','When a new top story arrives']];
function notifPrefs(){ return Object.assign({ prayer:true, heat:true, docs:true, trip:true, match:true, pi:true, islamic:true, events:true, news:false }, store.get('notif', {})); }
function notify(type, key, ic, title, body, open){
  if(!notifPrefs()[type]) return;
  const keys = store.get('notifKeys', []); if(keys.indexOf(key) >= 0) return;
  keys.push(key); store.set('notifKeys', keys.slice(-300));
  const inbox = store.get('inbox', []); inbox.unshift({ id:Date.now() + Math.random(), ic:ic, t:title, b:body, at:Date.now(), read:false, open:open || '' }); store.set('inbox', inbox.slice(0, 60));
  updateBell(); toast(ic + ' ' + title);
  try{ if('Notification' in window && Notification.permission === 'granted') new Notification(title, { body:body, icon:'/icon.svg', tag:key }); }catch(e){}
}
function updateBell(){ const n = store.get('inbox', []).filter(function(x){ return !x.read; }).length, d = $('bellDot'); if(!d) return; d.style.display = n ? 'flex' : 'none'; d.textContent = n > 9 ? '9+' : n; }
function inboxPanel(){
  const list = store.get('inbox', []);
  showPanel('Notifications', (list.length ? list.map(function(n, i){ return `<button class="inbox-item ${n.read ? '' : 'unread'}" style="width:100%;text-align:left;color:var(--text)" onclick="inboxOpen(${i})"><div style="font-size:24px">${n.ic}</div><div style="flex:1"><b>${esc(n.t)}</b><div class="small">${esc(n.b)}</div><div class="small">${ago(n.at)}</div></div></button>`; }).join('') : '<div class="empty"><div class="big">🔔</div>No notifications yet.</div>') +
    `<div class="p-actions"><button class="btn btn-ghost btn-sm" onclick="openItem('notifSettings')">⚙️ Notification settings</button>${list.length ? '<button class="btn btn-ghost btn-sm" onclick="store.set(\'inbox\',[]);updateBell();openItem(\'inbox\')">Clear all</button>' : ''}</div>`, { id:'inbox', share:false });
  store.set('inbox', list.map(function(n){ n.read = true; return n; })); updateBell();
}
function inboxOpen(i){ const n = store.get('inbox', [])[i]; if(n && n.open){ if(n.open.indexOf('live:') === 0){ closePanel(); openLive(n.open.slice(5)); } else if(n.open.indexOf('trip:') === 0) openTrip(+n.open.slice(5)); else openItem(n.open); } }
function notifSettingsPanel(){
  const p = notifPrefs(), perm = 'Notification' in window ? Notification.permission : 'unsupported';
  showPanel('Notification settings', `<p class="small" style="margin-bottom:6px">Alerts appear in the app and in your 🔔 inbox while DigitalSaudi is open.</p>` +
    NOTIF_TYPES.map(function(t){ return `<div class="setting"><div style="display:flex;gap:12px;align-items:center"><span style="font-size:22px">${t[1]}</span><div><b>${t[2]}</b><div class="small">${t[3]}</div></div></div><button class="toggle ${p[t[0]] ? 'on' : ''}" onclick="setNotif('${t[0]}',this)"></button></div>`; }).join('') +
    `<div class="card" style="margin-top:14px"><b>Phone notifications</b><p class="small" style="margin:4px 0 10px">${perm === 'granted' ? '✓ Allowed — you’ll also get system notifications while the app is open.' : perm === 'denied' ? 'Blocked in your browser settings.' : perm === 'unsupported' ? 'Not supported in this browser — in-app alerts still work.' : 'Allow system notifications as well as in-app alerts.'}</p>${perm === 'default' ? '<button class="btn btn-primary btn-sm" onclick="Notification.requestPermission().then(function(){openItem(\'notifSettings\')})">Allow notifications</button>' : ''}</div>
    <p class="small" style="margin-top:10px">The Pi Browser doesn’t support background push, so alerts are shown when you open the app.</p>`, { id:'notifSettings', share:false });
}
function setNotif(k, el){ const p = notifPrefs(); p[k] = !p[k]; store.set('notif', p); el.classList.toggle('on', p[k]); }
function checkNotifications(){
  try{
    const today = ksaDate();
    // documents
    store.get('reminders', []).forEach(function(r){ const n = daysUntil(r.d); [30, 7, 1, 0].forEach(function(m){ if(n === m) notify('docs', 'doc_' + r.id + '_' + m, '⏰', r.t + (n === 0 ? ' expires today' : ' expires in ' + n + ' day' + (n === 1 ? '' : 's')), 'Renew on Absher or the relevant platform.', 'reminders'); }); });
    // trip
    trips().forEach(function(t){ const n = daysUntil(t.start); if([30, 14, 7, 3, 1, 0].indexOf(n) >= 0) notify('trip', 'trip_' + t.id + '_' + n, '🧳', n === 0 ? t.name + ' starts today!' : t.name + ' in ' + n + ' day' + (n === 1 ? '' : 's'), 'Check your documents and packing list.', 'trip:' + t.id); });
    // islamic dates
    upcomingEvents().forEach(function(e){ if([7, 1, 0].indexOf(e.days) >= 0) notify('islamic', 'isl_' + e.t + '_' + e.date + '_' + e.days, e.ic, e.days === 0 ? e.t + ' is today' : e.t + ' in ' + e.days + ' day' + (e.days === 1 ? '' : 's'), e.h, 'calendar'); });
    // Pi price
    const p = store.get('pi', null); if(p && p.change != null && Math.abs(p.change) >= 5) notify('pi', 'pi_' + today + '_' + (p.change > 0 ? 'up' : 'down'), 'π', 'Pi ' + (p.change > 0 ? 'up' : 'down') + ' ' + Math.abs(p.change).toFixed(1) + '% today', 'Now $' + fmt(p.usd, 4), 'live:markets');
    // heat
    const city = store.get('wxCity', 'Makkah'), w = store.get('wx_' + city, null);
    if(w && w.daily && w.daily.temperature_2m_max[0] >= 40) notify('heat', 'heat_' + city + '_' + today, '🔥', (w.daily.temperature_2m_max[0] >= 45 ? 'Extreme heat' : 'Very hot') + ' in ' + city + ' today', 'High of ' + Math.round(w.daily.temperature_2m_max[0]) + '°C — drink water and avoid midday sun.', 'live:weather');
    // saved events tomorrow
    store.get('savedEvents', []).forEach(function(e){ const n = daysUntil(e.start.slice(0, 10)); if(n === 1 || n === 0) notify('events', 'ev_' + e.id + '_' + n, '🎟️', e.title + (n === 0 ? ' is today' : ' is tomorrow'), (e.venue || e.city || ''), 'live:events'); });
  }catch(e){ log('notif', e); }
}
function notifyPrayer(name, city){ notify('prayer', 'pr_' + ksaDate() + '_' + name + '_' + city, '🕌', 'It’s time for ' + name, 'Prayer time in ' + city, ''); }

/* ---------- EVENTS ---------- */
const EV_CATS = [['all','All'],['religious','🕌 Religious'],['national','🇸🇦 National'],['sports','⚽ Sports'],['culture','🎭 Culture'],['concerts','🎵 Concerts'],['family','👨‍👩‍👧 Family'],['exhibitions','🖼️ Exhibitions'],['conferences','🎤 Conferences'],['seasons','🎆 Seasons']];
const evState = { cat:'all', city:'all', list:[] };
function builtinEvents(){
  return upcomingEvents().map(function(e){ return { id:'b_' + e.t.replace(/\W/g, '') + e.date, title:e.t, city:'Nationwide', category:/Saudi/.test(e.t) ? 'national' : 'religious', start:e.date, end:'', venue:'', description:e.h + (/Saudi/.test(e.t) ? ' · National holiday celebrations across the Kingdom.' : ' · Dates follow the Umm al-Qura calendar and may shift by a day with moon sighting.'), builtin:true, ic:e.ic }; });
}
function loadEvents(){
  const done = function(remote){
    evState.list = remote.concat(builtinEvents()).filter(function(e){ return daysUntil((e.end || e.start).slice(0, 10)) >= 0; }).sort(function(a, b){ return a.start < b.start ? -1 : 1; });
    window._events = {}; evState.list.forEach(function(e){ window._events[e.id] = e; });
    renderEventList(); renderHomeEvents();
  };
  return getJSON('/events').then(function(d){ const ev = (d && d.events) || []; store.set('events_cache', ev); done(ev); }).catch(function(){ done(store.get('events_cache', [])); });
}
function renderEventFilters(){
  $('evCats').innerHTML = EV_CATS.map(function(c){ return `<button class="chip ${c[0] === evState.cat ? 'on' : ''}" onclick="evState.cat='${c[0]}';renderEventFilters();renderEventList()">${c[1]}</button>`; }).join('');
  $('evCities').innerHTML = ['all'].concat(MAP_CITIES.slice(0, 10)).map(function(c){ return `<button class="chip ${c === evState.city ? 'on' : ''}" onclick="evState.city='${c}';renderEventFilters();renderEventList()">${c === 'all' ? '📍 All cities' : c}</button>`; }).join('');
}
function eventMatches(e){ return (evState.cat === 'all' || e.category === evState.cat) && (evState.city === 'all' || e.city === evState.city || e.city === 'Nationwide'); }
function evDate(e){ const s = new Date(e.start.slice(0, 10) + 'T12:00:00'); const o = { day:'numeric', month:'short' }; return s.toLocaleDateString('en-GB', o) + (e.end && e.end.slice(0, 10) !== e.start.slice(0, 10) ? ' – ' + new Date(e.end.slice(0, 10) + 'T12:00:00').toLocaleDateString('en-GB', o) : ''); }
function evIcon(e){ return e.ic || (EV_CATS.find(function(c){ return c[0] === e.category; }) || [0, '🎟️'])[1].split(' ')[0]; }
function eventRowHTML(e){ const n = daysUntil(e.start.slice(0, 10)); return `<button class="row" onclick="openEvent('${e.id}')"><div class="ic">${evIcon(e)}</div><div class="tx"><b>${esc(e.title)}${isSavedEvent(e.id) ? ' ★' : ''}</b><small>${evDate(e)} · ${esc(e.city)}${e.venue ? ' · ' + esc(e.venue) : ''}</small></div><span class="badge">${n <= 0 ? 'Now' : n + 'd'}</span></button>`; }
function renderEventList(){
  if(!$('evList')) return;
  const list = evState.list.filter(eventMatches); let month = '';
  $('evList').innerHTML = list.length ? list.map(function(e){ const m = new Date(e.start.slice(0, 10) + 'T12:00:00').toLocaleDateString('en-GB', { month:'long', year:'numeric' }); const h = m !== month ? `<h2 class="sec">${m}</h2>` : ''; month = m; return h + eventRowHTML(e); }).join('') + '<p class="small" style="text-align:center;margin-top:8px">Know an event that’s missing? <button style="color:var(--gold);font-weight:700;font-size:12.5px" onclick="openFeedback(\'Event suggestion\')">Suggest it</button></p>'
    : '<div class="empty"><div class="big">🎟️</div>No events match these filters yet.</div>';
}
function renderHomeEvents(){ if(!$('homeEvents')) return; const l = evState.list.slice(0, 3); $('homeEvents').innerHTML = l.length ? l.map(eventRowHTML).join('') : '<p class="small">No upcoming events.</p>'; }
function isSavedEvent(id){ return store.get('savedEvents', []).some(function(e){ return e.id === id; }); }
function openEvent(id){
  const e = window._events[id]; if(!e) return;
  showPanel(e.title, `<div class="card" style="text-align:center">${e.image ? `<img src="${esc(e.image)}" alt="" style="width:100%;border-radius:12px;margin-bottom:10px;aspect-ratio:16/9;object-fit:cover" onerror="this.remove()">` : `<div style="font-size:46px">${evIcon(e)}</div>`}<h3 style="margin:6px 0 2px">${esc(e.title)}</h3><div class="small">${evDate(e)} · ${esc(e.city)}</div></div>
    <div class="card" style="margin-top:12px"><div class="rate"><span>📅 When</span><b>${new Date(e.start.slice(0, 10) + 'T12:00:00').toLocaleDateString('en-GB', { weekday:'long', day:'numeric', month:'long', year:'numeric' })}${e.start.length > 10 ? ' · ' + e.start.slice(11, 16) : ''}</b></div>${e.venue ? `<div class="rate"><span>📍 Venue</span><b>${esc(e.venue)}</b></div>` : ''}<div class="rate" style="border:0"><span>🏷️ Type</span><b>${esc((EV_CATS.find(function(c){ return c[0] === e.category; }) || [0, e.category])[1])}</b></div></div>
    ${e.description ? `<p style="margin:14px 0">${esc(e.description)}</p>` : ''}
    <div class="p-actions"><button class="btn ${isSavedEvent(e.id) ? 'btn-gold' : 'btn-primary'} btn-sm" id="evSave" onclick="toggleSaveEvent('${e.id}')">${isSavedEvent(e.id) ? '★ Saved — reminder on' : '☆ Save & remind me'}</button>${e.url ? `<a class="btn btn-ghost btn-sm" href="${esc(e.url)}">🎫 Official info</a>` : ''}</div>
    ${e.builtin ? '' : '<p class="small" style="margin-top:10px">Details can change — check the organiser’s official channels.</p>'}`, { id:'event' });
  current.share = function(){ shareText(e.title, e.title + ' — ' + evDate(e) + ', ' + e.city + ' · via DigitalSaudi', location.origin); }; $('pShare').classList.add('on');
}
function toggleSaveEvent(id){
  const e = window._events[id], l = store.get('savedEvents', []), i = l.findIndex(function(x){ return x.id === id; });
  if(i >= 0) l.splice(i, 1); else { l.push({ id:e.id, title:e.title, start:e.start, city:e.city, venue:e.venue }); award('eventSaved'); }
  store.set('savedEvents', l); const b = $('evSave'); b.className = 'btn ' + (i >= 0 ? 'btn-primary' : 'btn-gold') + ' btn-sm'; b.textContent = i >= 0 ? '☆ Save & remind me' : '★ Saved — reminder on';
  toast(i >= 0 ? 'Removed' : '🎟️ Saved — we’ll remind you the day before'); renderEventList();
}

/* ---------- AI ASSISTANT ---------- */
const AI_MODES = [
  ['general','🇸🇦','Saudi AI',['What should I know before my first trip to Saudi Arabia?','How do I renew my Iqama?','What is Vision 2030?']],
  ['travel','🧳','Travel planner',['I have 5 days in Riyadh and SAR 2,000. Plan my trip.','Plan 3 days in AlUla for a family','Best way to travel from Jeddah to Madinah?']],
  ['pilgrim','🕌','Pilgrimage',['I’m travelling to Saudi Arabia for Umrah. Create my checklist.','Explain the steps of Umrah simply','What should women know for Umrah?']],
  ['city','🏙️','City guide',['What are the best things to do in Jeddah?','Which areas of Riyadh are good for families?','What is special about Abha?']],
  ['food','🍽️','Food finder',['What traditional Saudi dishes should I try?','Where can I find good mandi in Riyadh?','Healthy food options near the Haram?']],
  ['career','💼','Career',['Review my CV summary and improve it','Run a mock interview for an engineering job','How do I find graduate jobs in Saudi Arabia?']],
  ['finance','💰','Finance',['How much should I budget for a 10-day Umrah?','Explain end-of-service gratuity','How do I send money home cheaply?']],
  ['knowledge','📚','Saudi knowledge',['Tell me the history of Diriyah','What is the Saudi Green Initiative?','Explain Saudi coffee culture']],
  ['translate','🔤','Translator',['Translate to Arabic: Where is the nearest pharmacy?','How do I say “thank you very much” in Saudi dialect?','Translate to English: الحساب لو سمحت']],
  ['safety','🛡️','Safety',['I lost my passport in Makkah — what do I do?','How do I avoid heat stroke during Hajj?','Is this job offer a scam? It asks me to pay for a visa.']]
];
let aiMode = 'general', aiBusy = false;
function aiChat(){ return store.get('aiChat_' + aiMode, []); }
function openAI(mode, prefill){
  if(mode) aiMode = mode;
  const m = AI_MODES.find(function(x){ return x[0] === aiMode; }) || AI_MODES[0];
  const chat = aiChat();
  showPanel(m[0] === 'general' ? 'Saudi AI' : 'Saudi AI · ' + m[2], `<div class="chips" id="aiModes">${AI_MODES.map(function(x){ return `<button class="chip ${x[0] === aiMode ? 'on' : ''}" onclick="openAI('${x[0]}')">${x[1]} ${x[2]}</button>`; }).join('')}</div>
    <div class="chat" id="aiLog">${chat.length ? chat.map(aiMsgHTML).join('') : `<div class="empty" style="padding:14px 6px"><div class="big">${m[1]}</div><b>${m[2]}</b><p class="small" style="margin:6px 0 12px">Ask anything. Try:</p>${m[3].map(function(q){ return `<button class="quiz-opt" onclick="aiSend(this.textContent)">${esc(q)}</button>`; }).join('')}</div>`}</div>
    <div class="small" id="aiQuota" style="text-align:center;margin:4px 0">${isPremium() ? '⭐ Premium — unlimited questions' : 'Free: ' + AI_FREE + ' questions a day · unlimited with Premium'}</div>
    <div class="chat-in"><textarea id="aiIn" rows="1" placeholder="Ask ${esc(m[2])}…" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();aiSend()}"></textarea><button onclick="aiSend()" aria-label="Send">➤</button></div>
    <p class="small" style="text-align:center;margin-top:8px">AI can make mistakes — check important details on official sources. ${chat.length ? '<button style="color:var(--gold);font-weight:700;font-size:12px" onclick="store.set(\'aiChat_\'+aiMode,[]);openAI()">New chat</button>' : ''}</p>`, { id:'ai', share:false });
  const log = $('aiLog'); if(log && chat.length) setTimeout(function(){ $('pBody').scrollTop = $('pBody').scrollHeight; }, 50);
  if(prefill) setTimeout(function(){ aiSend(prefill); }, 150);
}
let AI_FREE = 10;
function mdLite(s){
  let h = esc(s);
  h = h.replace(/^### (.*)$/gm, '<h3>$1</h3>').replace(/^## (.*)$/gm, '<h3>$1</h3>').replace(/^# (.*)$/gm, '<h3>$1</h3>');
  h = h.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<i>$2</i>');
  h = h.replace(/(?:^|\n)((?:[-•] .*(?:\n|$))+)/g, function(m, block){ return '\n<ul>' + block.trim().split('\n').map(function(l){ return '<li>' + l.replace(/^[-•] /, '') + '</li>'; }).join('') + '</ul>'; });
  h = h.replace(/(?:^|\n)((?:\d+[.)] .*(?:\n|$))+)/g, function(m, block){ return '\n<ol>' + block.trim().split('\n').map(function(l){ return '<li>' + l.replace(/^\d+[.)] /, '') + '</li>'; }).join('') + '</ol>'; });
  return h.split(/\n{2,}/).map(function(p){ return /^\s*<(ul|ol|h3)/.test(p) ? p : '<p>' + p.replace(/\n/g, '<br>') + '</p>'; }).join('');
}
function aiMsgHTML(m){ return `<div class="msg ${m.role === 'user' ? 'u' : 'a'}">${m.role === 'user' ? esc(m.content).replace(/\n/g, '<br>') : mdLite(m.content)}</div>`; }
function aiSend(text){
  if(aiBusy) return;
  const inp = $('aiIn'); text = (text || (inp && inp.value) || '').trim(); if(!text) return;
  if(inp) inp.value = '';
  const chat = aiChat(); chat.push({ role:'user', content:text }); store.set('aiChat_' + aiMode, chat.slice(-20));
  const log = $('aiLog'); if(chat.length === 1) log.innerHTML = '';
  log.insertAdjacentHTML('beforeend', aiMsgHTML({ role:'user', content:text }) + '<div class="msg a" id="aiTyping"><span class="typing"><span></span><span></span><span></span></span></div>');
  $('pBody').scrollTop = $('pBody').scrollHeight; aiBusy = true;   // v6.3: the AI badge is earned on a real answer, not on a failed request
  fetch('/ai', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ mode:aiMode, messages:chat.slice(-10), accessToken:piUser ? piUser.accessToken : null, guest:store.get('guestId', null) || (function(){ const g = 'g' + Math.random().toString(36).slice(2) + Date.now().toString(36); store.set('guestId', g); return g; })() }) })
    .then(function(r){ return r.json(); })
    .then(function(d){
      const t = $('aiTyping'); if(t) t.remove();
      if(!$('aiLog')){ if(d && d.ok && d.reply){ const c = aiChat(); c.push({ role:'assistant', content:d.reply }); store.set('aiChat_' + aiMode, c.slice(-20)); } return; }
      if(d && d.ok && d.reply){
        award('aiChat');
        const c = aiChat(); c.push({ role:'assistant', content:d.reply }); store.set('aiChat_' + aiMode, c.slice(-20));
        $('aiLog').insertAdjacentHTML('beforeend', aiMsgHTML({ role:'assistant', content:d.reply }));
        if(d.free) AI_FREE = d.free;
        if($('aiQuota') && d.remaining != null && !d.premium) $('aiQuota').textContent = d.remaining + ' free question' + (d.remaining === 1 ? '' : 's') + ' left today · unlimited with Premium';
      } else if(d && d.error === 'limit'){
        $('aiLog').insertAdjacentHTML('beforeend', `<div class="msg a">You've used your ${AI_FREE} free questions today. They reset tomorrow — or go ⭐ Premium for unlimited questions.<br><br><button class="btn btn-gold btn-sm" onclick="openItem('premium')">See Premium</button></div>`);
        const c = aiChat(); c.pop(); store.set('aiChat_' + aiMode, c);
      } else {
        $('aiLog').insertAdjacentHTML('beforeend', `<div class="msg a">Sorry — the assistant is unavailable right now. Please try again shortly.</div>`);
        const c = aiChat(); c.pop(); store.set('aiChat_' + aiMode, c);
      }
      $('pBody').scrollTop = $('pBody').scrollHeight;
    })
    .catch(function(){ const t = $('aiTyping'); if(t) t.outerHTML = '<div class="msg a">You seem to be offline. Check your connection and try again.</div>'; const c = aiChat(); c.pop(); store.set('aiChat_' + aiMode, c); })
    .finally(function(){ aiBusy = false; });
}

/* ---------- KNOWLEDGE QUIZ ---------- */
const QUIZ = [
  ['What is the capital of Saudi Arabia?', ['Jeddah','Riyadh','Makkah','Dammam'], 1],
  ['When is Saudi National Day?', ['22 February','1 January','23 September','2 December'], 2],
  ['Founding Day marks the first Saudi state, founded in…', ['1727','1902','1932','1818'], 0],
  ['What is the currency?', ['Dirham','Dinar','Saudi Riyal','Pound'], 2],
  ['The largest continuous sand desert on Earth is…', ['Nafud','Sahara','Rub’ al Khali','Dahna'], 2],
  ['Saudi Arabia’s first UNESCO World Heritage Site is…', ['Al-Balad','Hegra (AlUla)','Diriyah','Hima'], 1],
  ['Which sea lies on Saudi Arabia’s west coast?', ['Arabian Gulf','Red Sea','Arabian Sea','Mediterranean'], 1],
  ['What is the weekend in Saudi Arabia?', ['Thursday–Friday','Saturday–Sunday','Friday–Saturday','Friday only'], 2],
  ['Arabic coffee with cardamom is called…', ['Qahwa','Karak','Sahlab','Laban'], 0],
  ['The Kingdom was unified and named in…', ['1932','1945','1916','1971'], 0]
];
let quizI = 0, quizScore = 0;
function quizPanel(){ quizI = 0; quizScore = 0; quizShow(); }
function quizShow(){
  if(quizI >= QUIZ.length){
    if(quizScore >= 8) award('scholar');
    showPanel('Saudi quiz', `<div class="lock-wrap"><div class="big">${quizScore >= 8 ? '🏆' : quizScore >= 5 ? '👏' : '📚'}</div><h3>You scored ${quizScore} / ${QUIZ.length}</h3><p class="small" style="margin:6px 0 18px">${quizScore >= 8 ? 'Excellent — Saudi scholar badge unlocked!' : 'Read the knowledge guides and try again.'}</p><button class="btn btn-primary" style="margin:0 auto" onclick="quizPanel()">Play again</button></div>`, { id:'quizRun', share:false });
    return;
  }
  const q = QUIZ[quizI];
  showPanel('Saudi quiz', `<div class="small">Question ${quizI + 1} of ${QUIZ.length} · Score ${quizScore}</div><div class="progress"><i style="width:${quizI / QUIZ.length * 100}%"></i></div><h3 style="margin:10px 0 14px">${q[0]}</h3>` + q[1].map(function(o, i){ return `<button class="quiz-opt" onclick="quizAns(${i},this)">${o}</button>`; }).join(''), { id:'quizRun', share:false });
}
function quizAns(i, el){
  const q = QUIZ[quizI]; document.querySelectorAll('.quiz-opt').forEach(function(b, k){ b.disabled = true; if(k === q[2]) b.classList.add('ok'); });
  if(i === q[2]) quizScore++; else el.classList.add('bad');
  setTimeout(function(){ quizI++; quizShow(); }, 900);
}

/* ---------- DUAS with favourites (replaces v2 panel) ---------- */
PANELS.duas = function(){
  const fav = store.get('duaFav', []), only = window._duaFavOnly;
  const groups = DUAS.map(function(d){ return d.g; }).filter(function(g, i, a){ return a.indexOf(g) === i; });
  showPanel('Duas', `<div class="chips"><button class="chip ${!only ? 'on' : ''}" onclick="window._duaFavOnly=false;PANELS.duas()">All</button><button class="chip ${only ? 'on' : ''}" onclick="window._duaFavOnly=true;PANELS.duas()">★ My duas (${fav.length})</button></div>` + groups.map(function(g){
    const items = DUAS.map(function(d, i){ return [d, i]; }).filter(function(x){ return x[0].g === g && (!only || fav.indexOf(x[1]) >= 0); });
    return items.length ? `<h4>${g}</h4>` + items.map(function(x){ const d = x[0], i = x[1]; return `<div class="ayah"><div class="an"><b>${esc(d.t)}</b><div style="display:flex;gap:6px"><button class="speak" onclick="speak(DUAS[${i}].ar)" aria-label="Play">🔊</button><button class="speak" onclick="favDua(${i},this)" aria-label="Save">${fav.indexOf(i) >= 0 ? '★' : '☆'}</button></div></div><div class="ar">${d.ar}</div><div class="small" style="font-style:italic;margin:4px 0">${esc(d.tr)}</div><div class="en">${esc(d.en)}</div></div>`; }).join('') : '';
  }).join('') + (only && !fav.length ? '<div class="empty">Tap ☆ on any dua to save it here.</div>' : '') + reviewedHTML('Duas'), { id:'duas' });
};
function favDua(i, el){ const f = store.get('duaFav', []), k = f.indexOf(i); if(k >= 0) f.splice(k, 1); else { f.push(i); award('duaFav'); } store.set('duaFav', f); el.textContent = k >= 0 ? '☆' : '★'; }

/* ---------- saved places ---------- */
function savedPlacesPanel(){
  const l = store.get('savedPlaces', []); window._places = window._places || {}; l.forEach(function(p){ window._places[p.id] = p; });
  showPanel('Saved places', l.length ? l.map(function(p){ return `<button class="row" onclick="store.set('mapCity','${p.city || 'Makkah'}');openPlace('${p.id}')"><div class="ic">${pcat(p.cat).ic}</div><div class="tx"><b>${esc(p.name)}</b><small>${esc(placeSub(p))} · ${esc(p.city || '')}</small></div><span class="chev">›</span></button>`; }).join('') : '<div class="empty"><div class="big">📍</div>No saved places yet.<br>Tap ☆ Save on any place in Explore.</div>', { id:'savedPlaces' });
}
function tripsPanel(){
  const l = trips().slice().sort(function(a, b){ return a.start < b.start ? -1 : 1; });
  showPanel('My Saudi Trips', `<button class="btn btn-primary" style="margin:0 auto 14px" onclick="tripForm()">＋ Plan a new trip</button>` + (l.length ? l.map(function(t){ const s = tripStatus(t); return `<button class="row" onclick="openTrip(${t.id})"><div class="ic">${PURPOSES[t.purpose][0]}</div><div class="tx"><b>${esc(t.name)}</b><small>${esc(t.city)} · ${new Date(t.start + 'T12:00:00').toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</small></div><span class="status ${s.k === 'done' ? 's-bad' : s.k === 'now' ? 's-ok' : 's-pend'}">${s.txt}</span></button>`; }).join('') : '<div class="empty"><div class="big">🧳</div>Plan your first trip — dates, documents, packing, budget and places in one dashboard.</div>'), { id:'trips' });
}
function transportPanel(){
  const s = store.get('transport', { from:'Jeddah', to:'Madinah', l:10, p:2.33, pax:1 });
  const cities = MAP_CITIES.concat(['KAEC','AlJouf']);
  const sel = function(id, v){ return `<select id="${id}" onchange="calcTransport()">${cities.map(function(c){ return `<option ${c === v ? 'selected' : ''}>${c}</option>`; }).join('')}</select>`; };
  showPanel('Transport planner', `<div class="two"><div class="field"><label>From</label>${sel('trFrom', s.from)}</div><div class="field"><label>To</label>${sel('trTo', s.to)}</div></div>
    <div class="grid-3"><div class="field"><label>Car L/100 km</label><input id="trL" type="number" value="${s.l}" oninput="calcTransport()"></div><div class="field"><label>Fuel SAR/L</label><input id="trP" type="number" step="0.01" value="${s.p}" oninput="calcTransport()"></div><div class="field"><label>People</label><input id="trPax" type="number" value="${s.pax}" oninput="calcTransport()"></div></div>
    <div id="trOut"></div>${rowHTML('t-guide')}${rowHTML('train')}`, { id:'transport' });
  calcTransport();
}

/* ---------- registry: META + PANELS for everything new ---------- */
Object.assign(META, {
  nearMe:{ t:'Near me', ic:'📍', s:'Places around you', short:'Near me' },
  hotels:{ t:'Hotels & stays', ic:'🏨', s:'Distance to Haram, saved hotels', short:'Hotels' },
  food:{ t:'Restaurants & cafés', ic:'🍽️', s:'By city and cuisine', short:'Food' },
  hotelCalc:{ t:'Hotel cost calculator', ic:'🧮', s:'Nights, rooms, VAT', short:'Hotel cost' },
  transport:{ t:'Transport planner', ic:'🚆', s:'Car, train, flight & bus between cities', short:'Transport' },
  trips:{ t:'My Saudi Trips', ic:'🧳', s:'Dashboard, countdown & checklists', short:'My trips' },
  directory:{ t:'Business directory', ic:'🏪', s:'Local businesses, reviewed', short:'Businesses' },
  piHub:{ t:'Pi Hub', ic:'π', s:'Price, merchants, QR & safety', short:'Pi Hub' },
  addBusiness:{ t:'Add your business', ic:'➕', s:'Free listing · accepts Pi option', short:'Add business' },
  merchantQR:{ t:'Merchant QR', ic:'▦', s:'Show your Pi username as QR', short:'Pi QR' },
  career:{ t:'Career hub', ic:'💼', s:'CV builder, interviews, salary, gratuity', short:'Career' },
  cvBuilder:{ t:'CV builder', ic:'📄', s:'Create & download a PDF CV', short:'CV' },
  salary:{ t:'Salary calculator', ic:'💵', s:'Net pay, GOSI, in USD/EUR', short:'Salary' },
  gratuity:{ t:'End-of-service gratuity', ic:'🏁', s:'Saudi Labor Law estimate', short:'Gratuity' },
  skills:{ t:'Skills assessment', ic:'🎯', s:'Find strengths & gaps', short:'Skills' },
  safety:{ t:'Safety center', ic:'🛡️', s:'Guides, checklists & emergency help', short:'Safety' },
  whatToDo:{ t:'What should I do?', ic:'🆘', s:'Step-by-step emergency guide', short:'Help now' },
  inbox:{ t:'Notifications', ic:'🔔', s:'' },
  notifSettings:{ t:'Notification settings', ic:'🔔', s:'Choose your alerts' },
  savedPlaces:{ t:'Saved places', ic:'📍', s:'' },
  knowQuiz:{ t:'Saudi quiz', ic:'🏆', s:'10 questions · earn a badge', short:'Quiz' },
  ai:{ t:'Saudi AI assistant', ic:'🤖', s:'Travel, pilgrimage, career, translate…', short:'Saudi AI' }
});
Object.assign(META.converter, { short:'Currency' }); Object.assign(META.vat, { short:'VAT' }); Object.assign(META.split, { short:'Split bill' }); Object.assign(META.units, { short:'Units' });
Object.assign(META.phrases, { short:'Phrases' }); Object.assign(META.worldclock, { short:'Time zones' }); Object.assign(META.train, { short:'Trains' }); Object.assign(META.travelPlan, { short:'7-day plan' });
Object.assign(META.arrival, { short:'Arrival' }); Object.assign(META.budget, { short:'Trip budget' }); Object.assign(META.zakat, { short:'Zakat' }); Object.assign(META.quran, { short:'Quran' });
Object.assign(META.duas, { short:'Duas' }); Object.assign(META.tasbih, { short:'Tasbih' }); Object.assign(META.qibla, { short:'Qibla' }); Object.assign(META.calendar, { short:'Calendar' });
Object.assign(META.hajj, { short:'Hajj' }); Object.assign(META.umrah, { short:'Umrah' }); Object.assign(META.madinah, { short:'Madinah' }); Object.assign(META.umrahPack, { short:'Packing' });
Object.assign(META.reminders, { short:'Reminders' }); Object.assign(META.docs, { short:'Documents' }); Object.assign(META.ecard, { short:'SOS card' });
Object.assign(LIVE_ITEMS, { events:{ t:'Events', ic:'🎟️' } });
Object.assign(PANELS, {
  nearMe:function(){ openMap('all', true); }, hotels:function(){ finderPanel('hotels'); }, food:function(){ finderPanel('food'); }, hotelCalc:hotelCalcPanel,
  transport:transportPanel, trips:tripsPanel, directory:function(){ openDirectory(false); }, piHub:piHubPanel, addBusiness:addBusinessPanel, merchantQR:merchantQRPanel,
  career:careerPanel, cvBuilder:cvBuilderPanel, salary:salaryPanel, gratuity:gratuityPanel, skills:skillsPanel, safety:safetyPanel, whatToDo:whatToDoPanel,
  inbox:inboxPanel, notifSettings:notifSettingsPanel, savedPlaces:savedPlacesPanel, knowQuiz:quizPanel, ai:function(){ openAI(); }
});
PERSONA_QA.pilgrim = ['umrah','duas','quran','qibla','trips','hadith40'];
PERSONA_QA.visitor = ['piWallet','trips','quran','hadith40','converter','phrases'];
PERSONA_QA.worker = ['career','visas','reminders','salary','gratuity','eservices'];
PERSONA_QA.resident = ['piWallet','directory','energyCalc','reminders','events','safety'];
PERSONA_FOR.pilgrim = ['hajj','madinah','umrahPack','train','whatToDo'];
PERSONA_FOR.visitor = ['x-alula','x-desert','k-food','transport','s-tourist'];
PERSONA_FOR.worker = ['cvBuilder','c-interview','v-work','g-qiwa','l-money'];
PERSONA_FOR.resident = ['g-absher','piHub','greenHub','l-housing','x-family'];

/* ---------- BADGES (expanded) ---------- */
BADGES.length = 0;
[['first','🌱','First step'],['streak3','🔥','3-day streak'],['streak7','🏅','7-day streak'],['streak30','🏆','30-day streak'],['explorer','📖','Guide reader'],['cities','🏙️','City explorer'],['mapper','📍','Near-me navigator'],['trip','🧳','Trip planner'],['hotelier','🏨','Stay sorted'],['foodie','🍽️','Foodie'],['reader','📰','News reader'],['eventSaved','🎟️','Event goer'],['umrah','🕋','Umrah ready'],['quran','📖','Quran reader'],['duaFav','🤲','First dua saved'],['dhikr','📿','100 dhikr'],['scholar','📚','Saudi scholar'],['safety','🛡️','Safety smart'],['cv','📄','CV ready'],['business','🏪','Local supporter'],['piMerchant','π','Pi shopper'],['aiChat','🤖','AI explorer'],['green','🌱','Green champion'],['supporter','💚','Supporter'],['premium','⭐','Premium'],['pioneer','🔑','Pi Pioneer']]
  .forEach(function(b){ BADGES.push({ id:b[0], ic:b[1], t:b[2] }); });
const _trackView = trackView;
trackView = function(id){
  _trackView(id);
  const v = store.get('viewed', []);
  if(v.filter(function(x){ return x.indexOf('c-') === 0 && CITIES.some(function(c){ return c.id === x; }); }).length >= 5) award('cities');
  if(v.filter(function(x){ return x.indexOf('s-') === 0; }).length >= 3) award('safety');
};

/* ---------- boot hooks ---------- */
function v3Boot(){
  renderEventFilters(); loadEvents(); updateBell(); renderHomeTrip();
  setTimeout(checkNotifications, 4000); setInterval(checkNotifications, 60000);
}

/* =====================================================================
   v3.1 — Arabic dictionary & phrasebook (with real audio), Pi Wallet
   ===================================================================== */
const PB = [
  // [English, Arabic, transliteration, category]
  ['Hello (peace be upon you)','السلام عليكم','as-salāmu ʿalaykum','Greetings'],
  ['Reply to the greeting','وعليكم السلام','wa ʿalaykum as-salām','Greetings'],
  ['Good morning','صباح الخير','ṣabāḥ al-khayr','Greetings'],
  ['Good morning (reply)','صباح النور','ṣabāḥ an-nūr','Greetings'],
  ['Good evening','مساء الخير','masāʾ al-khayr','Greetings'],
  ['Good evening (reply)','مساء النور','masāʾ an-nūr','Greetings'],
  ['Welcome','أهلاً وسهلاً','ahlan wa sahlan','Greetings'],
  ['How are you? (Saudi)','شلونك؟','shlōnak?','Greetings'],
  ['How are you? (formal)','كيف حالك؟','kayf ḥālak?','Greetings'],
  ['I’m fine, praise God','بخير، الحمد لله','bikhayr, al-ḥamdu lillāh','Greetings'],
  ['What is your name?','ما اسمك؟','mā ismak?','Greetings'],
  ['My name is…','اسمي…','ismī…','Greetings'],
  ['Nice to meet you','تشرفنا','tasharrafnā','Greetings'],
  ['Goodbye','مع السلامة','maʿa as-salāma','Greetings'],
  ['See you later','أشوفك بعدين','ashūfak baʿdēn','Greetings'],
  ['Thank you','شكراً','shukran','Basics'],
  ['Thank you very much','شكراً جزيلاً','shukran jazīlan','Basics'],
  ['You’re welcome','العفو','al-ʿafw','Basics'],
  ['Please','من فضلك','min faḍlak','Basics'],
  ['Excuse me','لو سمحت','law samaḥt','Basics'],
  ['Sorry','آسف','āsif','Basics'],
  ['Yes','نعم','naʿam','Basics'],
  ['Yes (Saudi)','إيه','ēh','Basics'],
  ['No','لا','lā','Basics'],
  ['OK','طيب','ṭayyib','Basics'],
  ['God willing','إن شاء الله','in shāʾ allāh','Basics'],
  ['Praise God','الحمد لله','al-ḥamdu lillāh','Basics'],
  ['May God reward you','جزاك الله خيراً','jazāk allāhu khayran','Basics'],
  ['I don’t understand','ما فهمت','mā fihimt','Basics'],
  ['Do you speak English?','تتكلم إنجليزي؟','titkallam ingilīzi?','Basics'],
  ['I speak a little Arabic','أتكلم عربي شوي','atkallam ʿarabi shway','Basics'],
  ['Can you repeat, please?','ممكن تعيد لو سمحت؟','mumkin tʿīd law samaḥt?','Basics'],
  ['Speak slowly, please','تكلم شوي شوي لو سمحت','takallam shway shway law samaḥt','Basics'],
  ['What is this?','إيش هذا؟','ēsh hādha?','Basics'],
  ['Where is…?','وين…؟','wēn…?','Directions'],
  ['Where is the toilet?','وين الحمام؟','wēn al-ḥammām?','Directions'],
  ['Where is the mosque?','وين المسجد؟','wēn al-masjid?','Directions'],
  ['Right','يمين','yamīn','Directions'],
  ['Left','يسار','yasār','Directions'],
  ['Straight ahead','على طول','ʿala ṭūl','Directions'],
  ['Near','قريب','qarīb','Directions'],
  ['Far','بعيد','baʿīd','Directions'],
  ['Stop here, please','وقف هنا لو سمحت','waqqif hina law samaḥt','Transport'],
  ['Take me to…','وديني…','waddīni…','Transport'],
  ['Airport','المطار','al-maṭār','Transport'],
  ['Train station','محطة القطار','maḥaṭṭat al-qiṭār','Transport'],
  ['Bus','الباص','al-bāṣ','Transport'],
  ['Taxi','تاكسي','tāksi','Transport'],
  ['Ticket','تذكرة','tadhkira','Transport'],
  ['How long does it take?','كم ياخذ وقت؟','kam yākhudh waqt?','Transport'],
  ['I have a reservation','عندي حجز','ʿindi ḥajz','Hotel'],
  ['Room','غرفة','ghurfa','Hotel'],
  ['Key','مفتاح','miftāḥ','Hotel'],
  ['The AC is not working','المكيف ما يشتغل','al-mukayyif mā yishtaghil','Hotel'],
  ['What is the Wi-Fi password?','إيش كلمة سر الواي فاي؟','ēsh kilmat sirr al-wāy fāy?','Hotel'],
  ['How much?','بكم؟','bikam?','Shopping'],
  ['How much is this?','بكم هذا؟','bikam hādha?','Shopping'],
  ['Too expensive','غالي','ghāli','Shopping'],
  ['Is there a discount?','فيه خصم؟','fīh khaṣm?','Shopping'],
  ['I want…','أبغى…','abgha…','Shopping'],
  ['Do you have…?','عندك…؟','ʿindak…?','Shopping'],
  ['Cash','كاش','kāsh','Shopping'],
  ['Card','بطاقة','biṭāqa','Shopping'],
  ['Receipt','فاتورة','fātūra','Shopping'],
  ['Water','ماء','māʾ','Food'],
  ['The menu, please','المنيو لو سمحت','al-menyu law samaḥt','Food'],
  ['The bill, please','الحساب لو سمحت','al-ḥisāb law samaḥt','Food'],
  ['Delicious','لذيذ','ladhīdh','Food'],
  ['Without sugar','بدون سكر','bidūn sukkar','Food'],
  ['Not spicy','بدون حار','bidūn ḥārr','Food'],
  ['Coffee','قهوة','qahwa','Food'],
  ['Tea','شاي','shāy','Food'],
  ['Dates','تمر','tamr','Food'],
  ['Bread','خبز','khubz','Food'],
  ['Chicken','دجاج','dajāj','Food'],
  ['Meat','لحم','laḥm','Food'],
  ['Rice','رز','ruzz','Food'],
  ['Fish','سمك','samak','Food'],
  ['I am vegetarian','أنا نباتي','ana nabāti','Food'],
  ['I have an allergy','عندي حساسية','ʿindi ḥassāsiyya','Food'],
  ['Help me!','ساعدني','sāʿidni','Emergency'],
  ['Call an ambulance','اتصل بالإسعاف','ittaṣil bil-isʿāf','Emergency'],
  ['Police','شرطة','shurṭa','Emergency'],
  ['Hospital','مستشفى','mustashfa','Emergency'],
  ['Pharmacy','صيدلية','ṣaydaliyya','Emergency'],
  ['Doctor','دكتور','duktūr','Emergency'],
  ['I am sick','أنا مريض','ana marīḍ','Emergency'],
  ['It hurts here','يوجعني هنا','yūjiʿni hina','Emergency'],
  ['Medicine','دواء','dawāʾ','Emergency'],
  ['I am lost','أنا ضايع','ana ḍāyiʿ','Emergency'],
  ['I lost my passport','ضيعت جوازي','ḍayyaʿt jawāzi','Emergency'],
  ['Fire','حريق','ḥarīq','Emergency'],
  ['Today','اليوم','al-yōm','Time & numbers'],
  ['Tomorrow','بكرة','bukra','Time & numbers'],
  ['Yesterday','أمس','ams','Time & numbers'],
  ['Now (Saudi)','الحين','al-ḥīn','Time & numbers'],
  ['Later','بعدين','baʿdēn','Time & numbers'],
  ['One','واحد','wāḥid','Time & numbers'],
  ['Two','اثنين','ithnēn','Time & numbers'],
  ['Three','ثلاثة','thalātha','Time & numbers'],
  ['Four','أربعة','arbaʿa','Time & numbers'],
  ['Five','خمسة','khamsa','Time & numbers'],
  ['Six','ستة','sitta','Time & numbers'],
  ['Seven','سبعة','sabʿa','Time & numbers'],
  ['Eight','ثمانية','thamānya','Time & numbers'],
  ['Nine','تسعة','tisʿa','Time & numbers'],
  ['Ten','عشرة','ʿashara','Time & numbers'],
  ['One hundred','مية','mya','Time & numbers'],
  ['One thousand','ألف','alf','Time & numbers'],
  ['Where is the Qibla?','وين القبلة؟','wēn al-qibla?','Umrah & mosque'],
  ['When is the prayer?','متى الصلاة؟','mata aṣ-ṣalāh?','Umrah & mosque'],
  ['Gate','باب','bāb','Umrah & mosque'],
  ['Zamzam water','ماء زمزم','māʾ zamzam','Umrah & mosque'],
  ['Ihram','إحرام','iḥrām','Umrah & mosque'],
  ['May Allah accept (from you)','تقبل الله','taqabbal allāh','Umrah & mosque'],
  ['Eid Mubarak','عيد مبارك','ʿīd mubārak','Umrah & mosque'],
  ['Ramadan Kareem','رمضان كريم','ramaḍān karīm','Umrah & mosque']
];
PHRASES.length = 0; PB.forEach(function(p){ PHRASES.push(p); });
const PB_CATS = ['All','★ Saved'].concat(PB.map(function(p){ return p[3]; }).filter(function(c, i, a){ return a.indexOf(c) === i; }));

/* ---------- audio: real Arabic voice via /tts, phone voice as backup ---------- */
let arAudio = null;
function playAr(text, btn){
  text = String(text || '').split(' / ')[0].replace(/…/g, '').trim(); if(!text) return;
  if(arAudio){ arAudio.pause(); arAudio = null; }
  if(btn){ btn.dataset.l = btn.dataset.l || btn.textContent; btn.textContent = '⏳'; }
  const done = function(){ if(btn) btn.textContent = btn.dataset.l || '🔊'; };
  const fallback = function(){
    done();
    if('speechSynthesis' in window && speechSynthesis.getVoices){
      speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(text); u.lang = 'ar-SA'; u.rate = 1; speechSynthesis.speak(u);
    } else toast('Audio is unavailable right now — check your connection');
  };
  const a = new Audio('/tts?text=' + encodeURIComponent(text)); arAudio = a;
  a.onplaying = done; a.onended = done; a.onerror = fallback;
  a.play().catch(fallback);
}
speak = function(text){ playAr(text); };

/* ---------- dictionary & phrasebook panel ---------- */
const dictState = { cat:'All', q:'' };
PANELS.phrases = function(){
  showPanel('Arabic dictionary', `<div class="search-box"><span>🔍</span><input id="dictQ" placeholder="Type any English or Arabic word…" value="${esc(dictState.q)}" oninput="dictState.q=this.value;renderPB()" onkeydown="if(event.key==='Enter')dictLookup()" autocomplete="off"></div>
    <button class="btn btn-primary btn-sm" style="margin:0 auto 12px" onclick="dictLookup()">📖 Look up any word</button>
    <div id="dictOut"></div>
    <div class="chips" id="pbCats">${PB_CATS.map(function(c){ return `<button class="chip ${c === dictState.cat ? 'on' : ''}" onclick="dictState.cat='${c}';PANELS.phrases()">${c}</button>`; }).join('')}</div>
    <div id="pbList"></div>
    <p class="small" style="text-align:center;margin-top:10px">${PB.length} built-in phrases · any other word via “Look up”. Tap 🔊 to hear it.</p>`, { id:'phrases' });
  renderPB();
};
function pbFavs(){ return store.get('pbFav', []); }
function renderPB(){
  if(!$('pbList')) return;
  const q = (dictState.q || '').trim().toLowerCase(), fav = pbFavs();
  const list = PB.map(function(p, i){ return [p, i]; }).filter(function(x){
    const p = x[0];
    if(dictState.cat === '★ Saved' && fav.indexOf(p[1]) < 0) return false;
    if(dictState.cat !== 'All' && dictState.cat !== '★ Saved' && p[3] !== dictState.cat) return false;
    return !q || (p[0] + ' ' + p[1] + ' ' + p[2]).toLowerCase().indexOf(q) >= 0;
  });
  const savedWords = dictState.cat === '★ Saved' ? store.get('dictSaved', []).filter(function(w){ return !q || (w.en + ' ' + w.ar + ' ' + w.tr).toLowerCase().indexOf(q) >= 0; }) : [];
  $('pbList').innerHTML = list.map(function(x){ return wordCard(x[0][0], x[0][1], x[0][2], x[0][3]); }).join('') + savedWords.map(function(w){ return wordCard(w.en, w.ar, w.tr, w.pos || 'Saved word'); }).join('') ||
    `<div class="empty">${q ? 'Not in the phrasebook — tap <b>📖 Look up any word</b> to search the full dictionary.' : 'Nothing saved yet — tap ☆ on any word.'}</div>`;
}
function wordCard(en, ar, tr, sub){
  const saved = pbFavs().indexOf(ar) >= 0 || store.get('dictSaved', []).some(function(w){ return w.ar === ar; });
  const a = esc(ar).replace(/'/g, '&#39;');
  return `<div class="phrase"><div class="t"><div class="en">${esc(en)}</div><div class="ar">${esc(ar)}</div><div class="tr">${esc(tr)}${sub ? ' · <span style="font-style:normal">' + esc(sub) + '</span>' : ''}</div></div><div style="display:flex;flex-direction:column;gap:6px"><button class="speak" onclick="playAr('${a}',this)" aria-label="Play">🔊</button><button class="speak" onclick="toggleWord('${a}',this,'${esc(en).replace(/'/g, '&#39;')}','${esc(tr).replace(/'/g, '&#39;')}')" aria-label="Save">${saved ? '★' : '☆'}</button></div></div>`;
}
function toggleWord(ar, el, en, tr){
  const inPB = PB.some(function(p){ return p[1] === ar; });
  if(inPB){ const f = pbFavs(), k = f.indexOf(ar); if(k >= 0) f.splice(k, 1); else f.push(ar); store.set('pbFav', f); el.textContent = k >= 0 ? '☆' : '★'; return; }
  const l = store.get('dictSaved', []), k = l.findIndex(function(w){ return w.ar === ar; });
  if(k >= 0) l.splice(k, 1); else l.unshift({ ar:ar, en:en, tr:tr }); store.set('dictSaved', l.slice(0, 300)); el.textContent = k >= 0 ? '☆' : '★';
}
function dictLookup(){
  const q = ($('dictQ').value || '').trim(); if(!q) return toast('Type a word first');
  $('dictOut').innerHTML = '<div class="phrase"><div class="t"><div class="skeleton" style="margin-bottom:8px"></div><div class="skeleton" style="width:60%"></div></div></div>';
  getJSON('/dict?q=' + encodeURIComponent(q), 25000).then(function(d){
    if(!$('dictOut')) return;
    if(!d || !d.ok){ $('dictOut').innerHTML = `<div class="note">${esc((d && d.error) || 'Dictionary unavailable right now.')}</div>`; return; }
    if(!d.results.length){ $('dictOut').innerHTML = '<div class="note">No dictionary entry found. Check the spelling.</div>'; return; }
    award('dict');
    $('dictOut').innerHTML = `<div class="small" style="margin:0 4px 6px;font-weight:800;color:var(--gold)">📖 “${esc(d.query)}”</div>` + d.results.map(function(r){ return wordCard(r.en, r.ar, r.tr, [r.pos, r.note].filter(Boolean).join(' · ')); }).join('') +
      (d.examples.length ? '<div class="card" style="margin-bottom:12px"><div class="small" style="font-weight:800;margin-bottom:6px">Examples</div>' + d.examples.map(function(e){ const a = esc(e.ar).replace(/'/g, '&#39;'); return `<div style="display:flex;gap:10px;align-items:center;margin:6px 0"><div style="flex:1"><div class="ar" style="font-size:18px">${esc(e.ar)}</div><div class="small" style="font-style:italic">${esc(e.tr)}</div><div style="font-size:13.5px">${esc(e.en)}</div></div><button class="speak" onclick="playAr('${a}',this)">🔊</button></div>`; }).join('') + '</div>' : '') +
      '<p class="small" style="margin:-4px 4px 12px">Dictionary by AI — double-check important words.</p>';
  }).catch(function(){ if($('dictOut')) $('dictOut').innerHTML = '<div class="note">You seem to be offline. Built-in phrases still work.</div>'; });
}
Object.assign(META.phrases, { t:'Arabic dictionary', s:'Any word · audio · ' + PB.length + ' phrases', short:'Dictionary', ic:'📖' });
BADGES.splice(BADGES.length - 2, 0, { id:'dict', ic:'🔤', t:'Word explorer' });

/* ---------- Pi Wallet ---------- */
function piWalletPanel(){
  const me = piUser ? piUser.username : '';
  const hist = store.get(histKey(), []), paid = hist.filter(function(h){ return h.status === 'completed'; }).reduce(function(s, h){ return s + Number(h.amount || 0); }, 0);
  showPanel('Pi requests & history', `<div class="pi-card"><div style="display:flex;align-items:center;gap:10px"><div class="sym" aria-hidden="true"><svg class="i"><use href="#i-chart"/></svg></div><div><b>${me ? '@' + esc(me) : 'Not signed in'}</b><br><small>Your Pi Wallet in the Pi Browser</small></div></div>
      <div style="margin-top:12px;display:flex;gap:8px;flex-wrap:wrap"><span class="chg">Paid in DigitalSaudi: ${fmt(paid, 2)} π</span>${store.get('pi', null) ? '<span class="chg">1 π ≈ $' + fmt(store.get('pi').usd, 4) + '</span>' : ''}</div></div>
    <div class="seg" style="margin-top:14px"><button class="on" id="wTabReq" onclick="walletTab('req')">📥 Request</button><button id="wTabSend" onclick="walletTab('send')">📤 Send</button><button id="wTabHist" onclick="walletTab('hist')">🧾 History</button></div>
    <div id="wBody"></div>
    <button class="row" onclick="clearStuckPayment()"><div class="ic">🧹</div><div class="tx"><b>Fix “Pending payment found”</b><small>Clears an unfinished payment so you can pay again</small></div><span class="chev">›</span></button>`, { id:'piWallet', share:false });
  walletTab('req');
}
function walletTab(t){
  ['Req','Send','Hist'].forEach(function(k){ const b = $('wTab' + k); if(b) b.classList.toggle('on', k.toLowerCase() === t); });
  const me = piUser ? piUser.username : '';
  if(t === 'req'){
    $('wBody').innerHTML = `<p class="small" style="margin-bottom:10px">Create a payment request to show or share. The payer sends Pi from their own Pi Wallet.</p>
      <div class="field"><label>Your Pi username or wallet address</label><input id="wrTo" value="${esc(me)}" placeholder="username or G… wallet address"></div>
      <div class="two"><div class="field"><label>Amount (π)</label><input id="wrAmt" type="number" inputmode="decimal" step="0.01" placeholder="e.g. 2.5" oninput="wrConv()"></div><div class="field"><label>For (memo)</label><input id="wrMemo" placeholder="e.g. Coffee"></div></div>
      <div class="small" id="wrConvOut" style="margin:-4px 0 10px"></div>
      <button class="btn btn-primary" style="margin:0 auto" onclick="makeRequest()">Create request</button><div id="wrOut" style="text-align:center"></div>`;
  } else if(t === 'send'){
    $('wBody').innerHTML = stepsHTML([
      ['Get the details', 'Ask for the receiver’s Pi username or wallet address and the exact amount. Scan their DigitalSaudi request QR if they have one.'],
      ['Open your Pi Wallet', 'In the Pi Browser, open the Wallet from the home screen or menu, and unlock it with your passphrase or fingerprint.'],
      ['Send', 'Tap Send / Pay, paste the username or address (or scan the QR), enter the amount and add a memo.'],
      ['Check, then confirm', 'Double-check the receiver and amount — Pi transfers can’t be reversed.']
    ]) + '<div class="p-actions"><button class="btn btn-ghost btn-sm" onclick="openItem(\'support\')">💚 Pay DigitalSaudi</button><button class="btn btn-ghost btn-sm" onclick="openDirectory(true)">π Find Pi merchants</button></div><div class="note">Never type your Pi passphrase into any app or website — only into the official Pi Wallet.</div>';
  } else {
    const list = store.get(histKey(), []);
    $('wBody').innerHTML = list.length ? '<div class="card hist">' + list.map(function(h){ return `<button class="h" onclick="openReceipt('${esc(h.id)}')"><div><b>${esc(h.memo)}</b><div class="small">${new Date(h.at).toLocaleDateString('en-GB', { day:'numeric', month:'short', year:'numeric' })}</div></div><div style="text-align:right"><b>${h.amount} π</b><div><span class="status ${h.status === 'completed' ? 's-ok' : h.status === 'pending' ? 's-pend' : 's-bad'}">${h.status}</span></div></div></button>`; }).join('') + '</div>' : '<div class="empty"><div class="big">🧾</div>No payments in DigitalSaudi yet.</div>';
  }
}
function wrConv(){ const a = parseFloat($('wrAmt').value) || 0, n = convert(a, 'PI', 'USD'), s = convert(a, 'PI', 'SAR'); $('wrConvOut').textContent = a && s ? '≈ ' + fmt(s, 2) + ' SAR' + (n ? ' · $' + fmt(n, 2) : '') : ''; }
function makeRequest(){
  const to = $('wrTo').value.trim().replace(/^@/, ''), amt = parseFloat($('wrAmt').value), memo = $('wrMemo').value.trim();
  if(!to) return toast('Enter your Pi username or wallet address');
  if(!(amt > 0)) return toast('Enter an amount');
  const isAddr = /^G[A-Z2-7]{55}$/.test(to);
  const text = 'Pay ' + amt + ' π to ' + (isAddr ? to : '@' + to) + (memo ? ' — ' + memo : '');
  $('wrOut').innerHTML = '<div class="spinner" style="margin:16px auto;border-color:var(--line);border-top-color:var(--accent)"></div>';
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js').then(function(){
    if(!$('wrOut')) return;
    $('wrOut').innerHTML = `<div class="qr" id="wrQR"></div><div style="font-size:22px;font-weight:900">${fmt(amt, 4)} π</div><div class="small">${esc(isAddr ? to.slice(0, 6) + '…' + to.slice(-6) : '@' + to)}${memo ? ' · ' + esc(memo) : ''}</div>
      <div class="p-actions" style="justify-content:center"><button class="btn btn-primary btn-sm" onclick="shareText('Pi payment request', '${esc(text).replace(/'/g, '&#39;')}', location.origin)">📤 Share request</button><button class="btn btn-ghost btn-sm" onclick="copyText('${esc(to)}')">📋 Copy ${isAddr ? 'address' : 'username'}</button></div>`;
    new QRCode($('wrQR'), { text:isAddr ? to : text, width:210, height:210, correctLevel:QRCode.CorrectLevel.M });
  }).catch(function(){ if($('wrOut')) $('wrOut').innerHTML = '<div class="card" style="margin-top:12px"><b>' + esc(text) + '</b></div><button class="btn btn-ghost btn-sm" style="margin:10px auto 0" onclick="shareText(\'Pi payment request\', \'' + esc(text).replace(/'/g, '&#39;') + '\', location.origin)">📤 Share request</button>'; });
}
Object.assign(META, { piWallet:{ t:'Pi requests & history', ic:'🧾', s:'Payment requests, your Pi payments', short:'Requests' } });
PANELS.piWallet = piWalletPanel;
NOMARK.push('piWallet','stuckPay');

/* ==========================================================================
   v3.2 — "Accept Pi" poster & sticker studio (real, scannable QR codes)
   ========================================================================== */
const QR_LIB = 'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js';
const PDF_LIB = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
const PUBLIC_ORIGIN = /^https:\/\//.test(location.origin) && !/localhost|127\.0\.0\.1/.test(location.origin) ? location.origin : 'https://digitalsaudi.pages.dev';
const POSTER_THEMES = {
  emerald:{ n:'Emerald', a:'#0E8A4C', b:'#033A20', gold:'#E7C463', gold2:'#C9962B', ink:'#06341D' },
  midnight:{ n:'Midnight gold', a:'#22252E', b:'#05060A', gold:'#F2D27A', gold2:'#B8862A', ink:'#121318' },
  royal:{ n:'Red Sea teal', a:'#0F7C80', b:'#062F33', gold:'#F2D27A', gold2:'#C8952A', ink:'#06373B' }
};
const POSTER_SIZES = {
  poster:{ n:'Poster (A4/A5)', w:1240, h:1754, pdf:'a4' },
  sticker:{ n:'Square sticker', w:1200, h:1200, pdf:[100, 100] },
  story:{ n:'Status / Story', w:1080, h:1920, pdf:null }
};
const isPiAddress = function(s){ return /^G[A-Z2-7]{55}$/.test(s); };
const cleanPiUser = function(s){ return String(s || '').trim().replace(/^@/, '').replace(/\s+/g, ''); };

function posterData(){ return Object.assign({ name:'', to:piUser ? piUser.username : '', amount:'', memo:'', city:'', theme:'emerald', size:'poster', mode:'auto' }, store.get('poster', {})); }
function payLink(d){
  const q = new URLSearchParams(); q.set('to', d.to);
  if(d.name) q.set('n', d.name); if(d.amount) q.set('a', d.amount); if(d.memo) q.set('m', d.memo); if(d.city) q.set('c', d.city);
  return PUBLIC_ORIGIN + '/pay?' + q.toString();
}
function qrPayload(d){
  const mode = d.mode === 'auto' ? (isPiAddress(d.to) ? 'wallet' : 'link') : d.mode;
  return mode === 'wallet' && isPiAddress(d.to) ? { text:d.to, mode:'wallet' } : { text:payLink(d), mode:'link' };
}

function posterPanel(prefill){
  const d = Object.assign(posterData(), prefill || {});
  store.set('poster', d);
  const opt = function(obj, cur){ return Object.keys(obj).map(function(k){ return `<option value="${k}" ${k === cur ? 'selected' : ''}>${obj[k].n}</option>`; }).join(''); };
  showPanel('Accept Pi poster', `
    <div class="card" style="display:flex;gap:12px;align-items:center;border-color:rgba(212,175,55,.4)"><div style="font-size:30px">🖼️</div><div><b>Print it. Stick it. Share it.</b><div class="small">A professional "Pi accepted here" poster with a real, scannable QR code for your shop, stall or service.</div></div></div>
    <div class="field" style="margin-top:14px"><label>Business or seller name *</label><input id="po_name" maxlength="40" value="${esc(d.name)}" placeholder="e.g. Al Noor Café" oninput="posterSave()"></div>
    <div class="field"><label>Pi username or wallet address *</label><input id="po_to" maxlength="60" value="${esc(d.to)}" placeholder="username or G… wallet address" oninput="posterSave()"><div class="small" style="margin-top:4px">Tip: paste your wallet address (starts with G) and customers can scan it straight from their Pi Wallet.</div></div>
    <div class="two"><div class="field"><label>Fixed price in π (optional)</label><input id="po_amount" type="number" inputmode="decimal" step="0.01" min="0" value="${esc(d.amount)}" placeholder="leave empty" oninput="posterSave()"></div>
    <div class="field"><label>City (optional)</label><input id="po_city" maxlength="24" value="${esc(d.city)}" placeholder="e.g. Jeddah" oninput="posterSave()"></div></div>
    <div class="field"><label>Short note (optional)</label><input id="po_memo" maxlength="40" value="${esc(d.memo)}" placeholder="e.g. Coffee · Delivery · Open 24h" oninput="posterSave()"></div>
    <div class="two"><div class="field"><label>Style</label><select id="po_theme" onchange="posterSave()">${opt(POSTER_THEMES, d.theme)}</select></div>
    <div class="field"><label>Format</label><select id="po_size" onchange="posterSave()">${opt(POSTER_SIZES, d.size)}</select></div></div>
    <div class="field"><label>QR code opens</label><select id="po_mode" onchange="posterSave()">
      <option value="auto" ${d.mode === 'auto' ? 'selected' : ''}>Automatic (best choice)</option>
      <option value="wallet" ${d.mode === 'wallet' ? 'selected' : ''}>Pi Wallet scan (wallet address only)</option>
      <option value="link" ${d.mode === 'link' ? 'selected' : ''}>Your pay page (works with any phone camera)</option></select></div>
    <button class="btn btn-primary" id="poGo" style="margin:4px auto 0" onclick="makePoster()">✨ Create my poster</button>
    <div id="poOut" style="margin-top:16px"></div>
    <div class="note">π Customers always send Pi from their own Pi Wallet — nobody else can move your Pi. Ask customers to confirm the amount and your username before paying; Pi transfers can't be reversed.</div>`, { id:'merchantQR', share:false });
}
function posterSave(){
  const g = function(k){ const el = $('po_' + k); return el ? el.value.trim() : ''; };
  const d = { name:g('name'), to:cleanPiUser(g('to')), amount:g('amount'), memo:g('memo'), city:g('city'), theme:g('theme') || 'emerald', size:g('size') || 'poster', mode:g('mode') || 'auto' };
  store.set('poster', d); return d;
}

/* ---------- drawing helpers ---------- */
const PF = '"Segoe UI", system-ui, -apple-system, Roboto, "Noto Sans", "Noto Naskh Arabic", Tahoma, Arial, sans-serif';
function rr(ctx, x, y, w, h, r){ ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function fitFont(ctx, text, maxW, size, weight){ let s = size; do { ctx.font = (weight || 800) + ' ' + s + 'px ' + PF; if(ctx.measureText(text).width <= maxW) break; s -= 2; } while(s > 10); return s; }
function txt(ctx, text, x, y, size, color, weight, maxW, spacing){
  ctx.fillStyle = color; ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic';
  if(spacing && 'letterSpacing' in ctx) ctx.letterSpacing = spacing + 'px';
  if(maxW) fitFont(ctx, text, maxW, size, weight); else ctx.font = (weight || 800) + ' ' + size + 'px ' + PF;
  ctx.fillText(text, x, y); if('letterSpacing' in ctx) ctx.letterSpacing = '0px';
}
function star8(ctx, cx, cy, r, color, alpha, lw){
  ctx.save(); ctx.globalAlpha = alpha; ctx.strokeStyle = color; ctx.lineWidth = lw;
  [0, Math.PI / 4].forEach(function(rot){ ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot); rr(ctx, -r, -r, r * 2, r * 2, r * .08); ctx.stroke(); ctx.restore(); });
  ctx.restore();
}
function piGlyph(ctx, cx, cy, s, color){
  // the same π drawn in the DigitalSaudi logo, scaled to size s
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s / 120, s / 120); ctx.translate(-256, -218);
  ctx.strokeStyle = color; ctx.lineWidth = 21; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(204, 180); ctx.quadraticCurveTo(246, 170, 310, 176); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(236, 182); ctx.quadraticCurveTo(236, 232, 216, 260); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(282, 180); ctx.lineTo(282, 240); ctx.quadraticCurveTo(282, 262, 302, 258); ctx.stroke();
  ctx.restore();
}
function loadImg(src){ return new Promise(function(res){ const i = new Image(); i.onload = function(){ res(i); }; i.onerror = function(){ res(null); }; i.src = src; }); }
function qrCanvas(text){
  const box = document.createElement('div'); box.style.cssText = 'position:fixed;left:-9999px;top:0';
  document.body.appendChild(box);
  new QRCode(box, { text:text, width:1000, height:1000, colorDark:'#000000', colorLight:'#ffffff', correctLevel:QRCode.CorrectLevel.H });
  const c = box.querySelector('canvas'); box.remove(); return c;
}

function drawPoster(d, qr, logo){
  const S = POSTER_SIZES[d.size] || POSTER_SIZES.poster, T = POSTER_THEMES[d.theme] || POSTER_THEMES.emerald;
  const W = S.w, H = S.h, u = W / 100, sq = d.size === 'sticker';
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H;
  const ctx = cv.getContext('2d');
  // background
  const g = ctx.createLinearGradient(0, 0, W, H); g.addColorStop(0, T.a); g.addColorStop(1, T.b); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  star8(ctx, W * .92, H * .06, W * .28, T.gold, .12, u * .5); star8(ctx, W * .05, H * .97, W * .3, T.gold, .1, u * .5);
  const gold = ctx.createLinearGradient(0, 0, W, 0); gold.addColorStop(0, T.gold); gold.addColorStop(1, T.gold2);
  ctx.fillStyle = gold; ctx.fillRect(0, 0, W, u * .9); ctx.fillRect(0, H - u * .9, W, u * .9);

  // per-format layout (all in % of width)
  const P = sq ? { top:4, logo:5, g1:4.5, we:0, head:7.2, g2:4.8, ar:3.9, g3:3, pad:3.5, name:4.6, who:2.9, bottom:16 }
    : d.size === 'story' ? { top:7, logo:7, g1:9, we:3.4, head:9.4, g2:7.4, ar:5, g3:6, pad:4.5, name:5.4, who:3.3, bottom:30 }
    : { top:5, logo:6, g1:6, we:3, head:8.4, g2:6.4, ar:4.4, g3:4, pad:3.6, name:5, who:3, bottom:26 };
  let y = u * P.top;
  // brand row
  const ls = u * P.logo; ctx.font = '800 ' + (ls * .52) + 'px ' + PF;
  const bw = ls + u * 2 + ctx.measureText('DigitalSaudi').width, bx = (W - bw) / 2;
  if(logo) ctx.drawImage(logo, bx, y, ls, ls);
  ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText('Digital', bx + ls + u * 2, y + ls / 2);
  ctx.fillStyle = T.gold; ctx.fillText('Saudi', bx + ls + u * 2 + ctx.measureText('Digital').width, y + ls / 2);
  y += ls + u * P.g1;
  // headline
  if(P.we){ txt(ctx, 'WE ACCEPT', W / 2, y, u * P.we, T.gold, 800, null, u * .9); y += u * (P.we + 1.2); }
  y += u * P.head * .9;
  txt(ctx, 'Pi Accepted Here', W / 2, y, u * P.head, '#fff', 900, W - u * 12); y += u * P.g2;
  txt(ctx, 'نقبل الدفع بعملة باي', W / 2, y, u * P.ar, T.gold, 700, W - u * 16); y += u * P.g3;

  // QR card — sized to fit the space left above the steps and footer
  const memoLine = !sq && !d.amount && d.memo;
  const reserve = u * P.bottom + (memoLine ? u * 6 : 0);
  const pad = u * P.pad;
  const infoH = (d.name ? u * (P.name + 2.2) : 0) + u * (P.who + 1.8) + (d.amount ? u * (P.who * 2.6 + 2) : 0) + u * 1.5;
  let qs = Math.min(u * 74 - pad * 2, H - y - reserve - infoH - pad * 1.6);
  qs = Math.max(qs, u * 28);
  const cardW = Math.max(qs + pad * 2, u * 50), cardX = (W - cardW) / 2, cardH = pad + qs + infoH + pad * .6;
  const spare = Math.max(0, H - y - reserve - cardH); y += spare * .4;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = u * 4; ctx.shadowOffsetY = u * 1.2; ctx.fillStyle = '#fff'; rr(ctx, cardX, y, cardW, cardH, u * 4); ctx.fill(); ctx.restore();
  ctx.strokeStyle = gold; ctx.lineWidth = u * .6; rr(ctx, cardX, y, cardW, cardH, u * 4); ctx.stroke();
  const qx = (W - qs) / 2, qy = y + pad;
  ctx.imageSmoothingEnabled = false; ctx.drawImage(qr, qx, qy, qs, qs); ctx.imageSmoothingEnabled = true;
  // centre badge (QR level H tolerates it)
  const cb = qs * .2, ccx = qx + qs / 2, ccy = qy + qs / 2;
  ctx.fillStyle = '#fff'; rr(ctx, ccx - cb / 2 - u * .8, ccy - cb / 2 - u * .8, cb + u * 1.6, cb + u * 1.6, u * 2); ctx.fill();
  if(logo) ctx.drawImage(logo, ccx - cb / 2, ccy - cb / 2, cb, cb);
  else { ctx.fillStyle = T.ink; rr(ctx, ccx - cb / 2, ccy - cb / 2, cb, cb, u * 2); ctx.fill(); piGlyph(ctx, ccx, ccy, cb * .7, T.gold); }
  let iy = qy + qs + u * (P.name + 1.2);
  if(d.name){ txt(ctx, d.name, W / 2, iy, u * P.name, T.ink, 900, cardW - pad * 2); iy += u * (P.who + 2.4); }
  const who = isPiAddress(d.to) ? d.to.slice(0, 6) + '…' + d.to.slice(-6) : '@' + d.to;
  txt(ctx, 'π  ' + who + (d.city ? '  ·  ' + d.city : ''), W / 2, iy, u * P.who, '#4b5563', 700, cardW - pad * 2);
  if(d.amount){
    iy += u * 2.4; const pt = fmt(+d.amount, 4) + ' π' + (d.memo ? '  ·  ' + d.memo : '');
    const ps = fitFont(ctx, pt, cardW - pad * 3, u * P.who * 1.2, 900), pw = ctx.measureText(pt).width + u * 6;
    ctx.fillStyle = T.ink; rr(ctx, W / 2 - pw / 2, iy, pw, ps + u * 2.4, (ps + u * 2.4) / 2); ctx.fill();
    txt(ctx, pt, W / 2, iy + ps + u * .8, ps, T.gold, 900);
  }

  // steps — anchored to the bottom
  const mode = qrPayload(d).mode;
  const steps = mode === 'wallet' ? ['Open Pi Wallet', 'Scan this code', 'Confirm & pay'] : ['Scan this code', 'Check the amount', 'Pay in Pi Wallet'];
  if(!sq){
    const sy = H - u * (P.bottom - 6), sw = (W - u * 16) / 3;
    if(memoLine) txt(ctx, d.memo, W / 2, sy - u * 7, u * 3.6, T.gold, 800, W - u * 16);
    steps.forEach(function(s, i){
      const cx = u * 8 + sw * i + sw / 2;
      ctx.fillStyle = gold; ctx.beginPath(); ctx.arc(cx, sy, u * 3.2, 0, Math.PI * 2); ctx.fill();
      txt(ctx, String(i + 1), cx, sy + u * 1.3, u * 3.6, T.ink, 900);
      txt(ctx, s, cx, sy + u * 8, u * 3.1, '#fff', 700, sw - u * 2);
    });
    txt(ctx, 'Confirm the amount before paying · Pi transfers can’t be reversed', W / 2, H - u * 7.5, u * 2.3, 'rgba(255,255,255,.75)', 600, W - u * 10);
    txt(ctx, 'digitalsaudi.pi' + ' · find Pi merchants on DigitalSaudi', W / 2, H - u * 3.8, u * 2.3, T.gold, 700, W - u * 10);
  } else {
    txt(ctx, steps.join('   ›   '), W / 2, H - u * 10.5, u * 3, '#fff', 700, W - u * 12);
    txt(ctx, 'Pi transfers can’t be reversed · ' + 'digitalsaudi.pi', W / 2, H - u * 4.5, u * 2.4, T.gold, 700, W - u * 10);
  }
  return cv;
}

let POSTER_LAST = null;
function makePoster(){
  const d = posterSave();
  if(!d.name) return toast('Add your business name');
  if(!d.to || !(isPiAddress(d.to) || /^[A-Za-z0-9_.\-]{2,40}$/.test(d.to))) return toast('Enter a valid Pi username or wallet address');
  if(d.amount && !(+d.amount > 0)) return toast('Price must be a positive number');
  if(d.mode === 'wallet' && !isPiAddress(d.to)){ toast('Pi Wallet scan needs a wallet address (starts with G) — using your pay page instead'); }
  const out = $('poOut'), btn = $('poGo'); btn.disabled = true;
  out.innerHTML = '<div class="spinner" style="margin:16px auto;border-color:var(--line);border-top-color:var(--accent)"></div>';
  Promise.all([loadScript(QR_LIB), loadImg(document.querySelector('header .mark') ? document.querySelector('header .mark').src : '/icon.svg')]).then(function(r){
    const qp = qrPayload(d), qr = qrCanvas(qp.text);
    if(!qr) throw new Error('qr');
    const cv = drawPoster(d, qr, r[1]);
    const url = cv.toDataURL('image/png');
    POSTER_LAST = { d:d, canvas:cv, url:url, link:payLink(d), qp:qp };
    btn.disabled = false; btn.textContent = '🔄 Update poster';
    if(!$('poOut')) return;
    $('poOut').innerHTML = `<img src="${url}" alt="Accept Pi poster" style="width:100%;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.35);display:block">
      <div class="p-actions po-acts">
        <button class="btn btn-primary" onclick="posterShare()">📤 Share</button>
        <button class="btn btn-ghost" onclick="posterDownload()">⬇️ Save image</button>
        ${(POSTER_SIZES[d.size] || {}).pdf ? '<button class="btn btn-ghost" onclick="posterPDF()">🖨️ Print PDF</button>' : ''}
      </div>
      <button class="row" onclick="openItem('addBusiness')"><div class="ic">🏪</div><div class="tx"><b>List your business on the Pi map</b><small>Free · customers find you in Explore › Pi merchants</small></div><span class="chev">›</span></button>`;
    award('piMerchant');
  }).catch(function(){ btn.disabled = false; if($('poOut')) $('poOut').innerHTML = '<p class="small">The poster maker could not load. Check your connection and try again.</p>'; });
}
function posterFile(){
  return new Promise(function(res){ POSTER_LAST.canvas.toBlob(function(b){ res(b); }, 'image/png'); });
}
function posterFileName(){ return 'accept-pi-' + (POSTER_LAST.d.name || 'poster').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') + '.png'; }
function posterShare(){
  if(!POSTER_LAST) return;
  posterFile().then(function(blob){
    const f = blob && typeof File !== 'undefined' ? new File([blob], posterFileName(), { type:'image/png' }) : null;
    const text = POSTER_LAST.d.name + ' accepts Pi! Scan the code or open: ' + POSTER_LAST.link;
    if(f && navigator.canShare && navigator.canShare({ files:[f] })){
      navigator.share({ files:[f], title:'Pi accepted here', text:text }).catch(function(){});
    } else shareText('Pi accepted here', text, POSTER_LAST.link);
  });
}
/* v6.0 — saving that also works inside Pi Browser.
   Pi Browser ignores download links made inside the page, so there the file is uploaded to
   /poster-file (kept 24 h) and opened in the phone's own browser, which saves it normally. */
function inPiBrowser(){ const ua = navigator.userAgent || ''; return /PiBrowser/i.test(ua) || /; wv\)/.test(ua); }   // Pi Browser or another in-app (WebView) browser
function saveFileSheet(url, name){
  const abs = location.origin + url;
  showPanel('Save your poster', `<p>Your file <b>${esc(name)}</b> is ready.</p>
    <a class="btn btn-primary" style="width:100%;margin-top:6px" href="${esc(abs)}" target="_blank" rel="noopener">⬇️ Download ${esc(name.split('.').pop().toUpperCase())}</a>
    <button class="btn btn-ghost" style="width:100%;margin-top:10px" onclick="copyText('${esc(abs)}')">📋 Copy download link</button>
    <p class="small" style="margin-top:12px">If nothing downloads, copy the link and open it in Chrome or Safari. The link works for 24 hours.</p>`, { id:'posterSave' });
}
function saveBlob(blob, name){
  if(!blob) return toast('Could not create the file');
  if(!inPiBrowser()){
    const a = document.createElement('a'); a.download = name; a.href = URL.createObjectURL(blob);
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function(){ URL.revokeObjectURL(a.href); }, 6000);
    return toast('Saving ' + name + '…');
  }
  toast('Preparing your download…');
  fetch('/poster-file?name=' + encodeURIComponent(name), { method:'POST', headers:{ 'Content-Type': blob.type || 'image/png' }, body: blob })
    .then(function(r){ return r.json(); })
    .then(function(j){
      if(!j || !j.ok || !j.url) throw new Error((j && j.error) || 'upload');
      const abs = location.origin + j.url;
      try{ if(window.Pi && typeof window.Pi.openUrlInSystemBrowser === 'function'){ window.Pi.openUrlInSystemBrowser(abs); toast('Opening your browser to save the file…'); setTimeout(function(){ saveFileSheet(j.url, name); }, 900); return; } }catch(e){}
      saveFileSheet(j.url, name);
    })
    .catch(function(){ posterHandoff(/\.pdf$/.test(name) ? 'pdf' : 'png'); });
}
/* Backup when the upload can't be used: open DigitalSaudi in the phone's own browser with the poster
   details in the address; it redraws the same poster there and saves it (Chrome/Safari allow that). */
function posterHandoff(fmt){
  if(!POSTER_LAST) return;
  const url = location.origin + '/#mkposter=' + encodeURIComponent(JSON.stringify(Object.assign({}, POSTER_LAST.d, { f: fmt || 'png' })));
  try{ if(window.Pi && typeof window.Pi.openUrlInSystemBrowser === 'function'){ window.Pi.openUrlInSystemBrowser(url); toast('Opening your browser to save the poster…'); return; } }catch(e){}
  showPanel('Save your poster', `<p>Pi Browser can't save files directly. Open this link in Chrome or Safari and your poster downloads there:</p>
    <div class="result" style="word-break:break-all;font-size:12.5px">${esc(url)}</div>
    <button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="copyText('${esc(url).replace(/'/g, '%27')}')">📋 Copy link</button>
    <p class="small" style="margin-top:10px">Or long-press the poster image and choose “Save image”.</p>`, { id:'posterSave' });
}
function posterDownload(){
  if(!POSTER_LAST) return;
  posterFile().then(function(blob){ saveBlob(blob, posterFileName()); });
}
function posterPDF(){
  if(!POSTER_LAST) return;
  const S = POSTER_SIZES[POSTER_LAST.d.size];
  loadScript(PDF_LIB).then(function(){
    const doc = new window.jspdf.jsPDF({ unit:'mm', format:S.pdf, orientation:'portrait' });
    const pw = doc.internal.pageSize.getWidth(), ph = doc.internal.pageSize.getHeight();
    const r = Math.min(pw / S.w, ph / S.h), w = S.w * r, h = S.h * r;
    // high-quality JPEG inside the PDF keeps the file small (≈1 MB instead of ≈9 MB) and the QR sharp
    doc.addImage(POSTER_LAST.canvas.toDataURL('image/jpeg', 0.93), 'JPEG', (pw - w) / 2, (ph - h) / 2, w, h);
    saveBlob(doc.output('blob'), posterFileName().replace('.png', '.pdf'));
  }).catch(function(){ toast('PDF maker could not load'); });
}

/* hooks: replace the old Merchant QR panel, add entry points */
PANELS.merchantQR = function(){ posterPanel(); };
PANELS.acceptPi = function(){ posterPanel(); };
Object.assign(META, {
  merchantQR:{ t:'Accept Pi poster', ic:'🖼️', s:'Printable QR poster & sticker for your business', short:'Pi poster' },
  acceptPi:{ t:'Accept Pi poster', ic:'🖼️', s:'Printable QR poster & sticker for your business', short:'Pi poster' }
});
NOMARK.push('acceptPi');
(function(){
  const _hub = piHubPanel;
  piHubPanel = function(){
    _hub();
    const t = document.querySelector('#pBody .tile[onclick*="merchantQR"] span'); if(t) t.textContent = 'Pi poster';
    const ic = document.querySelector('#pBody .tile[onclick*="merchantQR"] .ic'); if(ic) ic.textContent = '🖼️';
    const row = document.querySelector('#pBody .row[onclick*="addBusiness"]');
    if(row) row.insertAdjacentHTML('afterend', `<button class="row" onclick="openItem('merchantQR')" style="border-color:rgba(212,175,55,.45)"><div class="ic">🖼️</div><div class="tx"><b>Get your "Pi accepted here" poster</b><small>Real QR code · print, stick or share on WhatsApp</small></div><span class="chev">›</span></button>`);
  };
  PANELS.piHub = piHubPanel;
  const _biz = openBiz;
  openBiz = function(id){
    _biz(id);
    const b = (window._biz || {})[id];
    if(!b || !b.accepts_pi || !b.pi_username || !$('pBody')) return;
    const pre = { name:b.name, to:cleanPiUser(b.pi_username), city:b.city || '', amount:'', memo:'' };
    window._posterPre = pre;
    const act = document.querySelector('#pBody .p-actions');
    if(act) act.insertAdjacentHTML('beforeend', `<button class="btn btn-ghost btn-sm" onclick="posterPanel(window._posterPre)">🖼️ Accept-Pi poster</button><button class="btn btn-ghost btn-sm" onclick="copyText(payLink(window._posterPre))">🔗 Pay link</button>`);
  };
  const _req = makeRequest;
  makeRequest = function(){
    _req();
    const to = cleanPiUser(($('wrTo') || {}).value), amt = ($('wrAmt') || {}).value, memo = ($('wrMemo') || {}).value;
    const t = setInterval(function(){
      const a = document.querySelector('#wrOut .p-actions');
      if(!$('wrOut')) return clearInterval(t);
      if(a && !a.dataset.po){ a.dataset.po = 1; clearInterval(t);
        window._posterPre = { to:to, amount:amt, memo:memo, name:(posterData().name || (piUser ? piUser.username : '')) };
        a.insertAdjacentHTML('beforeend', `<button class="btn btn-ghost btn-sm" onclick="posterPanel(window._posterPre)">🖼️ Make a poster</button>`); }
    }, 150);
    setTimeout(function(){ clearInterval(t); }, 8000);
  };
})();

/* ==========================================================================
   v3.2 — Languages: core interface dictionary
   Columns: English | Arabic | Urdu | Indonesian | Hausa | French
   Anything not listed here is translated automatically online (/translate)
   and saved on the device.
   ========================================================================== */
const I18N_ROWS = [
// navigation & header
['Home','الرئيسية','ہوم','Beranda','Gida','Accueil'],
['Live','مباشر','لائیو','Langsung','Kai tsaye','En direct'],
['Explore','استكشف','دریافت کریں','Jelajahi','Bincika','Explorer'],
['Tools','الأدوات','ٹولز','Alat','Kayan aiki','Outils'],
['Profile','الملف الشخصي','پروفائل','Profil','Bayanan kai','Profil'],
['Guest','ضيف','مہمان','Tamu','Bako','Invité'],
['Search','بحث','تلاش','Cari','Nema','Rechercher'],
['Notifications','الإشعارات','اطلاعات','Notifikasi','Sanarwa','Notifications'],
['Close','إغلاق','بند کریں','Tutup','Rufe','Fermer'],
['Share','مشاركة','شیئر کریں','Bagikan','Raba','Partager'],
['Bookmark','حفظ','بک مارک','Tandai','Ajiye','Favori'],
["You're offline — showing saved content",'أنت غير متصل — نعرض المحتوى المحفوظ','آپ آف لائن ہیں — محفوظ مواد دکھایا جا رہا ہے','Anda offline — menampilkan konten tersimpan','Ba ka kan layi — ana nuna abubuwan da aka ajiye','Vous êtes hors ligne — contenu enregistré affiché'],
// splash & onboarding
['Your all-in-one Saudi companion','رفيقك الشامل في السعودية','سعودی عرب کے لیے آپ کا مکمل ساتھی','Pendamping lengkap Anda di Saudi','Abokin tafiyarka gaba ɗaya a Saudiyya','Votre compagnon tout-en-un en Arabie saoudite'],
['Live news, scores and Pi price — plus Umrah, visas, Quran and everyday tools for Saudi Arabia.','أخبار ونتائج مباشرة وسعر Pi — مع العمرة والتأشيرات والقرآن وأدوات يومية للمملكة.','لائیو خبریں، اسکور اور Pi کی قیمت — ساتھ میں عمرہ، ویزا، قرآن اور روزمرہ کے ٹولز۔','Berita, skor, dan harga Pi langsung — plus Umrah, visa, Al-Qur’an, dan alat sehari-hari untuk Arab Saudi.','Labarai, sakamakon wasanni da farashin Pi kai tsaye — da Umrah, biza, Alƙur’ani da kayan aiki na yau da kullum a Saudiyya.','Actualités, scores et prix du Pi en direct — plus Omra, visas, Coran et outils du quotidien pour l’Arabie saoudite.'],
['Sign in with Pi','تسجيل الدخول عبر Pi','Pi کے ساتھ سائن ان کریں','Masuk dengan Pi','Shiga da Pi','Se connecter avec Pi'],
['Continue as guest','المتابعة كضيف','بطور مہمان جاری رکھیں','Lanjut sebagai tamu','Ci gaba a matsayin bako','Continuer en invité'],
['Pi payments work inside the Pi Browser.','مدفوعات Pi تعمل داخل متصفح Pi.','Pi ادائیگیاں Pi براؤزر کے اندر کام کرتی ہیں۔','Pembayaran Pi berfungsi di dalam Pi Browser.','Biyan Pi yana aiki a cikin Pi Browser.','Les paiements Pi fonctionnent dans le Pi Browser.'],
['Everything you need for Saudi Arabia in one app — guides, live updates and tools.','كل ما تحتاجه في السعودية في تطبيق واحد — أدلة وتحديثات مباشرة وأدوات.','سعودی عرب کے لیے آپ کی ہر ضرورت ایک ایپ میں — گائیڈز، لائیو اپ ڈیٹس اور ٹولز۔','Semua kebutuhan Anda di Arab Saudi dalam satu aplikasi — panduan, info langsung, dan alat.','Duk abin da kake buƙata a Saudiyya a manhaja ɗaya — jagorori, sabbin labarai da kayan aiki.','Tout ce qu’il vous faut pour l’Arabie saoudite dans une seule appli — guides, infos en direct et outils.'],
['Live news with images, football scores, the live Pi price, currency rates and weather.','أخبار مباشرة بالصور، نتائج كرة القدم، سعر Pi، أسعار العملات والطقس.','تصاویر کے ساتھ لائیو خبریں، فٹبال اسکور، Pi کی قیمت، کرنسی ریٹس اور موسم۔','Berita langsung bergambar, skor sepak bola, harga Pi, kurs mata uang, dan cuaca.','Labarai tare da hotuna, sakamakon ƙwallon ƙafa, farashin Pi, farashin kuɗi da yanayi.','Actualités en images, scores de football, prix du Pi, taux de change et météo.'],
["We'll put the most useful things on your Home screen.",'سنضع أهم الأشياء على شاشتك الرئيسية.','ہم سب سے مفید چیزیں آپ کی ہوم اسکرین پر رکھیں گے۔','Kami akan menaruh hal paling berguna di layar Beranda Anda.','Za mu saka abubuwa mafi amfani a shafin farko naka.','Nous mettrons l’essentiel sur votre écran d’accueil.'],
['Pilgrim','حاج / معتمر','زائر','Jemaah','Mahajjaci','Pèlerin'],
['Visitor','زائر','سیاح','Pengunjung','Mai ziyara','Visiteur'],
['Worker','عامل','ملازم','Pekerja','Ma’aikaci','Travailleur'],
['Resident','مقيم','مقیم','Penduduk','Mazauni','Résident'],
['Next','التالي','اگلا','Lanjut','Gaba','Suivant'],
['Skip','تخطي','چھوڑیں','Lewati','Tsallake','Passer'],
['Get started','ابدأ الآن','شروع کریں','Mulai','Fara','Commencer'],
['Choose your language','اختر لغتك','اپنی زبان منتخب کریں','Pilih bahasa Anda','Zaɓi harshenka','Choisissez votre langue'],
['Language','اللغة','زبان','Bahasa','Harshe','Langue'],
// home
['Assalamu alaikum','السلام عليكم','السلام علیکم','Assalamu’alaikum','Assalamu alaikum','Assalamu alaikum'],
['Welcome to DigitalSaudi','مرحباً بك في DigitalSaudi','DigitalSaudi میں خوش آمدید','Selamat datang di DigitalSaudi','Barka da zuwa DigitalSaudi','Bienvenue sur DigitalSaudi'],
['Riyadh','الرياض','ریاض','Riyadh','Riyadh','Riyad'],
['Makkah','مكة','مکہ','Makkah','Makka','La Mecque'],
['Madinah','المدينة','مدینہ','Madinah','Madina','Médine'],
['Jeddah','جدة','جدہ','Jeddah','Jidda','Djeddah'],
['Hijri','هجري','ہجری','Hijriah','Hijira','Hégire'],
['Streak','سلسلة','تسلسل','Beruntun','Jerin kwanaki','Série'],
['Quick actions','إجراءات سريعة','فوری کام','Aksi cepat','Ayyuka masu sauri','Actions rapides'],
['Right now','الآن','ابھی','Saat ini','Yanzu','En ce moment'],
['Next prayer','الصلاة القادمة','اگلی نماز','Salat berikutnya','Sallah mai zuwa','Prochaine prière'],
['Pi price (USD)','سعر Pi (دولار)','Pi کی قیمت (USD)','Harga Pi (USD)','Farashin Pi (USD)','Prix du Pi (USD)'],
['Weather','الطقس','موسم','Cuaca','Yanayi','Météo'],
['Football','كرة القدم','فٹبال','Sepak bola','Ƙwallon ƙafa','Football'],
['Live scores','نتائج مباشرة','لائیو اسکور','Skor langsung','Sakamako kai tsaye','Scores en direct'],
['Tap to follow a team','اضغط لمتابعة فريق','کسی ٹیم کو فالو کرنے کے لیے ٹیپ کریں','Ketuk untuk mengikuti tim','Danna don bin ƙungiya','Touchez pour suivre une équipe'],
['loading…','جارٍ التحميل…','لوڈ ہو رہا ہے…','memuat…','ana lodi…','chargement…'],
['Loading…','جارٍ التحميل…','لوڈ ہو رہا ہے…','Memuat…','Ana lodi…','Chargement…'],
['Ayah of the day','آية اليوم','آج کی آیت','Ayat hari ini','Ayar yau','Verset du jour'],
['Coming up','قريباً','آنے والے','Segera','Masu zuwa','À venir'],
['Events','الفعاليات','تقریبات','Acara','Taruka','Événements'],
['Latest news','آخر الأخبار','تازہ ترین خبریں','Berita terbaru','Sabbin labarai','Dernières actualités'],
['See all','عرض الكل','سب دیکھیں','Lihat semua','Duba duka','Tout voir'],
['For you','لك','آپ کے لیے','Untuk Anda','Domin kai','Pour vous'],
['Premium','بريميوم','پریمیم','Premium','Premium','Premium'],
['DigitalSaudi Premium','DigitalSaudi بريميوم','DigitalSaudi پریمیم','DigitalSaudi Premium','DigitalSaudi Premium','DigitalSaudi Premium'],
['Planners, checklists, Hajj guide & more','مخططات وقوائم ودليل الحج والمزيد','منصوبہ ساز، چیک لسٹس، حج گائیڈ اور مزید','Perencana, daftar periksa, panduan Haji & lainnya','Tsare-tsare, jerin abubuwa, jagorar Hajji da ƙari','Planificateurs, listes, guide du Hajj et plus'],
['from 1 π','من 1 π','1 π سے','mulai 1 π','daga 1 π','dès 1 π'],
// live
['News','الأخبار','خبریں','Berita','Labarai','Actualités'],
['Scores','النتائج','اسکور','Skor','Sakamako','Scores'],
['Markets','الأسواق','مارکیٹس','Pasar','Kasuwanni','Marchés'],
['Saudi Riyal rates','أسعار الريال السعودي','سعودی ریال کے ریٹس','Kurs Riyal Saudi','Farashin Riyal na Saudiyya','Taux du riyal saoudien'],
['Convert','تحويل','تبدیل کریں','Konversi','Canza','Convertir'],
['Not financial advice.','ليست نصيحة مالية.','مالی مشورہ نہیں۔','Bukan nasihat keuangan.','Ba shawarar kuɗi ba ce.','Pas un conseil financier.'],
// explore
['Explore near me','استكشف بالقرب مني','میرے قریب دریافت کریں','Jelajahi di dekat saya','Bincika kusa da ni','Explorer autour de moi'],
['Hotels, food, mosques, hospitals, malls and more around you or any Saudi city.','فنادق ومطاعم ومساجد ومستشفيات ومراكز تسوق حولك أو في أي مدينة سعودية.','آپ کے آس پاس یا کسی بھی سعودی شہر میں ہوٹل، کھانا، مساجد، ہسپتال، مالز اور مزید۔','Hotel, makanan, masjid, rumah sakit, mal, dan lainnya di sekitar Anda atau kota Saudi mana pun.','Otal-otal, abinci, masallatai, asibitoci, kantuna da ƙari a kusa da kai ko kowane birni a Saudiyya.','Hôtels, restaurants, mosquées, hôpitaux, centres commerciaux et plus autour de vous ou dans toute ville saoudienne.'],
['Find places','ابحث عن أماكن','جگہیں تلاش کریں','Cari tempat','Nemi wurare','Trouver des lieux'],
['Plan','خطط','منصوبہ','Rencana','Tsara','Planifier'],
['Cities','المدن','شہر','Kota','Birane','Villes'],
['Experiences','تجارب','تجربات','Pengalaman','Abubuwan more rayuwa','Expériences'],
['Businesses & Pi','الأعمال و Pi','کاروبار اور Pi','Bisnis & Pi','Kasuwanci & Pi','Commerces & Pi'],
['Add yours','أضف نشاطك','اپنا شامل کریں','Tambahkan milik Anda','Ƙara naka','Ajoutez le vôtre'],
['Saudi knowledge','معرفة سعودية','سعودی معلومات','Pengetahuan Saudi','Ilimin Saudiyya','Savoir saoudien'],
['All','الكل','سب','Semua','Duka','Tout'],
['Hotels','فنادق','ہوٹل','Hotel','Otal-otal','Hôtels'],
['Food','مطاعم','کھانا','Makanan','Abinci','Restaurants'],
['Cafés','مقاهي','کیفے','Kafe','Gidajen shayi','Cafés'],
['Mosques','مساجد','مساجد','Masjid','Masallatai','Mosquées'],
['Health','صحة','صحت','Kesehatan','Lafiya','Santé'],
['Pharmacy','صيدلية','فارمیسی','Apotek','Kantin magani','Pharmacie'],
['Malls','مراكز تسوق','مالز','Mal','Kantuna','Centres commerciaux'],
['Attractions','معالم','پرکشش مقامات','Wisata','Wuraren shakatawa','Attractions'],
['Money','صرافة','پیسے','Uang','Kuɗi','Argent'],
['Fuel','وقود','پیٹرول','BBM','Mai','Carburant'],
// tools
['Next prayer in','الصلاة القادمة في','اگلی نماز','Salat berikutnya di','Sallah mai zuwa a','Prochaine prière à'],
['Islamic','إسلامي','اسلامی','Islami','Musulunci','Islam'],
['Essential services','خدمات أساسية','ضروری خدمات','Layanan penting','Muhimman ayyuka','Services essentiels'],
['Travel & documents','السفر والوثائق','سفر اور دستاویزات','Perjalanan & dokumen','Tafiya & takardu','Voyage & documents'],
['Daily life','الحياة اليومية','روزمرہ زندگی','Kehidupan sehari-hari','Rayuwar yau da kullum','Vie quotidienne'],
['Official platforms','المنصات الرسمية','سرکاری پلیٹ فارمز','Platform resmi','Dandamalin gwamnati','Plateformes officielles'],
['These are official government services. DigitalSaudi is an independent guide and is not affiliated with them.','هذه خدمات حكومية رسمية. DigitalSaudi دليل مستقل وغير تابع لها.','یہ سرکاری خدمات ہیں۔ DigitalSaudi ایک آزاد گائیڈ ہے اور ان سے وابستہ نہیں۔','Ini layanan resmi pemerintah. DigitalSaudi adalah panduan independen dan tidak berafiliasi dengannya.','Waɗannan ayyukan gwamnati ne. DigitalSaudi jagora ne mai zaman kansa, ba shi da alaƙa da su.','Ce sont des services officiels. DigitalSaudi est un guide indépendant, sans lien avec eux.'],
['Finance','المالية','مالیات','Keuangan','Kuɗi','Finances'],
['Travel tools','أدوات السفر','سفری ٹولز','Alat perjalanan','Kayan tafiya','Outils de voyage'],
['Safety','السلامة','حفاظت','Keselamatan','Tsaro','Sécurité'],
['Career','المهنة','کیریئر','Karier','Sana’a','Carrière'],
['Green Saudi','السعودية الخضراء','سرسبز سعودی','Saudi Hijau','Saudiyya Kore','Arabie verte'],
['Good to know','معلومات مفيدة','جاننا اچھا ہے','Perlu diketahui','Abin da ya kamata a sani','Bon à savoir'],
['Rules and fees change. Always confirm on the official portal before applying or paying.','القواعد والرسوم تتغير. تأكد دائماً من البوابة الرسمية قبل التقديم أو الدفع.','قوانین اور فیس بدلتی رہتی ہیں۔ درخواست یا ادائیگی سے پہلے سرکاری پورٹل پر تصدیق کریں۔','Aturan dan biaya berubah. Selalu cek portal resmi sebelum mengajukan atau membayar.','Dokoki da kuɗaɗe suna canzawa. Ka tabbatar a shafin hukuma kafin ka nema ko ka biya.','Règles et frais changent. Vérifiez toujours sur le portail officiel avant de payer.'],
['Fajr','الفجر','فجر','Subuh','Asuba','Fajr'],['Sunrise','الشروق','طلوع آفتاب','Terbit','Fitowar rana','Lever du soleil'],['Dhuhr','الظهر','ظہر','Zuhur','Azahar','Dhuhr'],['Asr','العصر','عصر','Asar','La’asar','Asr'],['Maghrib','المغرب','مغرب','Magrib','Magariba','Maghrib'],['Isha','العشاء','عشاء','Isya','Isha','Isha'],
// profile
['Not signed in','لم تسجّل الدخول','سائن ان نہیں','Belum masuk','Ba a shiga ba','Non connecté'],
['Pi & Premium','Pi وبريميوم','Pi اور پریمیم','Pi & Premium','Pi & Premium','Pi & Premium'],
['Not active','غير مفعّل','فعال نہیں','Tidak aktif','Ba ya aiki','Inactif'],
['Request & send Pi, history','طلب وإرسال Pi، السجل','Pi مانگیں اور بھیجیں، تاریخ','Minta & kirim Pi, riwayat','Nema & aika Pi, tarihi','Demander et envoyer des Pi, historique'],
['Any amount in Pi','أي مبلغ بعملة Pi','Pi میں کوئی بھی رقم','Berapa pun dalam Pi','Kowane adadi a Pi','N’importe quel montant en Pi'],
['Payments & receipts','المدفوعات والإيصالات','ادائیگیاں اور رسیدیں','Pembayaran & tanda terima','Biyan kuɗi & rasit','Paiements & reçus'],
['Badges','الأوسمة','بیجز','Lencana','Lambobin yabo','Badges'],
['My stuff','أغراضي','میری چیزیں','Milik saya','Nawa','Mes affaires'],
['Plans, countdown, checklists','خطط وعد تنازلي وقوائم','منصوبے، الٹی گنتی، چیک لسٹس','Rencana, hitung mundur, daftar','Tsare-tsare, kirgawa, jerin abubuwa','Plans, compte à rebours, listes'],
['Hotels, restaurants, spots','فنادق ومطاعم وأماكن','ہوٹل، ریستوران، مقامات','Hotel, restoran, tempat','Otal-otal, gidajen abinci, wurare','Hôtels, restaurants, lieux'],
['Saved guides','الأدلة المحفوظة','محفوظ گائیڈز','Panduan tersimpan','Jagororin da aka ajiye','Guides enregistrés'],
['Works offline','يعمل دون اتصال','آف لائن کام کرتا ہے','Bisa offline','Yana aiki ba tare da intanet ba','Fonctionne hors ligne'],
['Iqama, visa, passport','الإقامة والتأشيرة والجواز','اقامہ، ویزا، پاسپورٹ','Iqama, visa, paspor','Iqama, biza, fasfo','Iqama, visa, passeport'],
['App','التطبيق','ایپ','Aplikasi','Manhaja','Appli'],
['Choose what alerts you get','اختر التنبيهات التي تصلك','منتخب کریں کہ کون سے الرٹس ملیں','Pilih peringatan yang Anda terima','Zaɓi sanarwar da kake so','Choisissez vos alertes'],
['Theme, text size, your profile','المظهر وحجم الخط وملفك','تھیم، متن کا سائز، آپ کا پروفائل','Tema, ukuran teks, profil Anda','Jigo, girman rubutu, bayananka','Thème, taille du texte, profil'],
['Suggest or report an error','اقترح أو أبلغ عن خطأ','تجویز دیں یا غلطی بتائیں','Beri saran atau laporkan kesalahan','Ba da shawara ko kai rahoton kuskure','Suggérer ou signaler une erreur'],
['Share DigitalSaudi','شارك DigitalSaudi','DigitalSaudi شیئر کریں','Bagikan DigitalSaudi','Raba DigitalSaudi','Partager DigitalSaudi'],
['About','حول','بارے میں','Tentang','Game da','À propos'],
['Privacy policy','سياسة الخصوصية','رازداری کی پالیسی','Kebijakan privasi','Manufar sirri','Politique de confidentialité'],
['Terms of service','شروط الخدمة','سروس کی شرائط','Ketentuan layanan','Sharuɗɗan amfani','Conditions d’utilisation'],
['Sign out','تسجيل الخروج','سائن آؤٹ','Keluar','Fita','Se déconnecter'],
// settings
['Theme','المظهر','تھیم','Tema','Jigo','Thème'],
['Dark or light','داكن أو فاتح','گہرا یا ہلکا','Gelap atau terang','Duhu ko haske','Sombre ou clair'],
['Text size','حجم الخط','متن کا سائز','Ukuran teks','Girman rubutu','Taille du texte'],
['Make everything bigger','كبّر كل شيء','سب کچھ بڑا کریں','Perbesar semuanya','Ƙara girman komai','Tout agrandir'],
['I am a…','أنا…','میں ہوں…','Saya adalah…','Ni…','Je suis…'],
['Personalises your Home screen','يخصّص شاشتك الرئيسية','آپ کی ہوم اسکرین کو ذاتی بناتا ہے','Menyesuaikan layar Beranda','Yana tsara shafin farko naka','Personnalise votre accueil'],
['Favourite team','الفريق المفضل','پسندیدہ ٹیم','Tim favorit','Ƙungiyar da kake so','Équipe favorite'],
['Remove','إزالة','ہٹائیں','Hapus','Cire','Retirer'],
['Welcome tour','الجولة الترحيبية','خوش آمدید ٹور','Tur sambutan','Rangadin maraba','Visite d’accueil'],
['See the intro again','شاهد المقدمة مجدداً','تعارف دوبارہ دیکھیں','Lihat intro lagi','Sake kallon gabatarwa','Revoir l’introduction'],
['Replay','إعادة','دوبارہ','Ulangi','Maimaita','Rejouer'],
['Clear saved data','مسح البيانات المحفوظة','محفوظ ڈیٹا صاف کریں','Hapus data tersimpan','Share bayanan da aka ajiye','Effacer les données'],
['Checklists, bookmarks, cache','القوائم والمحفوظات والذاكرة المؤقتة','چیک لسٹس، بک مارکس، کیش','Daftar, penanda, cache','Jerin abubuwa, alamomi, ma’aji','Listes, favoris, cache'],
['Clear','مسح','صاف کریں','Hapus','Share','Effacer'],
['App language','لغة التطبيق','ایپ کی زبان','Bahasa aplikasi','Harshen manhaja','Langue de l’appli'],
['Translate guides automatically','ترجمة الأدلة تلقائياً','گائیڈز کا خودکار ترجمہ','Terjemahkan panduan otomatis','Fassara jagorori kai tsaye','Traduire les guides automatiquement'],
['Uses the internet the first time; saved on your device after that','يستخدم الإنترنت في المرة الأولى ثم يُحفظ على جهازك','پہلی بار انٹرنیٹ استعمال ہوتا ہے، پھر آپ کے آلے پر محفوظ','Butuh internet pertama kali; lalu tersimpan di perangkat','Yana amfani da intanet a karon farko; sannan a ajiye a wayarka','Utilise Internet la première fois, puis enregistré sur l’appareil'],
['Translating…','جارٍ الترجمة…','ترجمہ ہو رہا ہے…','Menerjemahkan…','Ana fassara…','Traduction…'],
['Language changed','تم تغيير اللغة','زبان تبدیل ہو گئی','Bahasa diubah','An canza harshe','Langue modifiée'],
// common buttons & words
['Back','رجوع','واپس','Kembali','Koma','Retour'],
['Save','حفظ','محفوظ کریں','Simpan','Ajiye','Enregistrer'],
['Cancel','إلغاء','منسوخ کریں','Batal','Soke','Annuler'],
['Done','تم','ہو گیا','Selesai','An gama','Terminé'],
['Copy','نسخ','کاپی','Salin','Kwafa','Copier'],
['Copied','تم النسخ','کاپی ہو گیا','Disalin','An kwafa','Copié'],
['Try again','حاول مجدداً','دوبارہ کوشش کریں','Coba lagi','Sake gwadawa','Réessayer'],
['Call','اتصال','کال','Telepon','Kira','Appeler'],
['Directions','الاتجاهات','راستہ','Petunjuk arah','Hanya','Itinéraire'],
['Website','الموقع','ویب سائٹ','Situs web','Shafin yanar gizo','Site web'],
['Phone','الهاتف','فون','Telepon','Waya','Téléphone'],
['Address','العنوان','پتہ','Alamat','Adireshi','Adresse'],
['Open','مفتوح','کھلا','Buka','A buɗe','Ouvert'],
['Closed','مغلق','بند','Tutup','A rufe','Fermé'],
['Today','اليوم','آج','Hari ini','Yau','Aujourd’hui'],
['Tomorrow','غداً','کل','Besok','Gobe','Demain'],
['Free','مجاني','مفت','Gratis','Kyauta','Gratuit'],
['Report an error','أبلغ عن خطأ','غلطی کی اطلاع دیں','Laporkan kesalahan','Kai rahoton kuskure','Signaler une erreur'],
['Last reviewed','آخر مراجعة','آخری جائزہ','Terakhir ditinjau','Bita ta ƙarshe','Dernière révision'],
['Accepts Pi','يقبل Pi','Pi قبول کرتا ہے','Menerima Pi','Yana karɓar Pi','Accepte le Pi'],
['Pi merchants','تجّار Pi','Pi مرچنٹس','Pedagang Pi','’Yan kasuwar Pi','Commerçants Pi'],
['Merchants','التجّار','مرچنٹس','Pedagang','’Yan kasuwa','Commerçants'],
['Pi map','خريطة Pi','Pi نقشہ','Peta Pi','Taswirar Pi','Carte Pi'],
['Stay safe with Pi','ابقَ آمناً مع Pi','Pi کے ساتھ محفوظ رہیں','Tetap aman dengan Pi','Ka kasance lafiya da Pi','Restez en sécurité avec Pi'],
['Request','طلب','درخواست','Minta','Nema','Demander'],
['Send','إرسال','بھیجیں','Kirim','Aika','Envoyer'],
['History','السجل','تاریخ','Riwayat','Tarihi','Historique'],
['Ask anything…','اسأل أي شيء…','کچھ بھی پوچھیں…','Tanya apa saja…','Tambayi komai…','Demandez n’importe quoi…'],
// META titles & short labels
['Visas & residency','التأشيرات والإقامة','ویزا اور رہائش','Visa & izin tinggal','Biza & zama','Visas & résidence'],
['Government e-services','الخدمات الحكومية الإلكترونية','سرکاری ای-سروسز','Layanan e-pemerintah','Ayyukan gwamnati ta intanet','Services publics en ligne'],
['Umrah','العمرة','عمرہ','Umrah','Umrah','Omra'],['Umrah step by step','العمرة خطوة بخطوة','عمرہ قدم بہ قدم','Umrah langkah demi langkah','Umrah mataki-mataki','La Omra étape par étape'],
['Hajj','الحج','حج','Haji','Hajji','Hajj'],['Hajj day by day','الحج يوماً بيوم','حج دن بہ دن','Haji hari demi hari','Hajji kowace rana','Le Hajj jour par jour'],
['Visiting Madinah','زيارة المدينة','مدینہ کی زیارت','Ziarah Madinah','Ziyarar Madina','Visiter Médine'],
['Packing','التجهيز','سامان','Barang bawaan','Kayan tafiya','Bagages'],['Umrah packing checklist','قائمة تجهيز العمرة','عمرہ سامان کی فہرست','Daftar barang Umrah','Jerin kayan Umrah','Liste de bagages Omra'],
['Documents','الوثائق','دستاویزات','Dokumen','Takardu','Documents'],['Document checklist','قائمة الوثائق','دستاویزات کی فہرست','Daftar dokumen','Jerin takardu','Liste des documents'],
['Trip budget','ميزانية الرحلة','سفر کا بجٹ','Anggaran perjalanan','Kasafin tafiya','Budget du voyage'],['Trip budget planner','مخطط ميزانية الرحلة','سفر بجٹ پلانر','Perencana anggaran perjalanan','Mai tsara kasafin tafiya','Planificateur de budget'],
['7-day plan','خطة 7 أيام','7 دن کا منصوبہ','Rencana 7 hari','Shirin kwana 7','Plan de 7 jours'],['7-day first-trip plan','خطة أول رحلة لـ 7 أيام','پہلے سفر کا 7 دن کا منصوبہ','Rencana perjalanan pertama 7 hari','Shirin tafiya ta farko na kwana 7','Plan de premier voyage en 7 jours'],
['Arrival','الوصول','آمد','Kedatangan','Isowa','Arrivée'],['Arrival checklist','قائمة الوصول','آمد کی فہرست','Daftar kedatangan','Jerin isowa','Liste d’arrivée'],
['Trains','القطارات','ٹرینیں','Kereta','Jiragen ƙasa','Trains'],['Trains & airports','القطارات والمطارات','ٹرینیں اور ہوائی اڈے','Kereta & bandara','Jiragen ƙasa & filayen jirgi','Trains & aéroports'],
['Reminders','التذكيرات','یاد دہانیاں','Pengingat','Tunatarwa','Rappels'],['Expiry reminders','تذكيرات الانتهاء','میعاد ختم ہونے کی یاد دہانی','Pengingat kedaluwarsa','Tunatarwar ƙarewa','Rappels d’expiration'],
['SOS card','بطاقة الطوارئ','SOS کارڈ','Kartu SOS','Katin SOS','Carte SOS'],['Emergency card','بطاقة الطوارئ','ایمرجنسی کارڈ','Kartu darurat','Katin gaggawa','Carte d’urgence'],
['Emergency numbers','أرقام الطوارئ','ایمرجنسی نمبرز','Nomor darurat','Lambobin gaggawa','Numéros d’urgence'],
['Culture & etiquette','الثقافة والآداب','ثقافت اور آداب','Budaya & etiket','Al’ada & ladabi','Culture & savoir-vivre'],
['Climate & best time','المناخ وأفضل وقت','موسم اور بہترین وقت','Iklim & waktu terbaik','Yanayi & lokaci mafi kyau','Climat & meilleure période'],
['Currency','العملة','کرنسی','Mata uang','Kuɗi','Devises'],['Currency converter','محوّل العملات','کرنسی کنورٹر','Konverter mata uang','Mai canza kuɗi','Convertisseur de devises'],
['VAT','ضريبة القيمة المضافة','VAT','PPN','VAT','TVA'],['VAT calculator','حاسبة الضريبة','VAT کیلکولیٹر','Kalkulator PPN','Lissafin VAT','Calculateur de TVA'],
['Split bill','تقسيم الفاتورة','بل تقسیم','Bagi tagihan','Raba lissafi','Partager l’addition'],['Bill splitter','مقسّم الفاتورة','بل تقسیم کار','Pembagi tagihan','Mai raba lissafi','Partage d’addition'],
['Units','الوحدات','اکائیاں','Satuan','Ma’auni','Unités'],['Unit converter','محوّل الوحدات','یونٹ کنورٹر','Konverter satuan','Mai canza ma’auni','Convertisseur d’unités'],
['Dictionary','القاموس','لغت','Kamus','Ƙamus','Dictionnaire'],['Arabic dictionary','قاموس عربي','عربی لغت','Kamus Arab','Ƙamus na Larabci','Dictionnaire arabe'],
['Time zones','المناطق الزمنية','ٹائم زونز','Zona waktu','Yankunan lokaci','Fuseaux horaires'],['Time difference','فرق التوقيت','وقت کا فرق','Selisih waktu','Bambancin lokaci','Décalage horaire'],
['Quran','القرآن','قرآن','Al-Qur’an','Alƙur’ani','Coran'],['Duas','الأدعية','دعائیں','Doa','Addu’o’i','Douas'],['Tasbih','التسبيح','تسبیح','Tasbih','Tasbihi','Tasbih'],
['Qibla','القبلة','قبلہ','Kiblat','Alƙibla','Qibla'],['Qibla finder','محدد القبلة','قبلہ نما','Pencari kiblat','Mai nemo Alƙibla','Boussole Qibla'],
['Calendar','التقويم','کیلنڈر','Kalender','Kalanda','Calendrier'],['Islamic calendar','التقويم الهجري','اسلامی کیلنڈر','Kalender Islam','Kalandar Musulunci','Calendrier islamique'],
['Zakat','الزكاة','زکوٰۃ','Zakat','Zakka','Zakat'],['Zakat calculator','حاسبة الزكاة','زکوٰۃ کیلکولیٹر','Kalkulator zakat','Lissafin Zakka','Calculateur de zakat'],
['Support DigitalSaudi','ادعم DigitalSaudi','DigitalSaudi کی مدد کریں','Dukung DigitalSaudi','Tallafa wa DigitalSaudi','Soutenir DigitalSaudi'],
['Bookmarks','المحفوظات','بک مارکس','Penanda','Alamomi','Favoris'],['Recently viewed','شوهدت مؤخراً','حال ہی میں دیکھا','Baru dilihat','Waɗanda aka duba kwanan nan','Vus récemment'],
['Settings','الإعدادات','ترتیبات','Pengaturan','Saituna','Paramètres'],['Feedback','ملاحظات','رائے','Masukan','Ra’ayi','Avis'],['About DigitalSaudi','حول DigitalSaudi','DigitalSaudi کے بارے میں','Tentang DigitalSaudi','Game da DigitalSaudi','À propos de DigitalSaudi'],
['Saved checklists','القوائم المحفوظة','محفوظ فہرستیں','Daftar tersimpan','Jerin da aka ajiye','Listes enregistrées'],
['Carbon calculator','حاسبة الكربون','کاربن کیلکولیٹر','Kalkulator karbon','Lissafin carbon','Calculateur carbone'],['Water-saving calculator','حاسبة توفير المياه','پانی بچت کیلکولیٹر','Kalkulator hemat air','Lissafin tanadin ruwa','Calculateur d’économie d’eau'],
['Energy & bill calculator','حاسبة الطاقة والفاتورة','توانائی اور بل کیلکولیٹر','Kalkulator energi & tagihan','Lissafin wuta & kuɗi','Calculateur d’énergie et facture'],['Recycling guide','دليل إعادة التدوير','ری سائیکلنگ گائیڈ','Panduan daur ulang','Jagorar sake sarrafawa','Guide du recyclage'],
['Sustainable living','الحياة المستدامة','پائیدار زندگی','Hidup berkelanjutan','Rayuwa mai ɗorewa','Vie durable'],['Climate education','التوعية المناخية','موسمیاتی تعلیم','Edukasi iklim','Ilimin yanayi','Éducation climatique'],['Green technology','التقنية الخضراء','سبز ٹیکنالوجی','Teknologi hijau','Fasahar muhalli','Technologie verte'],
['Near me','بالقرب مني','میرے قریب','Di dekat saya','Kusa da ni','Autour de moi'],['Hotels & stays','الفنادق والإقامة','ہوٹل اور قیام','Hotel & penginapan','Otal-otal & masauki','Hôtels & séjours'],['Restaurants & cafés','المطاعم والمقاهي','ریستوران اور کیفے','Restoran & kafe','Gidajen abinci & shayi','Restaurants & cafés'],
['Hotel cost','تكلفة الفندق','ہوٹل کی لاگت','Biaya hotel','Kuɗin otal','Coût de l’hôtel'],['Hotel cost calculator','حاسبة تكلفة الفندق','ہوٹل لاگت کیلکولیٹر','Kalkulator biaya hotel','Lissafin kuɗin otal','Calculateur de coût d’hôtel'],
['Transport','المواصلات','ٹرانسپورٹ','Transportasi','Sufuri','Transports'],['Transport planner','مخطط المواصلات','ٹرانسپورٹ پلانر','Perencana transportasi','Mai tsara sufuri','Planificateur de trajets'],
['My trips','رحلاتي','میرے سفر','Perjalanan saya','Tafiye-tafiyena','Mes voyages'],['My Saudi Trips','رحلاتي في السعودية','میرے سعودی سفر','Perjalanan Saudi saya','Tafiye-tafiyena a Saudiyya','Mes voyages en Arabie'],
['Businesses','الأعمال','کاروبار','Bisnis','Kasuwanci','Commerces'],['Business directory','دليل الأعمال','کاروباری ڈائریکٹری','Direktori bisnis','Jerin kasuwanci','Annuaire des commerces'],
['Pi Hub','مركز Pi','Pi ہب','Pusat Pi','Cibiyar Pi','Espace Pi'],['Add business','أضف نشاطاً','کاروبار شامل کریں','Tambah bisnis','Ƙara kasuwanci','Ajouter un commerce'],['Add your business','أضف نشاطك التجاري','اپنا کاروبار شامل کریں','Tambahkan bisnis Anda','Ƙara kasuwancinka','Ajoutez votre commerce'],
['Pi poster','ملصق Pi','Pi پوسٹر','Poster Pi','Fastar Pi','Affiche Pi'],['Accept Pi poster','ملصق «نقبل Pi»','Pi قبول کرنے کا پوسٹر','Poster Terima Pi','Fastar karɓar Pi','Affiche « Pi accepté »'],
['Career hub','مركز المهن','کیریئر ہب','Pusat karier','Cibiyar sana’a','Espace carrière'],['CV','السيرة الذاتية','سی وی','CV','CV','CV'],['CV builder','منشئ السيرة الذاتية','سی وی بلڈر','Pembuat CV','Mai ƙirƙirar CV','Créateur de CV'],
['Salary','الراتب','تنخواہ','Gaji','Albashi','Salaire'],['Salary calculator','حاسبة الراتب','تنخواہ کیلکولیٹر','Kalkulator gaji','Lissafin albashi','Calculateur de salaire'],
['Gratuity','مكافأة نهاية الخدمة','گریجویٹی','Pesangon','Garatuti','Indemnité'],['End-of-service gratuity','مكافأة نهاية الخدمة','اختتام ملازمت گریجویٹی','Pesangon akhir masa kerja','Garatutin ƙarshen aiki','Indemnité de fin de service'],
['Skills','المهارات','مہارتیں','Keterampilan','Ƙwarewa','Compétences'],['Skills assessment','تقييم المهارات','مہارتوں کا جائزہ','Penilaian keterampilan','Gwajin ƙwarewa','Bilan de compétences'],
['Safety center','مركز السلامة','حفاظتی مرکز','Pusat keselamatan','Cibiyar tsaro','Centre de sécurité'],['Help now','مساعدة فورية','ابھی مدد','Bantuan sekarang','Taimako yanzu','Aide immédiate'],['What should I do?','ماذا أفعل؟','مجھے کیا کرنا چاہیے؟','Apa yang harus saya lakukan?','Me zan yi?','Que dois-je faire ?'],
['Notification settings','إعدادات الإشعارات','اطلاعات کی ترتیبات','Pengaturan notifikasi','Saitunan sanarwa','Réglages des notifications'],['Saved places','الأماكن المحفوظة','محفوظ مقامات','Tempat tersimpan','Wuraren da aka ajiye','Lieux enregistrés'],
['Quiz','اختبار','کوئز','Kuis','Tambayoyi','Quiz'],['Saudi quiz','اختبار السعودية','سعودی کوئز','Kuis Saudi','Tambayoyin Saudiyya','Quiz saoudien'],
['Saudi AI','الذكاء السعودي','سعودی AI','AI Saudi','AI na Saudiyya','IA saoudienne'],['Saudi AI assistant','المساعد الذكي السعودي','سعودی AI اسسٹنٹ','Asisten AI Saudi','Mataimakin AI na Saudiyya','Assistant IA saoudien'],
['Wallet','المحفظة','والٹ','Dompet','Walat','Portefeuille'],['Pi Wallet','محفظة Pi','Pi والٹ','Dompet Pi','Walat Pi','Portefeuille Pi'],
// poster studio
['Print it. Stick it. Share it.','اطبعه. ألصقه. شاركه.','پرنٹ کریں۔ چسپاں کریں۔ شیئر کریں۔','Cetak. Tempel. Bagikan.','Buga shi. Manna shi. Raba shi.','Imprimez. Collez. Partagez.'],
['Create my poster','أنشئ ملصقي','میرا پوسٹر بنائیں','Buat poster saya','Ƙirƙiri fastata','Créer mon affiche'],
['Update poster','تحديث الملصق','پوسٹر اپ ڈیٹ کریں','Perbarui poster','Sabunta fasta','Mettre à jour'],
['Share image','مشاركة الصورة','تصویر شیئر کریں','Bagikan gambar','Raba hoto','Partager l’image'],
['Save PNG','حفظ PNG','PNG محفوظ کریں','Simpan PNG','Ajiye PNG','Enregistrer PNG'],
['Print PDF','طباعة PDF','PDF پرنٹ کریں','Cetak PDF','Buga PDF','Imprimer PDF'],
['Share pay link','مشاركة رابط الدفع','ادائیگی لنک شیئر کریں','Bagikan tautan bayar','Raba hanyar biya','Partager le lien de paiement'],
['Copy link','نسخ الرابط','لنک کاپی کریں','Salin tautan','Kwafi hanya','Copier le lien'],
['Style','النمط','انداز','Gaya','Salo','Style'],['Format','الصيغة','فارمیٹ','Format','Tsari','Format'],
['QR code opens','رمز QR يفتح','QR کوڈ کھولتا ہے','Kode QR membuka','Lambar QR tana buɗe','Le QR code ouvre'],
['Business or seller name *','اسم النشاط أو البائع *','کاروبار یا فروخت کنندہ کا نام *','Nama bisnis atau penjual *','Sunan kasuwanci ko mai sayarwa *','Nom du commerce ou vendeur *'],
['Pi username or wallet address *','اسم مستخدم Pi أو عنوان المحفظة *','Pi یوزرنیم یا والٹ ایڈریس *','Nama pengguna Pi atau alamat dompet *','Sunan Pi ko adireshin walat *','Nom d’utilisateur Pi ou adresse *'],
['Fixed price in π (optional)','سعر ثابت بعملة π (اختياري)','مقررہ قیمت π میں (اختیاری)','Harga tetap dalam π (opsional)','Ƙayyadadden farashi a π (zaɓi)','Prix fixe en π (facultatif)'],
['City (optional)','المدينة (اختياري)','شہر (اختیاری)','Kota (opsional)','Birni (zaɓi)','Ville (facultatif)'],
['Short note (optional)','ملاحظة قصيرة (اختياري)','مختصر نوٹ (اختیاری)','Catatan singkat (opsional)','Gajeren bayani (zaɓi)','Courte note (facultatif)'],
['Get your "Pi accepted here" poster','احصل على ملصق «نقبل Pi»','اپنا "Pi یہاں قبول ہے" پوسٹر حاصل کریں','Dapatkan poster "Pi diterima di sini"','Sami fastar "Ana karɓar Pi a nan"','Obtenez votre affiche « Pi accepté ici »'],
['Accept Pi at your business','اقبل Pi في نشاطك','اپنے کاروبار میں Pi قبول کریں','Terima Pi di bisnis Anda','Karɓi Pi a kasuwancinka','Acceptez le Pi dans votre commerce']
];

/* v4.4 — onboarding & welcome words (loaded with the main dictionary so they work instantly and offline) */
I18N_ROWS.push(
    ['Everything Saudi.','كل ما يخص السعودية.','سعودی عرب کی ہر چیز۔','Semua tentang Saudi.','Komai na Saudiyya.','Tout sur l’Arabie saoudite.'],
    ['One Digital Experience.','في تجربة رقمية واحدة.','ایک ڈیجیٹل تجربے میں۔','Dalam satu pengalaman digital.','A wuri guda na zamani.','Une seule expérience numérique.'],
    ['Explore Saudi Arabia with everything you need in one place.','استكشف المملكة مع كل ما تحتاجه في مكان واحد.','سعودی عرب کو دریافت کریں — ہر ضرورت ایک ہی جگہ۔','Jelajahi Arab Saudi dengan semua kebutuhan di satu tempat.','Bincika Saudiyya da duk abin da kake buƙata a wuri ɗaya.','Explorez l’Arabie saoudite avec tout ce qu’il vous faut au même endroit.'],
    ['Discover cities & destinations','اكتشف المدن والوجهات','شہر اور مقامات دریافت کریں','Temukan kota & destinasi','Gano birane & wuraren ziyara','Découvrez villes et destinations'],
    ['Find hotels, restaurants & places','ابحث عن الفنادق والمطاعم والأماكن','ہوٹل، ریستوران اور مقامات تلاش کریں','Cari hotel, restoran & tempat','Nemo otal-otal, gidajen abinci & wurare','Trouvez hôtels, restaurants et lieux'],
    ['Explore pilgrimage & cultural experiences','استكشف تجارب الحج والعمرة والثقافة','حج، عمرہ اور ثقافتی تجربات','Jelajahi ibadah haji, umrah & budaya','Bincika aikin Hajji, Umrah & al’adu','Explorez pèlerinage et culture'],
    ['Find what’s near you','اعثر على ما حولك','اپنے قریب کی چیزیں تلاش کریں','Temukan yang ada di dekat Anda','Nemo abin da ke kusa da kai','Trouvez ce qui est près de vous'],
    ['Saudi,','السعودية،','سعودی عرب،','Saudi,','Saudiyya,','L’Arabie,'],
    ['Right Now.','الآن.','ابھی۔','Saat ini.','Yanzu.','en ce moment.'],
    ['Stay connected to what matters, wherever you are.','ابقَ على اطلاع بما يهمك أينما كنت.','جہاں بھی ہوں، اہم باتوں سے جڑے رہیں۔','Tetap terhubung dengan hal penting, di mana pun Anda berada.','Ka kasance da labarin abin da ke da muhimmanci, a duk inda kake.','Restez informé de l’essentiel, où que vous soyez.'],
    ['Live Saudi & world news','أخبار السعودية والعالم مباشرة','سعودی اور عالمی خبریں لائیو','Berita Saudi & dunia terkini','Labaran Saudiyya & duniya kai tsaye','Actualités saoudiennes et mondiales en direct'],
    ['Live scores & sports','نتائج المباريات والرياضة مباشرة','لائیو اسکور اور کھیل','Skor langsung & olahraga','Sakamakon wasanni kai tsaye','Scores et sports en direct'],
    ['Weather across Saudi cities','الطقس في مدن المملكة','سعودی شہروں کا موسم','Cuaca di kota-kota Saudi','Yanayi a biranen Saudiyya','Météo des villes saoudiennes'],
    ['Events & important dates','الفعاليات والمناسبات المهمة','تقریبات اور اہم تاریخیں','Acara & tanggal penting','Taruka & muhimman ranaku','Événements et dates importantes'],
    ['Everything You Need,','كل ما تحتاجه،','آپ کی ہر ضرورت،','Semua yang Anda butuhkan,','Duk abin da kake buƙata,','Tout ce qu’il vous faut,'],
    ['Within Reach.','في متناول يدك.','آپ کی پہنچ میں۔','dalam jangkauan.','a hannunka.','à portée de main.'],
    ['Powerful tools designed for everyday life in Saudi Arabia.','أدوات قوية مصممة للحياة اليومية في السعودية.','سعودی عرب میں روزمرہ زندگی کے لیے طاقتور ٹولز۔','Alat canggih untuk kehidupan sehari-hari di Arab Saudi.','Kayan aiki masu ƙarfi don rayuwar yau da kullum a Saudiyya.','Des outils puissants pour la vie quotidienne en Arabie saoudite.'],
    ['Visa, residency & travel guides','أدلة التأشيرة والإقامة والسفر','ویزا، رہائش اور سفری رہنما','Panduan visa, izin tinggal & perjalanan','Jagororin biza, zama & tafiya','Guides visa, résidence et voyage'],
    ['Currency, salary & financial tools','أدوات العملات والرواتب والمال','کرنسی، تنخواہ اور مالی ٹولز','Alat mata uang, gaji & keuangan','Kayan aikin kuɗi, albashi & tattalin arziki','Outils devises, salaire et finances'],
    ['Transport, emergency & daily-life tools','أدوات المواصلات والطوارئ والحياة اليومية','ٹرانسپورٹ، ایمرجنسی اور روزمرہ ٹولز','Alat transportasi, darurat & harian','Kayan sufuri, gaggawa & rayuwar yau da kullum','Outils transport, urgences et quotidien'],
    ['AI assistance for Saudi life','مساعد ذكي للحياة في السعودية','سعودی زندگی کے لیے AI مدد','Asisten AI untuk hidup di Saudi','Taimakon AI don rayuwa a Saudiyya','Assistance IA pour la vie en Arabie'],
    ['Your Saudi.','سعوديتك.','آپ کا سعودی عرب۔','Saudi Anda.','Saudiyyarka.','Votre Arabie.'],
    ['Your Way.','على طريقتك.','آپ کے انداز میں۔','Dengan cara Anda.','Yadda kake so.','À votre façon.'],
    ['Personalize your experience and access powerful services wherever you go.','خصّص تجربتك واستخدم خدمات قوية أينما ذهبت.','اپنا تجربہ ذاتی بنائیں اور ہر جگہ طاقتور خدمات استعمال کریں۔','Sesuaikan pengalaman Anda dan akses layanan unggulan di mana saja.','Tsara yadda kake so kuma ka sami ayyuka masu ƙarfi a duk inda ka je.','Personnalisez votre expérience et accédez à des services puissants partout.'],
    ['Sign in with Pi & make Pi payments','سجّل الدخول عبر Pi وادفع بعملة Pi','Pi کے ساتھ سائن ان اور Pi ادائیگیاں','Masuk dengan Pi & bayar dengan Pi','Shiga da Pi & biya da Pi','Connexion et paiements avec Pi'],
    ['Save places, trips & useful content','احفظ الأماكن والرحلات والمحتوى المفيد','مقامات، سفر اور مفید مواد محفوظ کریں','Simpan tempat, perjalanan & konten berguna','Ajiye wurare, tafiye-tafiye & abubuwa masu amfani','Enregistrez lieux, voyages et contenus utiles'],
    ['Essential tools available offline','أدوات أساسية تعمل دون اتصال','ضروری ٹولز آف لائن بھی دستیاب','Alat penting tersedia offline','Muhimman kayan aiki ba tare da intanet ba','Outils essentiels disponibles hors ligne'],
    ['Get Started','ابدأ الآن','شروع کریں','Mulai','Fara','Commencer'],
    ['Continue as Guest or sign in with Pi on the next screen.','تابع كضيف أو سجّل الدخول عبر Pi في الشاشة التالية.','اگلی اسکرین پر بطور مہمان جاری رکھیں یا Pi سے سائن ان کریں۔','Lanjut sebagai tamu atau masuk dengan Pi di layar berikutnya.','Ci gaba a matsayin bako ko shiga da Pi a shafi na gaba.','Continuez en invité ou connectez-vous avec Pi à l’écran suivant.'],
    ['Welcome to','مرحباً بك في','خوش آمدید','Selamat datang di','Barka da zuwa','Bienvenue sur'],
    ['Your Saudi Digital Companion','رفيقك الرقمي في السعودية','سعودی عرب میں آپ کا ڈیجیٹل ساتھی','Pendamping digital Anda di Saudi','Abokinka na zamani a Saudiyya','Votre compagnon numérique en Arabie saoudite'],
    ['Guides, live updates and tools for visitors, pilgrims, workers and residents.','أدلة وتحديثات مباشرة وأدوات للزوار والمعتمرين والعاملين والمقيمين.','زائرین، حاجیوں، ملازمین اور رہائشیوں کے لیے گائیڈز، لائیو اپ ڈیٹس اور ٹولز۔','Panduan, info terkini, dan alat untuk pengunjung, jemaah, pekerja, dan penduduk.','Jagorori, sabbin labarai da kayan aiki ga baƙi, mahajjata, ma’aikata da mazauna.','Guides, infos en direct et outils pour visiteurs, pèlerins, travailleurs et résidents.'],
    ['Umrah, Hajj & Madinah step-by-step guides','أدلة العمرة والحج والمدينة خطوة بخطوة','عمرہ، حج اور مدینہ کے مرحلہ وار گائیڈ','Panduan Umrah, Haji & Madinah langkah demi langkah','Jagorar Umrah, Hajji & Madina mataki-mataki','Guides Omra, Hajj et Médine pas à pas'],
    ['Places near you in 12 categories','أماكن قريبة منك في 12 فئة','آپ کے قریب مقامات، 12 زمروں میں','Tempat di dekat Anda dalam 12 kategori','Wurare kusa da kai a rukuni 12','Lieux près de vous en 12 catégories'],
    ['8 city guides & 8 Saudi experiences','8 أدلة مدن و8 تجارب سعودية','8 شہری گائیڈ اور 8 سعودی تجربات','8 panduan kota & 8 pengalaman Saudi','Jagororin birane 8 & abubuwan more rayuwa 8','8 guides de villes et 8 expériences saoudiennes'],
    ['Trip planner, transport & hotel cost tools','مخطط الرحلات والمواصلات وحاسبة تكلفة الفندق','سفر پلانر، ٹرانسپورٹ اور ہوٹل لاگت ٹولز','Perencana perjalanan, transportasi & biaya hotel','Mai tsara tafiya, sufuri & lissafin kuɗin otal','Planificateur de voyage, transports et coût d’hôtel'],
    ['Live information that updates by itself.','معلومات مباشرة تتحدّث تلقائياً.','لائیو معلومات جو خود بخود اپ ڈیٹ ہوتی ہیں۔','Informasi langsung yang diperbarui otomatis.','Bayanai kai tsaye da ke sabunta kansu.','Des infos en direct qui se mettent à jour toutes seules.'],
    ['Live news in 7 categories, with images','أخبار مباشرة في 7 فئات مع الصور','7 زمروں میں تصاویر کے ساتھ لائیو خبریں','Berita langsung dalam 7 kategori, dengan gambar','Labarai kai tsaye a rukuni 7, tare da hotuna','Actualités en direct en 7 catégories, avec images'],
    ['Live scores from 12 football leagues','نتائج مباشرة من 12 دوري كرة قدم','12 فٹبال لیگز کے لائیو اسکور','Skor langsung dari 12 liga sepak bola','Sakamako kai tsaye daga gasar ƙwallon ƙafa 12','Scores en direct de 12 championnats de football'],
    ['Live Pi price & Saudi riyal exchange rates','سعر Pi المباشر وأسعار صرف الريال','Pi کی لائیو قیمت اور ریال کے ایکسچینج ریٹ','Harga Pi langsung & kurs riyal Saudi','Farashin Pi kai tsaye & canjin riyal','Prix du Pi en direct et taux du riyal'],
    ['Weather for 16 cities, events & Islamic dates','الطقس في 16 مدينة والفعاليات والمناسبات الإسلامية','16 شہروں کا موسم، تقریبات اور اسلامی تاریخیں','Cuaca 16 kota, acara & tanggal Islam','Yanayin birane 16, taruka & ranakun Musulunci','Météo de 16 villes, événements et dates islamiques'],
    ['Practical tools for faith, travel, money and work in Saudi Arabia.','أدوات عملية للعبادة والسفر والمال والعمل في السعودية.','سعودی عرب میں عبادت، سفر، پیسے اور کام کے لیے عملی ٹولز۔','Alat praktis untuk ibadah, perjalanan, keuangan, dan kerja di Arab Saudi.','Kayan aiki don ibada, tafiya, kuɗi da aiki a Saudiyya.','Des outils pratiques pour la foi, le voyage, l’argent et le travail en Arabie saoudite.'],
    ['Prayer times, Qibla, Quran & duas','أوقات الصلاة والقبلة والقرآن والأدعية','نماز کے اوقات، قبلہ، قرآن اور دعائیں','Waktu salat, kiblat, Al-Qur’an & doa','Lokutan sallah, Alƙibla, Alƙur’ani & addu’o’i','Heures de prière, Qibla, Coran et douas'],
    ['Visa, Iqama & e-service guides','أدلة التأشيرة والإقامة والخدمات الإلكترونية','ویزا، اقامہ اور ای-سروس گائیڈز','Panduan visa, Iqama & layanan elektronik','Jagororin biza, Iqama & ayyukan intanet','Guides visa, Iqama et services en ligne'],
    ['Currency, VAT, salary, gratuity & zakat tools','أدوات العملات والضريبة والراتب ومكافأة نهاية الخدمة والزكاة','کرنسی، VAT، تنخواہ، گریجویٹی اور زکوٰۃ ٹولز','Alat mata uang, PPN, gaji, pesangon & zakat','Kayan kuɗi, VAT, albashi, garatuti & zakka','Outils devises, TVA, salaire, indemnité et zakat'],
    ['Saudi AI & Arabic dictionary with audio','الذكاء السعودي وقاموس عربي بالصوت','سعودی AI اور آواز کے ساتھ عربی لغت','AI Saudi & kamus Arab dengan audio','AI na Saudiyya & ƙamus na Larabci da sauti','IA saoudienne et dictionnaire arabe audio'],
    ['Sign in with Pi for Premium and payments — or continue as a guest.','سجّل الدخول عبر Pi للاشتراك والمدفوعات — أو تابع كضيف.','پریمیم اور ادائیگیوں کے لیے Pi سے سائن ان کریں — یا بطور مہمان جاری رکھیں۔','Masuk dengan Pi untuk Premium dan pembayaran — atau lanjut sebagai tamu.','Shiga da Pi don Premium da biyan kuɗi — ko ci gaba a matsayin bako.','Connectez-vous avec Pi pour Premium et les paiements — ou continuez en invité.'],
    ['Sign in with Pi · Premium from 1 π','تسجيل الدخول عبر Pi · الاشتراك من 1 π','Pi سے سائن ان · پریمیم 1 π سے','Masuk dengan Pi · Premium mulai 1 π','Shiga da Pi · Premium daga 1 π','Connexion Pi · Premium dès 1 π'],
    ['Accept Pi: business listing & QR poster','اقبل Pi: إدراج نشاطك وملصق QR','Pi قبول کریں: کاروباری لسٹنگ اور QR پوسٹر','Terima Pi: daftar bisnis & poster QR','Karɓi Pi: rajistar kasuwanci & fastar QR','Acceptez le Pi : annuaire et affiche QR'],
    ['Save places & trips — key tools work offline','احفظ الأماكن والرحلات — والأدوات الأساسية تعمل دون اتصال','مقامات اور سفر محفوظ کریں — اہم ٹولز آف لائن بھی','Simpan tempat & perjalanan — alat utama bisa offline','Ajiye wurare & tafiye-tafiye — muhimman kayan aiki ba tare da intanet ba','Enregistrez lieux et voyages — outils clés hors ligne'],
    ['Visas','التأشيرات','ویزا','Visa','Biza','Visas'],['Finance','المالية','مالیات','Keuangan','Kuɗi','Finances'],['Career','المهنة','کیریئر','Karier','Sana’a','Carrière'],['Dictionary','القاموس','لغت','Kamus','Ƙamus','Dictionnaire'],
    ['Skip','تخطي','چھوڑیں','Lewati','Tsallake','Passer'],
    ['Travel','السفر','سفر','Perjalanan','Tafiya','Voyage'],['Islamic','إسلامي','اسلامی','Islami','Musulunci','Islam'],['Pi Payments','مدفوعات Pi','Pi ادائیگیاں','Pembayaran Pi','Biyan Pi','Paiements Pi'],
    ['Places','الأماكن','مقامات','Tempat','Wurare','Lieux'],['Jobs','الوظائف','ملازمتیں','Pekerjaan','Ayyuka','Emplois'],['Health','الصحة','صحت','Kesehatan','Lafiya','Santé'],
    ['Saudi AI','الذكاء السعودي','سعودی AI','AI Saudi','AI na Saudiyya','IA saoudienne'],
    ['KSA time','الساعة','سعودی وقت','Waktu KSA','Lokaci','Heure KSA'],
    ['Day streak','أيام متتالية','مسلسل دن','Hari beruntun','Kwanaki a jere','Jours d’affilée'],
    ['Best','الأفضل','بہترین','Terbaik','Mafi kyau','Record'],
    ['day','يوم','دن','hari','rana','jour'],['days','أيام','دن','hari','kwanaki','jours'],
    ['Sabah al-khair · Good morning','صباح الخير','صبح بخیر','Selamat pagi','Barka da safiya','Bonjour'],
    ['Assalamu alaikum · Good afternoon','السلام عليكم · طاب يومك','السلام علیکم','Selamat siang','Barka da rana','Bon après-midi'],
    ['Masa al-khair · Good evening','مساء الخير','شام بخیر','Selamat malam','Barka da yamma','Bonsoir'],
    ['By continuing, you agree to the','بالمتابعة، أنت توافق على','جاری رکھ کر، آپ اتفاق کرتے ہیں','Dengan melanjutkan, Anda menyetujui','Ta hanyar ci gaba, kun amince da','En continuant, vous acceptez les'],
    ['Independent app, not affiliated with the Government of Saudi Arabia or Pi Network.','تطبيق مستقل، غير تابع لحكومة المملكة العربية السعودية أو شبكة Pi.','آزاد ایپ، حکومتِ سعودی عرب یا Pi Network سے وابستہ نہیں۔','Aplikasi independen, tidak berafiliasi dengan Pemerintah Arab Saudi atau Pi Network.','Manhaja mai zaman kanta, ba ta da alaka da Gwamnatin Saudiyya ko Pi Network.','Application indépendante, non affiliée au gouvernement saoudien ni à Pi Network.']
  );

/* ==========================================================================
   v3.2 — Languages engine
   - English text in the page is the key; known strings swap instantly (offline)
   - Everything else is translated online once (/translate) and saved on the device
   - Arabic and Urdu switch the whole layout to right-to-left
   ========================================================================== */
const LANGS = {
  en:{ n:'English', e:'English' },
  ar:{ n:'العربية', e:'Arabic', rtl:true },
  ur:{ n:'اردو', e:'Urdu', rtl:true },
  id:{ n:'Bahasa Indonesia', e:'Indonesian' },
  ha:{ n:'Hausa', e:'Hausa' },
  fr:{ n:'Français', e:'French' }
};
const LANG_ORDER = ['en','ar','ur','id','ha','fr'];
const I18N = {};
LANG_ORDER.slice(1).forEach(function(l, i){ I18N[l] = {}; I18N_ROWS.forEach(function(r){ if(r[i + 1]) I18N[l][r[0]] = r[i + 1]; }); });
function detectLang(){
  const n = String((navigator.languages && navigator.languages[0]) || navigator.language || 'en').toLowerCase().slice(0, 2);
  return n === 'ms' ? 'id' : (LANGS[n] ? n : 'en');
}
let LANG = LANGS[store.get('lang', '')] ? store.get('lang', '') : detectLang();
let AUTO_TR = store.get('tr_' + LANG, {});
const TR_FAILED = new Set(), TR_QUEUE = new Set();
const TR_ORIG = new WeakMap(), TR_LAST = new WeakMap(), TR_ATTR = new WeakMap();
const TR_SKIP = 'script,style,textarea,code,pre,.ar,.notr,[translate="no"],#newsList,#homeNews,.msg,#avatar,#bigAv,.qr,.leaflet-container,#trBadge,.hq-ay-ar,.hq-ay-en,.hq-head-ar,.hq-bism,.hq-ar,.hq-rec select,.hq-now,#hh-list small';
const TR_SPLIT = /^([\s\p{Extended_Pictographic}️‍⃣•·›‹←→＋+✓✔★☆▸▾▲▼|π]*)(\S[\s\S]*?)([\s›‹→←:*·\p{Extended_Pictographic}\uFE0F\u200D]*)$/u;
let trEverChanged = LANG !== 'en';

function t(s){ if(LANG === 'en') return s; const d = I18N[LANG] || {}; return d[s] || AUTO_TR[s] || s; }
function trLookup(core){
  const d = I18N[LANG] || {};
  if(d[core] != null) return d[core];
  if(AUTO_TR[core] != null) return AUTO_TR[core];
  return null;
}
function trString(s){
  if(LANG === 'en' || s.length > 700 || !/[A-Za-z]{2}/.test(s)) return null;
  const m = s.match(TR_SPLIT); if(!m) return null;
  const tr = trLookup(m[2]);
  if(tr != null) return m[1] + tr + m[3];
  trWant(m[2]); return null;
}
function trText(n){
  const cur = n.nodeValue; let en = TR_ORIG.get(n);
  if(en === undefined || TR_LAST.get(n) !== cur){ en = cur; TR_ORIG.set(n, en); }
  let out = en;
  const pe = n.parentElement, isName = pe && (pe.id === 'uname' || pe.id === 'profName');
  if(LANG !== 'en' && (!isName || en.trim() === 'Guest')){ const x = trString(en); if(x != null) out = x; }
  if(out !== cur) n.nodeValue = out;
  TR_LAST.set(n, out);
}
function trAttrs(el){
  ['placeholder','aria-label','title'].forEach(function(a){
    if(!el.hasAttribute(a)) return;
    let rec = TR_ATTR.get(el); if(!rec){ rec = {}; TR_ATTR.set(el, rec); }
    const cur = el.getAttribute(a), r = rec[a];
    const en = r && r.last === cur ? r.en : cur;
    let out = en; if(LANG !== 'en'){ const x = trString(en); if(x != null) out = x; }
    if(out !== cur) el.setAttribute(a, out);
    rec[a] = { en:en, last:out };
  });
}
function trSkip(el){ return !el || (el.closest && el.closest(TR_SKIP)); }
function trWalk(root){
  if(!root) return;
  if(root.nodeType === 3){ if(!trSkip(root.parentElement)) trText(root); return; }
  if(root.nodeType !== 1 || trSkip(root)) return;
  const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode:function(n){ return n.nodeValue.trim() && !trSkip(n.parentElement) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT; } });
  let n; while((n = w.nextNode())) trText(n);
  if(root.hasAttribute) trAttrs(root);
  root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(function(el){ if(!trSkip(el)) trAttrs(el); });
}

/* ---------- online translation for everything not in the dictionary ---------- */
let trBusy = false, trTimer = null;
function trWant(s){
  if(store.get('autoTr', true) === false || s.length < 2 || TR_FAILED.has(s) || (navigator.onLine === false)) return;
  TR_QUEUE.add(s); if(!trTimer) trTimer = setTimeout(trFlush, 350);
}
function trBadge(on){
  let b = $('trBadge');
  if(!b){ b = document.createElement('div'); b.id = 'trBadge'; document.body.appendChild(b); }
  b.textContent = '🌐 ' + t('Translating…'); b.classList.toggle('on', !!on);
}
function trFlush(){
  trTimer = null; if(trBusy || !TR_QUEUE.size || LANG === 'en') return;
  const lang = LANG, batch = []; let chars = 0;
  for(const s of TR_QUEUE){ if(batch.length >= 40 || chars + s.length > 4500) break; batch.push(s); chars += s.length; }
  batch.forEach(function(s){ TR_QUEUE.delete(s); });
  trBusy = true; trBadge(true);
  fetch('/translate', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ lang:lang, texts:batch }) })
    .then(function(r){ return r.json(); })
    .then(function(d){
      if(!(d && d.ok && Array.isArray(d.out))) throw new Error((d && d.error) || 'translate');
      if(lang !== LANG) return;
      batch.forEach(function(s, i){ const x = d.out[i]; if(typeof x === 'string' && x.trim()) AUTO_TR[s] = x; else TR_FAILED.add(s); });
      trSaveAuto(); trWalk(document.body);
    })
    .catch(function(){ batch.forEach(function(s){ TR_FAILED.add(s); }); })
    .finally(function(){ trBusy = false; trBadge(false); if(TR_QUEUE.size) trTimer = setTimeout(trFlush, 200); });
}
function trSaveAuto(){
  let keys = Object.keys(AUTO_TR);
  if(keys.length > 4000){ const keep = {}; keys.slice(-3000).forEach(function(k){ keep[k] = AUTO_TR[k]; }); AUTO_TR = keep; }
  try{ localStorage.setItem('ds_tr_' + LANG, JSON.stringify(AUTO_TR)); }
  catch(e){ AUTO_TR = {}; try{ localStorage.removeItem('ds_tr_' + LANG); }catch(e2){} }
}

/* ---------- headings that mix text with styled words ---------- */
const OB_HTML = {
  '#onboard [data-i="0"] h1':{ ar:'مرحباً بك في Digital<span>Saudi</span>', ur:'Digital<span>Saudi</span> میں خوش آمدید', id:'Selamat datang di Digital<span>Saudi</span>', ha:'Barka da zuwa Digital<span>Saudi</span>', fr:'Bienvenue sur Digital<span>Saudi</span>' },
  '#onboard [data-i="1"] h1':{ ar:'مباشر و<span>محدّث</span>', ur:'لائیو اور <span>تازہ ترین</span>', id:'Langsung & <span>terkini</span>', ha:'Kai tsaye & <span>na zamani</span>', fr:'En direct & <span>à jour</span>' },
  '#onboard [data-i="2"] h1':{ ar:'ما الذي <span>يجلبك</span>؟', ur:'آپ <span>کیوں</span> آئے ہیں؟', id:'Apa yang membawa <span>Anda</span>?', ha:'Me ya kawo <span>ka</span>?', fr:'Qu’est-ce qui <span>vous</span> amène ?' }
};
function trFixedHTML(){
  Object.keys(OB_HTML).forEach(function(sel){
    const el = document.querySelector(sel); if(!el) return;
    if(!el.dataset.en){ el.dataset.en = el.innerHTML; el.classList.add('notr'); }
    el.innerHTML = LANG === 'en' ? el.dataset.en : (OB_HTML[sel][LANG] || el.dataset.en);
  });
}

/* ---------- apply / switch ---------- */
function applyLang(lang, quiet){
  if(!LANGS[lang]) lang = 'en';
  const changed = lang !== LANG; LANG = lang; store.set('lang', lang);
  if(changed){ AUTO_TR = store.get('tr_' + lang, {}); TR_QUEUE.clear(); TR_FAILED.clear(); }
  if(lang !== 'en') trEverChanged = true;
  document.documentElement.lang = lang;
  document.documentElement.dir = LANGS[lang].rtl ? 'rtl' : 'ltr';
  document.documentElement.classList.toggle('rtl', !!LANGS[lang].rtl);
  trFixedHTML();
  if(trEverChanged) trWalk(document.body);
  document.querySelectorAll('.lang-now').forEach(function(el){ el.textContent = LANGS[lang].n; });
  if(changed && !quiet) toast(t('Language changed') + ' · ' + LANGS[lang].n);
}
function setLang(lang){
  applyLang(lang);
  document.querySelectorAll('.lang-pick button').forEach(function(b){ b.classList.toggle('on', b.dataset.l === LANG); });
}
function langButtonsHTML(){
  return '<div class="lang-pick">' + LANG_ORDER.map(function(l){ return `<button class="notr ${l === LANG ? 'on' : ''}" data-l="${l}" onclick="setLang('${l}')"><b>${LANGS[l].n}</b>${l === 'en' ? '' : '<small>' + LANGS[l].e + '</small>'}</button>`; }).join('') + '</div>';
}
PANELS.language = function(){
  showPanel('Language', `<p class="small" style="margin-bottom:12px">Choose your language</p>${langButtonsHTML()}
    <div class="setting" style="margin-top:14px"><div><b>Translate guides automatically</b><div class="small">Uses the internet the first time; saved on your device after that</div></div><button class="toggle ${store.get('autoTr', true) !== false ? 'on' : ''}" onclick="this.classList.toggle('on');store.set('autoTr',this.classList.contains('on'));applyLang(LANG,true)"></button></div>
    <p class="small notr" style="margin-top:12px">English · العربية · اردو · Bahasa Indonesia · Hausa · Français</p>`, { id:'language', share:false });
};
META.language = { t:'Language', ic:'🌐', s:'English, العربية, اردو, Indonesia, Hausa, Français', short:'Language' };
NOMARK.push('language');

/* ---------- entry points: splash, onboarding, settings, profile ---------- */
(function(){
  const sp = $('splash');
  if(sp && !$('splashLang')) sp.insertAdjacentHTML('afterbegin', `<button id="splashLang" class="lang-fab notr" onclick="openLangSheet()">🌐 <span class="lang-now">${LANGS[LANG].n}</span></button>`);
  const ob = document.querySelector('#onboard [data-i="0"]');
  if(ob && !$('obLang')) ob.insertAdjacentHTML('beforeend', `<div id="obLang" style="margin-top:18px"><div class="small" style="margin-bottom:8px">🌐 Choose your language</div>${langButtonsHTML()}</div>`);
  const notifRow = document.querySelector('#tab-profile .row[onclick*="notifSettings"]');
  if(notifRow) notifRow.insertAdjacentHTML('beforebegin', `<button class="row" onclick="openItem('language')"><div class="ic">🌐</div><div class="tx"><b>Language</b><small class="lang-now notr">${LANGS[LANG].n}</small></div><span class="chev">›</span></button>`);
  const _settings = PANELS.settings;
  PANELS.settings = function(){
    _settings();
    const body = $('pBody'); if(!body) return;
    body.insertAdjacentHTML('afterbegin', `<div class="setting"><div><b>App language</b><div class="small lang-now notr">${LANGS[LANG].n}</div></div><button class="btn btn-ghost btn-sm" onclick="openItem('language')">🌐 Language</button></div>`);
    trWalk(body);
  };
})();
function openLangSheet(){
  // on the splash screen the panel sits under it, so show a light sheet instead
  let s = $('langSheet');
  if(!s){ s = document.createElement('div'); s.id = 'langSheet'; document.body.appendChild(s); }
  s.innerHTML = `<div class="ls-in"><h3>🌐 ${t('Choose your language')}</h3>${langButtonsHTML()}<button class="btn btn-primary" style="margin:14px auto 0" onclick="$('langSheet').classList.remove('open')">${t('Done')}</button></div>`;
  s.classList.add('open');
  s.onclick = function(e){ if(e.target === s) s.classList.remove('open'); };
}

/* ---------- Saudi AI answers in the chosen language ---------- */
(function(){
  const f = window.fetch;
  window.fetch = function(url, opts){
    try{
      if(url === '/ai' && opts && opts.method === 'POST' && typeof opts.body === 'string' && LANG !== 'en'){
        const b = JSON.parse(opts.body); b.lang = LANGS[LANG].e; opts = Object.assign({}, opts, { body:JSON.stringify(b) });
      }
    }catch(e){}
    return f.apply(this, [url, opts]);
  };
})();

/* ---------- keep new content translated ---------- */
const trObserver = new MutationObserver(function(muts){
  if(!trEverChanged) return;
  for(const m of muts){
    if(m.type === 'characterData'){ const n = m.target; if(TR_LAST.get(n) !== n.nodeValue && !trSkip(n.parentElement)) trText(n); }
    else m.addedNodes.forEach(trWalk);
  }
});
trObserver.observe(document.body, { subtree:true, childList:true, characterData:true });
applyLang(LANG, true);

/* ==========================================================================
   v3.3 — Badges you can understand: progress, lock, "how to earn" + shortcut
   ========================================================================== */
const BADGE_HOW = {
  first:['Open DigitalSaudi for the first time', null],
  streak3:['Open the app 3 days in a row', null], streak7:['Open the app 7 days in a row', null], streak30:['Open the app 30 days in a row', null],
  explorer:['Read 10 different guides', "switchTab('tools')"],
  cities:['Open 5 city guides in Explore › Cities', "switchTab('explore')"],
  mapper:['Use “Explore near me” on the map', "openMap('all',true)"],
  trip:['Plan a trip in My Saudi Trips', "openItem('trips')"],
  hotelier:['Save a hotel from the map (tap ☆ on a hotel)', "openMap('hotels',true)"],
  foodie:['Save a restaurant or café from the map', "openMap('food',true)"],
  reader:['Read 5 news stories', "openLive('news')"],
  eventSaved:['Save an event to your list', "openLive('events')"],
  umrah:['Tick every item on the Umrah packing checklist', "openItem('umrahPack')"],
  quran:['Open any surah in the Quran', "openItem('quran')"],
  duaFav:['Save a dua to your favourites', "openItem('duas')"],
  dhikr:['Count 100 dhikr on the tasbih', "openItem('tasbih')"],
  scholar:['Score 8 or more in the Saudi quiz', "openItem('knowQuiz')"],
  safety:['Read 3 safety guides', "openItem('safety')"],
  cv:['Download your CV from the CV builder', "openItem('cvBuilder')"],
  business:['Open a business in the directory', "openItem('directory')"],
  piMerchant:['Visit a Pi merchant or make an Accept-Pi poster', "openItem('piHub')"],
  aiChat:['Ask Saudi AI a question', "openAI()"],
  green:['Use all 3 Green Saudi calculators', "openItem('greenHub')"],
  supporter:['Support DigitalSaudi with any amount of Pi', "openItem('support')"],
  premium:['Activate DigitalSaudi Premium', "openItem('premium')"],
  pioneer:['Sign in with your Pi account', "piLogin()"],
  dict:['Look up a word in the Arabic dictionary', "openItem('phrases')"]
};
renderBadges = function(){
  const got = store.get(badgeKey(), []), n = BADGES.filter(function(b){ return got.indexOf(b.id) >= 0; }).length, pct = Math.round(n / BADGES.length * 100);
  $('badgeCount').textContent = n + '/' + BADGES.length;
  $('badgeGrid').innerHTML = `<div class="bdg-prog"><div><b>${n} of ${BADGES.length} earned</b><small>Tap a locked badge to see how to earn it</small></div><div class="bar"><i style="width:${pct}%"></i></div></div>` +
    BADGES.map(function(b){ const on = got.indexOf(b.id) >= 0; return `<button class="bdg ${on ? 'got' : 'locked'}" onclick="badgeInfo('${b.id}')"><span>${b.ic}</span>${esc(b.t)}${on ? '<em class="bk">✓</em>' : '<em class="bk">🔒</em>'}</button>`; }).join('');
};
function badgeInfo(id){
  const b = BADGES.find(function(x){ return x.id === id; }); if(!b) return;
  const on = store.get(badgeKey(), []).indexOf(id) >= 0, how = BADGE_HOW[id] || ['Keep exploring DigitalSaudi', null];
  showPanel(b.t, `<div class="lock-wrap"><div class="bdg-big ${on ? 'got' : ''}">${b.ic}</div>
    <h3>${on ? '🏅 Badge earned' : '🔒 Not earned yet'}</h3>
    <p class="small" style="margin:6px 0 18px">${on ? 'Well done! You earned this by: ' : 'How to earn it: '}<b>${esc(how[0])}</b></p>
    ${!on && how[1] ? `<button class="btn btn-primary" style="margin:0 auto" onclick="closePanel();${how[1]}">Go there now ›</button>` : ''}</div>`, { id:'badge', share:false });
}
NOMARK.push('badge');

/* ==========================================================================
   v3.3 — Prayer times that never fail: Umm al-Qura calculation on the phone
   (Fajr 18.5°, Isha 90 min after Maghrib — 120 in Ramadan, Asr standard)
   Used when the online service can't be reached.
   ========================================================================== */
function calcPrayerTimes(lat, lng, ymd){
  const R = Math.PI / 180, sin = function(d){ return Math.sin(d * R); }, cos = function(d){ return Math.cos(d * R); }, tan = function(d){ return Math.tan(d * R); };
  const asin = function(x){ return Math.asin(x) / R; }, acos = function(x){ return Math.acos(x) / R; }, atan2 = function(y, x){ return Math.atan2(y, x) / R; }, acot = function(x){ return Math.atan(1 / x) / R; };
  const fixA = function(a){ a = a - 360 * Math.floor(a / 360); return a < 0 ? a + 360 : a; }, fixH = function(h){ h = h - 24 * Math.floor(h / 24); return h < 0 ? h + 24 : h; };
  let p = ymd.split('-').map(Number), y = p[0], m = p[1], d = p[2];
  if(m <= 2){ y--; m += 12; }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  const jd = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + B - 1524.5 - lng / (15 * 24);
  const sun = function(j){
    const D = j - 2451545, g = fixA(357.529 + 0.98560028 * D), q = fixA(280.459 + 0.98564736 * D);
    const L = fixA(q + 1.915 * sin(g) + 0.020 * sin(2 * g)), e = 23.439 - 0.00000036 * D;
    const RA = atan2(cos(e) * sin(L), cos(L)) / 15;
    return { decl:asin(sin(e) * sin(L)), eqt:q / 15 - fixH(RA) };
  };
  const mid = function(t){ return fixH(12 - sun(jd + t).eqt); };
  const angleTime = function(angle, t, ccw){
    const dec = sun(jd + t).decl, noon = mid(t);
    const T = acos((-sin(angle) - sin(dec) * sin(lat)) / (cos(dec) * cos(lat))) / 15;
    return noon + (ccw ? -T : T);
  };
  const asr = function(t){ const dec = sun(jd + t).decl; return angleTime(-acot(1 + tan(Math.abs(lat - dec))), t); };
  const ramadan = (function(){ const h = hijriParts(new Date(ymd + 'T12:00:00+03:00')); return h && h.m === 9; })();
  const raw = { Fajr:angleTime(18.5, 5 / 24, true), Sunrise:angleTime(0.833, 6 / 24, true), Dhuhr:mid(12 / 24), Asr:asr(13 / 24), Maghrib:angleTime(0.833, 18 / 24) };
  raw.Isha = raw.Maghrib + (ramadan ? 120 : 90) / 60;
  const out = {};
  Object.keys(raw).forEach(function(k){
    const h = fixH(raw[k] + 3 - lng / 15), mins = Math.round(h * 60) % 1440;
    out[k] = String(Math.floor(mins / 60)).padStart(2, '0') + ':' + String(mins % 60).padStart(2, '0');
  });
  return out;
}
getTimings = function(city){
  const today = ksaDate(), key = 'pt_' + city + '_' + today, c = store.get(key, null);
  if(c) return Promise.resolve(c);
  const local = function(){
    const co = CITY_COORDS[city]; if(!co) return store.get('pt_last_' + city, null);
    const t = calcPrayerTimes(co[0], co[1], today); t._calc = true; return t;
  };
  const co = CITY_COORDS[city], dmy = today.split('-').reverse().join('-');
  const api = co ? 'https://api.aladhan.com/v1/timings/' + dmy + '?latitude=' + co[0] + '&longitude=' + co[1] + '&method=4&timezonestring=Asia/Riyadh'
    : 'https://api.aladhan.com/v1/timingsByCity/' + dmy + '?city=' + encodeURIComponent(city) + '&country=Saudi%20Arabia&method=4';
  return getJSON(api, 8000)
    .then(function(d){ const t = {}; PRAYERS.forEach(function(p){ t[p] = String(d.data.timings[p]).slice(0, 5); }); if(!/^\d\d:\d\d$/.test(t.Fajr)) throw new Error('bad'); store.set(key, t); store.set('pt_last_' + city, t); return t; })
    .catch(local);
};

/* ==========================================================================
   v4.0 — design: prayer-first hero, Pi mini chart
   ========================================================================== */
function hpInText(h, m){
  const L = typeof LANG !== 'undefined' ? LANG : 'en';
  if(L === 'ar') return 'بعد ' + (h ? h + ' س ' : '') + m + ' د';
  if(L === 'ur') return (h ? h + ' گھنٹے ' : '') + m + ' منٹ میں';
  if(L === 'id') return 'dalam ' + (h ? h + 'j ' : '') + m + 'm';
  if(L === 'ha') return 'nan da ' + (h ? 'awa ' + h + ' ' : '') + 'minti ' + m;
  if(L === 'fr') return 'dans ' + (h ? h + ' h ' : '') + m + ' min';
  return 'in ' + (h ? h + 'h ' : '') + m + 'm';
}
(function(){
  // hero: name and time shown separately, plus a bar filling toward the next prayer
  tickPrayer = function(){
    const n = nextPrayer(); if(!n) return;
    if(lastNext && lastNext !== n.name){ notifyPrayer(lastNext, prayerCity()); loadPrayer(); }
    lastNext = n.name;
    if($('dpName')){ $('dpName').textContent = t(n.name) + ' · ' + n.time; $('dpName').classList.add('notr'); $('dpCount').textContent = fmtLeft(n.left); }
    $('hpName').textContent = n.name;
    if($('hpTime')) $('hpTime').textContent = n.time;
    const h = Math.floor(n.left / 3600), m = Math.floor(n.left % 3600 / 60);
    $('hpIn').textContent = hpInText(h, m);
    // progress since the previous prayer
    const order = PRAYERS.filter(function(p){ return p !== 'Sunrise'; }), now = ksaSecondsNow();
    const i = order.indexOf(n.name), prev = order[(i + order.length - 1) % order.length];
    let start = toSec(timings[prev]), end = n.tomorrow ? toSec(timings.Fajr) + 86400 : toSec(timings[n.name]);
    if(start > now) start -= 86400;
    const pct = Math.max(2, Math.min(100, (now - start) / Math.max(1, end - start) * 100));
    if($('hpBar')) $('hpBar').style.width = pct.toFixed(1) + '%';
  };
  // Pi mini chart on the home strip
  const _rm = renderMarkets;
  renderMarkets = function(){
    _rm.apply(this, arguments);
    const p = store.get('pi', null), svg = $('hPiSpark');
    if(!svg) return;
    const a = p && p.spark && p.spark.length > 2 ? p.spark : null;
    if(!a){ svg.innerHTML = ''; return; }
    const lo = Math.min.apply(null, a), hi = Math.max.apply(null, a), span = hi - lo || 1;
    const pts = a.map(function(v, i){ return (i / (a.length - 1) * 100).toFixed(1) + ',' + (25 - (v - lo) / span * 22).toFixed(1); }).join(' ');
    const up = (p.change || 0) >= 0;
    svg.innerHTML = `<polyline points="${pts}" fill="none" stroke="${up ? 'var(--accent)' : 'var(--sadu)'}" stroke-width="1.6" vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/>`;
  };
})();

/* ==========================================================================
   v4.0 — "Najd line" icon set
   One stroke weight (1.8), rounded joins, 24px grid. Replaces emoji icons in
   tiles, rows, cards, navigation and the header; anything unmapped keeps its emoji.
   ========================================================================== */
const ICONS = {
  home:'<path d="M3.5 10.5 12 4l8.5 6.5"/><path d="M5.5 9v10.5h13V9"/><path d="M10 19.5v-5h4v5"/>',
  live:'<path d="M13 3 5 13.5h6L10 21l8-10.5h-6z"/>',
  compass:'<circle cx="12" cy="12" r="8.5"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  tools:'<rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M9 7.5V6a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 6v1.5M3.5 12.5h17M10.5 12.5v2h3v-2"/>',
  user:'<circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c.8-3.8 3.8-5.7 7.5-5.7s6.7 1.9 7.5 5.7"/>',
  search:'<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>',
  bell:'<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 1.5h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>',
  spark:'<path d="M12 3.5c.6 4.2 2.3 5.9 6.5 6.5-4.2.6-5.9 2.3-6.5 6.5-.6-4.2-2.3-5.9-6.5-6.5 4.2-.6 5.9-2.3 6.5-6.5z"/><path d="M18.5 15.5c.3 1.8 1 2.5 2.8 2.8-1.8.3-2.5 1-2.8 2.8-.3-1.8-1-2.5-2.8-2.8 1.8-.3 2.5-1 2.8-2.8z"/>',
  luggage:'<rect x="5.5" y="7" width="13" height="12.5" rx="2.5"/><path d="M9.5 7V4.5h5V7M9.5 10.5v6M14.5 10.5v6M8 19.5v1.5M16 19.5v1.5"/>',
  train:'<rect x="6" y="3.5" width="12" height="13" rx="3"/><path d="M6 11h12M9.5 14h.01M14.5 14h.01M8.5 20.5l1.5-4M15.5 20.5l-1.5-4M9 6.5h6"/>',
  kaaba:'<path d="M4.5 8 12 4.5 19.5 8v8.5L12 20l-7.5-3.5z"/><path d="M4.5 10.6 12 14l7.5-3.4M12 14v6M14.5 15.5v3.3"/>',
  mosque:'<path d="M6.5 20.5V14h11v6.5M6.5 14c0-3.6 2.4-5.8 5.5-7.2 3.1 1.4 5.5 3.6 5.5 7.2M12 6.8V4M3 20.5h18M10.5 20.5v-3a1.5 1.5 0 0 1 3 0v3"/>',
  hospital:'<rect x="4" y="4" width="16" height="16" rx="3.5"/><path d="M12 8v8M8 12h8"/>',
  hands:'<path d="M4 11.5c0 4.7 3.6 8.5 8 8.5s8-3.8 8-8.5M4 11.5h4c1.6 0 2.8 1 4 2.6 1.2-1.6 2.4-2.6 4-2.6h4M6.2 11.5V7.8M9.2 11.5V6.5M14.8 11.5V6.5M17.8 11.5V7.8"/>',
  book:'<path d="M12 6.5c-1.8-1.4-4.5-2-7.5-1.8v13c3-.2 5.7.4 7.5 1.8 1.8-1.4 4.5-2 7.5-1.8v-13c-3-.2-5.7.4-7.5 1.8z"/><path d="M12 6.5v13"/>',
  pin:'<path d="M12 21s6.5-5.8 6.5-11a6.5 6.5 0 0 0-13 0c0 5.2 6.5 11 6.5 11z"/><circle cx="12" cy="10" r="2.4"/>',
  hotel:'<path d="M4.5 20.5V5.5a1.5 1.5 0 0 1 1.5-1.5h12a1.5 1.5 0 0 1 1.5 1.5v15M3 20.5h18M10 20.5v-3.5h4v3.5M8.5 8h1M14.5 8h1M8.5 12h1M14.5 12h1"/>',
  dunes:'<path d="M2.5 18.5c3-4 6-5.5 9-4.5s5 .5 10-3.5"/><path d="M2.5 21.5h19M3 15c2-2.8 4.5-4 7-3.5"/><circle cx="17.5" cy="6" r="2.2"/>',
  dish:'<path d="M3.5 16.5h17M5 16.5a7 7 0 0 1 14 0M12 9.5V8M10.5 8h3M4 19.5h16"/>',
  sos:'<path d="M12 3.5 20.5 18.5h-17z"/><path d="M12 9.5v4.2M12 16.3h.01"/>',
  pi:'<path d="M5 7.5c2.5-.8 9-1 14-.4M9 7.5c0 4.8-.6 8.5-2.5 11.5M15 7.4v9.1c0 1.5.8 2.3 2.4 2"/>',
  map:'<path d="m9 5-5 2v13l5-2 6 2 5-2V5l-5 2z"/><path d="M9 5v13M15 7v13"/>',
  chat:'<path d="M5 18.5V7a2.5 2.5 0 0 1 2.5-2.5h9A2.5 2.5 0 0 1 19 7v6.5a2.5 2.5 0 0 1-2.5 2.5H9z"/><path d="M9 9.5h6M9 12.5h3.5"/>',
  city:'<path d="M3.5 20.5h17M5.5 20.5v-9l4-2v11M9.5 20.5V5l5 2.5v13M14.5 20.5v-8h4v8"/><path d="M12 10h.01M12 13h.01M7.5 14h.01"/>',
  calc:'<rect x="5.5" y="3.5" width="13" height="17" rx="2.5"/><path d="M8.5 7.5h7M8.5 12h.01M12 12h.01M15.5 12h.01M8.5 16h.01M12 16h.01M15.5 16h.01"/>',
  passport:'<rect x="5" y="3.5" width="14" height="17" rx="2"/><circle cx="12" cy="10.5" r="3"/><path d="M9 10.5h6M12 7.5c-.9.9-.9 5.1 0 6M9.5 16.5h5"/>',
  idcard:'<rect x="3" y="5.5" width="18" height="13" rx="2.5"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 15.5c.5-1.3 1.6-2 3-2s2.5.7 3 2M14 10h4M14 13.5h3"/>',
  folder:'<path d="M3.5 18V6.5A1.5 1.5 0 0 1 5 5h4.5l2 2.2H19a1.5 1.5 0 0 1 1.5 1.5V18a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 18z"/>',
  clipboard:'<rect x="5.5" y="4.5" width="13" height="16" rx="2"/><path d="M9.5 4.5V3.5h5v1M9 10h6M9 13.5h6M9 17h3.5"/>',
  briefcase:'<rect x="3.5" y="7.5" width="17" height="12" rx="2.5"/><path d="M9 7.5V5.5h6v2M3.5 12.5c5 2 12 2 17 0"/>',
  cash:'<rect x="2.5" y="6.5" width="19" height="11" rx="2"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9.5v.01M18 14.5v.01"/>',
  coins:'<ellipse cx="10" cy="7" rx="6" ry="2.5"/><path d="M4 7v4c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V7"/><path d="M8 15.3c.6 1.3 3 2.2 6 2.2 3.3 0 6-1.1 6-2.5v-4c0-1-1.3-1.8-3.3-2.2"/>',
  exchange:'<path d="M4.5 9h14l-3.5-3.5M19.5 15h-14l3.5 3.5"/>',
  wallet:'<path d="M18.5 8V6.5A1.5 1.5 0 0 0 17 5H5.5A2 2 0 0 0 3.5 7v10.5a2 2 0 0 0 2 2H19a1.5 1.5 0 0 0 1.5-1.5v-8.5A1.5 1.5 0 0 0 19 8H5.5"/><path d="M16.5 13.8h.01"/>',
  house:'<path d="M4 11 12 4.5l8 6.5"/><path d="M6 9.5v10h12v-10"/><rect x="10" y="13" width="4" height="6.5"/>',
  landmark:'<path d="M3.5 9 12 4l8.5 5zM5 9v9M9 9v9M15 9v9M19 9v9M3 20.5h18M4 18h16"/>',
  star:'<path d="m12 3.8 2.5 5.2 5.6.7-4.1 3.9 1 5.6L12 16.5l-5 2.7 1-5.6-4.1-3.9 5.6-.7z"/>',
  medal:'<circle cx="12" cy="15" r="5"/><path d="M9 10.5 6.5 3.5h4L12 7l1.5-3.5h4L15 10.5M12 13v4"/>',
  mountain:'<path d="m2.5 19.5 6.5-11 4 6.5 2.5-3.5 6 8z"/><path d="m7.3 11.3 1.7 1.2 1.6-1.2"/>',
  clock:'<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
  alarm:'<circle cx="12" cy="13" r="7"/><path d="M12 9.5V13l2.5 1.5M4.5 5.5l2.5-2M19.5 5.5l-2.5-2"/>',
  info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.8h.01"/>',
  receipt:'<path d="M6 3.5h12v17l-2-1.5-2 1.5-2-1.5-2 1.5-2-1.5-2 1.5z"/><path d="M9 8h6M9 11.5h6M9 15h3.5"/>',
  handshake:'<path d="m2.5 11 4-4 3 1.5 2.5-1.5h3l6 5"/><path d="m11 8.5-3 3 1.5 1.5 3-2 4.5 4"/><path d="M4.5 13 9 17.5l1.5-1M13.5 18.5l-1.5-1.5"/>',
  landing:'<path d="M3 20.5h18M4.5 10.5l.5 3.5 13 3.3c1 .2 2-.3 2.2-1.2.2-.9-.4-1.7-1.3-2L14 12.8 10.5 6.5 8.5 6l1.5 6.3L6 11.3l-1-2.3z"/>',
  shield:'<path d="M12 3.5 19 6v5.5c0 4.6-2.9 7.8-7 9-4.1-1.2-7-4.4-7-9V6z"/><path d="m9 12 2 2 4-4"/>',
  bag:'<path d="M5.5 8.5h13l-1 12h-11z"/><path d="M9 11V7a3 3 0 0 1 6 0v4"/>',
  ban:'<circle cx="12" cy="12" r="8.5"/><path d="m6 6 12 12"/>',
  lock:'<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5M12 14.5v2"/>',
  battery:'<rect x="3" y="7.5" width="16" height="9" rx="2"/><path d="M21 10.5v3M10.5 9.5 8.5 12.5h4l-2 3"/>',
  beads:'<circle cx="12" cy="10" r="6" stroke-width="3.4" stroke-dasharray=".01 3.14"/><path d="M12 16.5v2.5M10.3 21.5l1.7-2.5 1.7 2.5"/>',
  phone:'<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
  scroll:'<path d="M7 4.5h11.5a2 2 0 0 1 0 4H17v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1.5h9.5v1.5a2 2 0 0 0 2 2"/><path d="M7 4.5a2 2 0 0 0-2 2v10M9 9h4.5M9 12.5h4.5"/>',
  ruler:'<path d="m3.5 16.5 13-13 4 4-13 13z"/><path d="m7.5 12.5 2 2M10.5 9.5l1.5 1.5M13.5 6.5l2 2"/>',
  calendar:'<rect x="3.5" y="5" width="17" height="15.5" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>',
  doc:'<path d="M6 3.5h8l4.5 4.5v12.5H6z"/><path d="M14 3.5V8h4.5M9 12.5h6M9 16h6"/>',
  pen:'<path d="m14.5 5.5 4 4L8 20H4v-4z"/><path d="m12.5 7.5 4 4"/>',
  drop:'<path d="M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
  heart:'<path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.3 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z"/>',
  pill:'<rect x="3" y="8.5" width="18" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="m9.5 9.5 5 5"/>',
  steps:'<path d="M8.5 9.5c1.9 0 3 1.9 3 4.6 0 2.4-1.2 4.4-3 4.4s-3-2-3-4.4c0-2.7 1.1-4.6 3-4.6zM6.5 6.3h.01M8.7 5.3h.01M10.9 6.3h.01"/><path d="M16 4.5c1.6 0 2.5 1.6 2.5 3.8 0 2-1 3.7-2.5 3.7s-2.5-1.7-2.5-3.7"/>',
  store:'<path d="M4 9.5 5.5 4.5h13L20 9.5"/><path d="M4 9.5a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0M5 11.5v9h14v-9M10 20.5v-5h4v5"/>',
  atm:'<rect x="3.5" y="4.5" width="17" height="11" rx="2"/><path d="M3.5 8.5h17M7 12.5h3.5M8 19.5h8M10 15.5v4M14 15.5v4"/>',
  wave:'<path d="M2.5 9c2.4 0 2.4-2 4.8-2s2.4 2 4.7 2 2.4-2 4.7-2 2.4 2 4.8 2M2.5 14c2.4 0 2.4-2 4.8-2s2.4 2 4.7 2 2.4-2 4.7-2 2.4 2 4.8 2M2.5 19c2.4 0 2.4-2 4.8-2s2.4 2 4.7 2 2.4-2 4.7-2 2.4 2 4.8 2"/>',
  trophy:'<path d="M7.5 4h9v4.5a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 6H4.5c0 3 1.3 4.5 3.3 4.7M16.5 6h3c0 3-1.3 4.5-3.3 4.7M12 13v3.5M8.5 20.5h7l-1-4h-5z"/>',
  flag:'<path d="M5.5 21V4M5.5 4.5h12l-2.5 4 2.5 4h-12"/>',
  masks:'<path d="M3.5 5.5c3 1.3 6 1.3 9 0v5a4.5 4.5 0 0 1-9 0z"/><path d="M11.5 12.5c3 1.3 6 1.3 9 0v4a4.5 4.5 0 0 1-9 0"/><path d="M6 9h.01M10 9h.01M6.5 12c.9.7 2.1.7 3 0"/>',
  cap:'<path d="m2.5 9.5 9.5-4.5 9.5 4.5-9.5 4.5z"/><path d="M6.5 11.5v4.5c3 2.3 8 2.3 11 0v-4.5M21.5 9.5v5"/>',
  backpack:'<path d="M6 9.5a6 6 0 0 1 12 0v9.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19z"/><path d="M9.5 4.5a2.5 2.5 0 0 1 5 0M9 13h6v4H9z"/>',
  globe:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.3 2.5 3.4 5.3 3.4 8.5s-1.1 6-3.4 8.5c-2.3-2.5-3.4-5.3-3.4-8.5s1.1-6 3.4-8.5z"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  fuel:'<path d="M5 20.5V5.5A1.5 1.5 0 0 1 6.5 4h6A1.5 1.5 0 0 1 14 5.5v15M3.5 20.5h12M5 11h9"/><path d="M14 8.5h1.8a1.7 1.7 0 0 1 1.7 1.7v6.3a1.5 1.5 0 0 0 3 0V9l-2.5-3"/>',
  gear:'<circle cx="12" cy="12" r="8" stroke-width="3" stroke-dasharray="2.2 2.99"/><circle cx="12" cy="12" r="6.2"/><circle cx="12" cy="12" r="2.4"/>',
  recycle:'<path d="M19.5 13a7.6 7.6 0 0 1-13.7 3.9M4.5 11a7.6 7.6 0 0 1 13.7-3.9"/><path d="M18.6 3.6v3.7h-3.7M5.4 20.4v-3.7h3.7"/>',
  cup:'<path d="M4.5 9.5h12v5a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5z"/><path d="M16.5 11h1.5a2.5 2.5 0 0 1 0 5h-1.8M8 3.5c-.8 1 .8 2 0 3M12 3.5c-.8 1 .8 2 0 3"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M21.5 12h-2M4.5 12h-2M18.7 5.3l-1.4 1.4M6.7 17.3l-1.4 1.4M18.7 18.7l-1.4-1.4M6.7 6.7 5.3 5.3"/>',
  car:'<path d="M4.5 16.5v-4l2-5.5h11l2 5.5v4"/><path d="M3.5 16.5h17v2.5h-3v-2.5M6.5 19v-2.5M4.5 12.5h15M7.5 14.5h.01M16.5 14.5h.01"/>',
  bookmark:'<path d="M6.5 3.5h11v17l-5.5-4-5.5 4z"/>',
  image:'<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="m20.5 15.5-4.5-4.5-8.5 8.5"/>',
  family:'<circle cx="8" cy="7.5" r="2.5"/><circle cx="16.5" cy="8.5" r="2"/><path d="M3.5 19.5c.3-3.5 2.1-5.5 4.5-5.5s4.2 2 4.5 5.5M13.3 15.3c.8-1 1.9-1.6 3.2-1.6 2 0 3.5 1.7 3.8 4.8"/>',
  target:'<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r=".8"/>',
  mic:'<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0 0 13 0M12 18v3"/>',
  firework:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>',
  leaf:'<path d="M5 19c0-9 5.5-14 15-14 0 9.5-5 15-14 15"/><path d="M5 19c3-4 6-6.5 9.5-8"/>',
  check:'<circle cx="12" cy="12" r="8.5"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
  share:'<path d="M12 15V3.5M8 7.5l4-4 4 4M5 12v6.5A2 2 0 0 0 7 20.5h10a2 2 0 0 0 2-2V12"/>',
  weather:'<circle cx="9" cy="9" r="3.5"/><path d="M9 2.5v1.5M2.5 9H4M4.4 4.4l1 1M13.6 4.4l-1 1"/><path d="M8 19.5h9.5a3.5 3.5 0 0 0 0-7 5 5 0 0 0-9.3 1.3A2.9 2.9 0 0 0 8 19.5z"/>',
  ball:'<circle cx="12" cy="12" r="8.5"/><path d="m12 7.5 3.5 2.5-1.3 4h-4.4L8.5 10zM12 3.5v4M15.5 10l4.4-1.5M14.2 14l2.6 3.8M9.8 14l-2.6 3.8M8.5 10 4.1 8.5"/>',
  news:'<rect x="3.5" y="4.5" width="14" height="15" rx="2"/><path d="M17.5 8.5h3v9a2 2 0 0 1-4 0M7 8.5h7M7 12h7M7 15.5h4"/>',
  chart:'<path d="M3.5 19.5h17M6 16l4-4.5 3 2.5 5-6.5"/><path d="M15 7.5h3v3"/>',
  arrow:'<path d="M5 12h14M13 6l6 6-6 6"/>',
  ticket:'<path d="M3.5 8.5V6.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v2a3.5 3.5 0 0 0 0 7v2a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-2a3.5 3.5 0 0 0 0-7z"/><path d="M14.5 5.5v13" stroke-dasharray="2 2.2"/>'
};
const EMOJI_ICON = {
  '🏠':'house','⚡':'bolt','🧭':'compass','🧰':'tools','👤':'user','🔍':'search','🔎':'search','🔔':'bell','🤖':'spark',
  '🧳':'luggage','🚆':'train','🚄':'train','🕋':'kaaba','🕌':'mosque','🏥':'hospital','🩺':'hospital','🤲':'hands','📖':'book',
  '📍':'pin','🏨':'hotel','🏜️':'dunes','🐪':'dunes','🍽️':'dish','🥘':'dish','🆘':'sos','🚨':'sos','π':'pi','🗺️':'map','💬':'chat',
  '🏙️':'city','🌆':'city','🧮':'calc','🛂':'passport','🪪':'idcard','🗂️':'folder','📋':'clipboard','💼':'briefcase','🧑‍💼':'briefcase',
  '💵':'cash','💰':'coins','💱':'exchange','👛':'wallet','🏡':'house','🏘️':'house','🏛️':'landmark','🏦':'landmark','⭐':'star','🏅':'medal',
  '⛰️':'mountain','⏰':'alarm','🕰️':'clock','🕘':'clock','ℹ️':'info','🧾':'receipt','🤝':'handshake','🛬':'landing','🛡️':'shield',
  '🛍️':'bag','🚫':'ban','🔐':'lock','🔋':'battery','📿':'beads','📲':'phone','📱':'phone','📜':'scroll','📏':'ruler','📅':'calendar',
  '📄':'doc','📝':'pen','💧':'drop','💚':'heart','💊':'pill','👣':'steps','🏪':'store','🏧':'atm','🏝️':'wave','🌊':'wave','🤿':'wave',
  '🏆':'trophy','🏁':'flag','🎭':'masks','🎓':'cap','🎒':'backpack','🌐':'globe','➕':'plus','＋':'plus','⛽':'fuel','🛢️':'fuel','⚙️':'gear',
  '♻️':'recycle','☕':'cup','☀️':'weather','🌤️':'weather','🥵':'sun','🚕':'car','🚦':'car','🔖':'bookmark','🖼️':'image','👨‍👩‍👧':'family',
  '🎡':'family','🎯':'target','🎤':'mic','🎆':'firework','🌱':'leaf','✅':'check','📤':'share','⚽':'ball','📰':'news','📈':'chart','🎟️':'ticket','🏢':'city'
};
ICONS.bolt = ICONS.live;
(function(){
  const sprite = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  sprite.setAttribute('aria-hidden', 'true'); sprite.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden';
  sprite.innerHTML = Object.keys(ICONS).map(function(k){ return '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + ICONS[k] + '</symbol>'; }).join('');
  document.body.insertBefore(sprite, document.body.firstChild);
})();
function ico(name, cls){ return '<svg class="i ' + (cls || '') + '" aria-hidden="true"><use href="#i-' + name + '"/></svg>'; }
function iconize(el){
  if(!el || el.dataset.ico) return;
  const t = (el.textContent || '').trim(), name = EMOJI_ICON[t] || EMOJI_ICON[t.replace(/️/g, '')] || EMOJI_ICON[t + '️'];
  if(!name || el.children.length) return;
  el.dataset.ico = name; el.innerHTML = ico(name);
}
function iconizeIn(root){
  if(!root || root.nodeType !== 1) return;
  if(root.matches && root.matches('.ic')) iconize(root);
  root.querySelectorAll && root.querySelectorAll('.ic').forEach(iconize);
}
new MutationObserver(function(ms){ ms.forEach(function(m){ m.addedNodes.forEach(iconizeIn); if(m.type === 'characterData' && m.target.parentElement && m.target.parentElement.classList.contains('ic')){ const e = m.target.parentElement; delete e.dataset.ico; iconize(e); } }); })
  .observe(document.body, { childList:true, subtree:true, characterData:true });
iconizeIn(document.body);
/* ==========================================================================
   v4.1 — news without photos, profile chip state, AI label
   ========================================================================== */
(function(){
  const _card = newsCardHTML;
  newsCardHTML = function(it){
    if(it.img) return _card(it);
    return `<button class="news-card" onclick="openArticle('${it.id}')"><div class="img noimg"><span class="cat">${esc(catName(it.cat))}</span><span class="src notr">${esc(it.source)}</span></div><div class="bd"><div class="meta"><b>${esc(it.source)}</b> · ${ago(it.date)}</div><h4>${esc(it.title)}</h4></div></button>`;
  };
  const _tab = switchTab;
  switchTab = function(name){ _tab(name); const c = $('meChip'); if(c) c.classList.toggle('on', name === 'profile'); };
  if(typeof I18N_ROWS !== 'undefined'){
    [['Ask AI','اسأل الذكاء','AI سے پوچھیں','Tanya AI','Tambayi AI','Demander à l’IA']].forEach(function(r){
      LANG_ORDER.slice(1).forEach(function(l, i){ I18N[l][r[0]] = r[i + 1]; });
    });
    if(typeof applyLang === 'function') applyLang(LANG, true);
  }
})();

/* ==========================================================================
   v4.2 — Motion: sliding tab indicator, screen transitions, sheet close,
   live number roll, success moment, header depth, light haptics.
   Everything respects "reduce motion".
   ========================================================================== */
const CALM = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function haptic(ms){ try{ if(navigator.vibrate) navigator.vibrate(ms || 8); }catch(e){} }

/* ---- 1. sliding indicator under the active tab ---- */
(function(){
  const nav = $('nav'); if(!nav) return;
  const ind = document.createElement('span'); ind.id = 'navInd'; ind.setAttribute('aria-hidden', 'true'); nav.appendChild(ind);
  function place(instant){
    const b = nav.querySelector('button.active:not(.nav-ai) .ni');
    if(!b){ ind.style.opacity = '0'; return; }
    const nr = nav.getBoundingClientRect(), r = b.getBoundingClientRect();
    if(instant) ind.style.transition = 'none';
    ind.style.opacity = '1';
    ind.style.width = r.width + 'px';
    ind.style.transform = 'translateX(' + (r.left - nr.left) + 'px)';
    ind.style.top = (r.top - nr.top) + 'px';
    if(instant){ void ind.offsetWidth; ind.style.transition = ''; }
  }
  window.placeNavInd = place;
  window.addEventListener('resize', function(){ place(true); });
  setTimeout(function(){ place(true); }, 60);
  nav.querySelectorAll('button').forEach(function(b){ b.addEventListener('click', function(){ haptic(6); }); });
})();

/* ---- 2. screen transition between tabs ---- */
(function(){
  const _tab = switchTab;
  switchTab = function(name){
    const was = document.querySelector('.tab.active');
    _tab(name);
    const now = $('tab-' + name);
    if(window.placeNavInd) placeNavInd();
    if(CALM || !now || now === was) return;
    now.classList.remove('tab-enter'); void now.offsetWidth; now.classList.add('tab-enter');
  };
})();

/* ---- 3. sheets glide away instead of vanishing ---- */
(function(){
  const _close = closePanel;
  closePanel = function(){
    const p = $('panel'), open = p && p.classList.contains('open');
    if(open && !CALM){
      const ghost = p.cloneNode(true);
      ghost.removeAttribute('id'); ghost.classList.add('panel-ghost'); ghost.setAttribute('aria-hidden', 'true');
      ghost.querySelectorAll('[id]').forEach(function(e){ e.removeAttribute('id'); });
      document.body.appendChild(ghost);
      const ov = document.createElement('div'); ov.className = 'overlay-ghost'; document.body.appendChild(ov);
      setTimeout(function(){ ghost.remove(); ov.remove(); }, 280);
    }
    return _close.apply(this, arguments);
  };
})();

/* ---- 4. live numbers roll to their new value ---- */
function rollNumber(el){
  if(!el || el._rolling) return;
  const txt = el.textContent, m = txt.match(/-?\d[\d,]*\.?\d*/);
  if(!m){ el._v = null; return; }
  const to = parseFloat(m[0].replace(/,/g, '')), from = el._v;
  el._v = to;
  if(CALM || from == null || from === to || !isFinite(from)) return;
  const dec = (m[0].split('.')[1] || '').length, pre = txt.slice(0, m.index), post = txt.slice(m.index + m[0].length);
  const t0 = performance.now(), dur = 700;
  el._rolling = true; el.classList.add(to > from ? 'tick-up' : 'tick-down');
  (function step(t){
    const k = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - k, 3), v = from + (to - from) * e;
    el.textContent = pre + v.toLocaleString('en-US', { minimumFractionDigits:dec, maximumFractionDigits:dec }) + post;
    if(k < 1) requestAnimationFrame(step);
    else { el.textContent = txt; el._rolling = false; setTimeout(function(){ el.classList.remove('tick-up', 'tick-down'); }, 600); }
  })(t0);
}
(function(){
  ['hPi','piUsd'].forEach(function(id){
    const el = $(id); if(!el) return;
    rollNumber(el);
    new MutationObserver(function(){ if(!el._rolling) rollNumber(el); }).observe(el, { childList:true, characterData:true, subtree:true });
  });
})();

/* ---- 5. success moment (payments, listings) ---- */
function celebrate(title, sub, tone){
  let s = $('celebrate');
  if(!s){ s = document.createElement('div'); s.id = 'celebrate'; s.setAttribute('role', 'status'); document.body.appendChild(s); s.onclick = function(){ s.classList.remove('on'); }; }
  s.className = tone === 'gold' ? 'gold' : '';
  s.innerHTML = `<div class="cb-card"><svg class="cb-check" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29"/><path d="M19 33.5l8.5 8.5L45.5 23"/></svg><h3>${esc(title)}</h3>${sub ? '<p>' + esc(sub) + '</p>' : ''}</div>`;
  void s.offsetWidth; s.classList.add('on'); haptic([12, 40, 18]);
  clearTimeout(s._t); s._t = setTimeout(function(){ s.classList.remove('on'); }, 2600);
}
(function(){
  const _eff = applyPaymentEffect;
  applyPaymentEffect = function(metadata, amount){
    _eff.apply(this, arguments);
    if(metadata && metadata.type === 'premium') celebrate('Premium unlocked', 'Thank you for supporting DigitalSaudi', 'gold');
    else celebrate('Payment complete', amount + ' π sent · thank you!');
  };
})();

/* ---- 6. header gains depth once you scroll ---- */
(function(){
  const main = $('main'), hdr = document.querySelector('header'); if(!main || !hdr) return;
  main.addEventListener('scroll', function(){ hdr.classList.toggle('scrolled', main.scrollTop > 6); }, { passive:true });
})();

/* ==========================================================================
   v4.2 — Money: Wise-style converter, Wallet-style Pi card
   ========================================================================== */
const CUR_FLAG = { SAR:'🇸🇦', USD:'🇺🇸', EUR:'🇪🇺', GBP:'🇬🇧', AED:'🇦🇪', EGP:'🇪🇬', PKR:'🇵🇰', INR:'🇮🇳', IDR:'🇮🇩', BDT:'🇧🇩', PHP:'🇵🇭', GHS:'🇬🇭', XOF:'🌍', MYR:'🇲🇾', TRY:'🇹🇷', JOD:'🇯🇴', KWD:'🇰🇼', QAR:'🇶🇦', BHD:'🇧🇭', OMR:'🇴🇲', CNY:'🇨🇳', LKR:'🇱🇰', NPR:'🇳🇵', ETB:'🇪🇹', KES:'🇰🇪', SDN:'🇸🇩', MAD:'🇲🇦', DZD:'🇩🇿', TND:'🇹🇳', SDG:'🇸🇩', PI:'π' };
const cvState = Object.assign({ from:'SAR', to:'USD', amt:100 }, store.get('cv', {}));
function curOpts(sel){ return currencyList().map(function(c){ return `<option value="${c[0]}" ${c[0] === sel ? 'selected' : ''}>${c[0] === 'PI' ? 'π Pi' : c[0]}</option>`; }).join(''); }
function curName(code){ const c = currencyList().find(function(x){ return x[0] === code; }); return c ? c[1].replace(/^\S+\s/, '') : code; }
function digits(v){ return v == null ? 2 : v < 1 ? 6 : v < 100 ? 4 : 2; }

PANELS.converter = function(){
  showPanel('Currency converter', `
    <div class="wx">
      <div class="wx-box">
        <label for="wxAmt">You have</label>
        <div class="wx-line"><input id="wxAmt" class="wx-amt" type="text" inputmode="decimal" value="${cvState.amt}" oninput="wxCalc()" aria-label="Amount">
          <span class="wx-cur"><span class="wx-flag" id="wxFromF">${CUR_FLAG[cvState.from] || '💱'}</span><select id="wxFrom" onchange="wxCalc()" aria-label="From currency">${curOpts(cvState.from)}</select></span></div>
      </div>
      <div class="wx-mid">
        <div class="wx-rate"><span class="dot"></span><span id="wxRate">Loading live rate…</span></div>
        <button class="wx-swap" onclick="wxSwap()" aria-label="Swap currencies"><svg class="i"><use href="#i-exchange"/></svg></button>
      </div>
      <div class="wx-box wx-get">
        <label>You get</label>
        <div class="wx-line"><div class="wx-amt" id="wxOut">—</div>
          <span class="wx-cur"><span class="wx-flag" id="wxToF">${CUR_FLAG[cvState.to] || '💱'}</span><select id="wxTo" onchange="wxCalc()" aria-label="To currency">${curOpts(cvState.to)}</select></span></div>
      </div>
      <div class="chips wx-quick">${[50, 100, 500, 1000, 5000].map(function(n){ return `<button class="chip" onclick="$('wxAmt').value=${n};wxCalc()">${fmt(n)}</button>`; }).join('')}</div>
      <div class="wx-facts">
        <div><span>Rate used</span><b>Mid-market</b></div>
        <div><span>Rates updated</span><b id="wxUpd">—</b></div>
      </div>
    </div>`, { id:'converter' });
  ensureRates().then(wxCalc); wxCalc();
  setTimeout(function(){ const i = $('wxAmt'); if(i){ i.focus(); i.select(); } }, 350);
};
function wxCalc(){
  if(!$('wxAmt')) return;
  const raw = $('wxAmt').value.replace(/[^\d.]/g, ''), a = parseFloat(raw) || 0, f = $('wxFrom').value, t = $('wxTo').value;
  cvState.amt = raw || ''; cvState.from = f; cvState.to = t; store.set('cv', cvState);
  $('wxFromF').textContent = CUR_FLAG[f] || '💱'; $('wxToF').textContent = CUR_FLAG[t] || '💱';
  const r = convert(a, f, t), one = convert(1, f, t);
  $('wxOut').textContent = r == null ? '—' : fmt(r, digits(r));
  $('wxRate').innerHTML = one == null ? 'Rate unavailable offline' : `1 ${f === 'PI' ? 'π' : f} = <b>${fmt(one, digits(one))} ${t === 'PI' ? 'π' : t}</b>`;
  const fx = store.get('fx', null), pi = store.get('pi', null), stamps = [];
  if(fx && f !== 'PI' || fx && t !== 'PI') stamps.push(ago(fx.t));
  if((f === 'PI' || t === 'PI') && pi) stamps[0] = 'Pi ' + ago(pi.t);
  $('wxUpd').textContent = stamps[0] || 'offline';
}
function wxSwap(){
  const f = $('wxFrom'), t = $('wxTo'), v = f.value; f.value = t.value; t.value = v;
  const b = document.querySelector('.wx-swap'); if(b){ b.classList.remove('spin'); void b.offsetWidth; b.classList.add('spin'); }
  wxCalc(); if(typeof haptic === 'function') haptic(6);
}

/* ---------- Wallet-style Pi card ---------- */
piWalletPanel = function(){
  const me = piUser ? piUser.username : '', p = store.get('pi', null);
  const hist = store.get(histKey(), []), paid = hist.filter(function(h){ return h.status === 'completed'; }).reduce(function(s, h){ return s + Number(h.amount || 0); }, 0);
  const logo = (document.querySelector('header .mark') || {}).src || '/icon.svg';
  showPanel('Pi requests & history', `
    <div class="pcard-wrap"><div class="pcard" id="pcard">
      <div class="pc-top"><img src="${logo}" alt="" class="pc-logo"><span class="pc-brand">DigitalSaudi <b>Pi</b></span><span class="pc-net">Mainnet</span></div>
      <div class="pc-chip" aria-hidden="true"></div>
      <div class="pc-rate"><small>1 π today</small><b>${p && p.usd ? '$' + fmt(p.usd, 4) : '—'}</b>${p && p.sar ? `<span>${fmt(p.sar, 4)} SAR</span>` : ''}</div>
      <div class="pc-bottom"><div><small>Account</small><b class="notr">${me ? '@' + esc(me) : 'Guest'}</b></div><div><small>Paid via app</small><b>${fmt(paid, 2)} π</b></div></div>
    </div></div>
    <div class="acts">
      <button onclick="walletTab('req')"><span><svg class="i"><use href="#i-plus"/></svg></span>Request</button>
      <button onclick="walletTab('send')"><span><svg class="i"><use href="#i-share"/></svg></span>Send</button>
      <button onclick="openItem('merchantQR')"><span><svg class="i"><use href="#i-image"/></svg></span>Poster</button>
      <button onclick="walletTab('hist')"><span><svg class="i"><use href="#i-receipt"/></svg></span>Activity</button>
    </div>
    <div id="wBody"></div>
    <button class="row" onclick="clearStuckPayment()"><div class="ic">🧹</div><div class="tx"><b>Fix “Pending payment found”</b><small>Clears an unfinished payment so you can pay again</small></div><span class="chev">›</span></button>`, { id:'piWallet', share:false });
  walletTab(hist.length ? 'hist' : 'req');
  const c = $('pcard');
  if(c && !CALM){
    c.addEventListener('pointermove', function(e){ const r = c.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`; c.style.setProperty('--gx', (x + .5) * 100 + '%'); c.style.setProperty('--gy', (y + .5) * 100 + '%'); });
    c.addEventListener('pointerleave', function(){ c.style.transform = ''; });
  }
};
PANELS.piWallet = piWalletPanel;
(function(){
  const _wt = walletTab;
  walletTab = function(t){
    _wt(t);
    document.querySelectorAll('.acts button').forEach(function(b){ b.classList.toggle('on', (b.getAttribute('onclick') || '').indexOf("'" + t + "'") > 0); });
    if(t !== 'hist' || !$('wBody')) return;
    const list = store.get(histKey(), []);
    if(!list.length){ $('wBody').innerHTML = '<div class="empty"><div class="big">🧾</div>No payments yet. Your Premium and support payments will appear here with receipts.</div>'; return; }
    let last = '';
    $('wBody').innerHTML = '<div class="activity">' + list.map(function(h){
      const d = new Date(h.at), day = d.toLocaleDateString('en-GB', { day:'numeric', month:'long', year:'numeric' });
      const head = day !== last ? `<div class="act-day">${day}</div>` : ''; last = day;
      const st = h.status === 'completed' ? ['s-ok', 'Completed'] : h.status === 'pending' ? ['s-pend', 'Pending'] : ['s-bad', 'Cancelled'];
      return head + `<button class="act-row" onclick="openReceipt('${esc(h.id)}')"><span class="act-ic">${/premium/i.test(h.memo) ? ico('star') : ico('heart')}</span><span class="act-tx"><b>${esc(h.memo)}</b><small>${d.toLocaleTimeString('en-GB', { hour:'2-digit', minute:'2-digit' })} · <span class="status ${st[0]}">${st[1]}</span></small></span><span class="act-amt ${h.status === 'completed' ? '' : 'muted'}">−${h.amount} π</span></button>`;
    }).join('') + '</div>';
  };
})();

/* ==========================================================================
   v4.2 — Search as a command palette
   Smart answers (convert, prayer, Pi price, places), grouped results with
   highlighting, typo tolerance, recent searches, and "Ask Saudi AI".
   ========================================================================== */
const SR_GROUP = { v:'Visas', g:'Government services', l:'Daily life', c:'Cities & career', x:'Experiences', k:'Saudi knowledge', s:'Safety', t:'Travel' };
const SR_PLACES = [[/hotel|stay|accommodation|apartment/, 'hotels', 'Hotels'], [/restaurant|food|eat|dinner|lunch|breakfast|mandi|kabsa/, 'food', 'Restaurants'], [/cafe|coffee|qahwa/, 'cafes', 'Cafés'],
  [/mosque|masjid|pray here/, 'mosques', 'Mosques'], [/hospital|clinic|doctor|emergency room/, 'health', 'Hospitals'], [/pharmac|medicine|chemist/, 'pharmacy', 'Pharmacies'], [/mall|shopping/, 'malls', 'Malls'],
  [/atm|bank|cash|exchange shop|money changer/, 'money', 'Banks & ATMs'], [/fuel|petrol|gas station/, 'fuel', 'Fuel'], [/station|airport|metro|train|bus/, 'transport', 'Stations'], [/museum|attraction|park|things to do|visit/, 'attractions', 'Attractions'], [/pi merchant|accepts? pi|pay with pi/, 'pi', 'Pi merchants']];
let srIndexCache = null, srFilter = 'all';
function srIndex(){
  if(srIndexCache) return srIndexCache;
  const out = [];
  searchIndex().forEach(function(it){
    let g = 'Tools';
    if(it.s === 'Live') g = 'Live';
    else if(/^Arabic phrase/.test(it.s || '')) g = 'Arabic phrases';
    else if(/^Dua/.test(it.s || '')) g = 'Duas';
    else if(/^[a-z]-/.test(it.id)) g = SR_GROUP[it.id[0]] || 'Guides';
    else if(['quran','duas','tasbih','qibla','calendar','zakat','hajj','umrah','madinah','umrahPack'].indexOf(it.id) >= 0) g = 'Islamic';
    out.push(Object.assign({ g:g, tl:String(it.t).toLowerCase() }, it));
  });
  return (srIndexCache = out);
}
function srLev1(a, b){ // true if words differ by at most one edit
  if(Math.abs(a.length - b.length) > 1) return false;
  let i = 0, j = 0, e = 0;
  while(i < a.length && j < b.length){ if(a[i] === b[j]){ i++; j++; continue; } if(++e > 1) return false; if(a.length > b.length) i++; else if(b.length > a.length) j++; else { i++; j++; } }
  return e + (a.length - i) + (b.length - j) <= 1;
}
function srScore(it, terms, q){
  let s = 0;
  if(it.tl === q) s += 100; else if(it.tl.indexOf(q) === 0) s += 60; else if(it.tl.indexOf(q) >= 0) s += 40;
  for(const t of terms){
    if(it.tl.indexOf(t) >= 0) s += 12;
    else if(it.x.indexOf(t) >= 0) s += 4;
    else if(t.length >= 4 && it.tl.split(/\W+/).some(function(w){ return srLev1(w, t); })) s += 6;
    else return 0;
  }
  if(it.g === 'Tools' || it.g === 'Islamic' || it.g === 'Live') s += 3;
  return s;
}
function srMark(text, terms){
  let h = esc(text);
  terms.filter(function(t){ return t.length > 1; }).forEach(function(t){ h = h.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '<mark>$1</mark>'); });
  return h;
}
function srGo(kind, a, b){
  const q = ($('sq') || {}).value || '';
  if(q.trim()){ const r = store.get('sq_recent', []).filter(function(x){ return x !== q.trim(); }); r.unshift(q.trim()); store.set('sq_recent', r.slice(0, 8)); }
  if(kind === 'item') openItem(a);
  else if(kind === 'map'){ closePanel(); openMap(a, true); }
  else if(kind === 'ai'){ openAI('general'); setTimeout(function(){ const i = $('aiIn'); if(i){ i.value = b; i.focus(); } }, 120); }
  else if(kind === 'conv'){ Object.assign(cvState, b); store.set('cv', cvState); openItem('converter'); }
  else if(kind === 'live'){ closePanel(); openLive(a); }
}
/* smart answers */
const SR_CUR_WORDS = { riyal:'SAR', riyals:'SAR', sar:'SAR', sr:'SAR', dollar:'USD', dollars:'USD', usd:'USD', naira:'NGN', ngn:'NGN', euro:'EUR', euros:'EUR', eur:'EUR', pound:'GBP', pounds:'GBP', gbp:'GBP', pi:'PI', 'π':'PI', rupee:'INR', rupees:'INR', inr:'INR', pkr:'PKR', dirham:'AED', aed:'AED', egp:'EGP', rupiah:'IDR', idr:'IDR', cedi:'GHS', ghs:'GHS', cfa:'XOF', xof:'XOF' };
function srCode(w){ w = (w || '').toLowerCase(); if(SR_CUR_WORDS[w]) return SR_CUR_WORDS[w]; const u = w.toUpperCase(); return currencyList().some(function(c){ return c[0] === u; }) ? u : null; }
function srAnswers(q){
  const out = [];
  // 1) currency: "100 sar to usd", "50 usd", "10 pi in euro"
  const m = q.match(/^([\d.,]+)\s*([a-zπ]+)(?:\s+(?:to|in|=|into)\s+([a-zπ]+))?$/i) || q.match(/^([a-zπ]+)\s*([\d.,]+)(?:\s+(?:to|in)\s+([a-zπ]+))?$/i);
  if(m){
    const num = /^\d/.test(m[1]) ? m[1] : m[2], c1 = srCode(/^\d/.test(m[1]) ? m[2] : m[1]), amt = parseFloat(num.replace(/,/g, ''));
    let c2 = srCode(m[3]) || (c1 === 'SAR' ? (store.get('cv', {}).to && store.get('cv', {}).to !== 'SAR' ? store.get('cv', {}).to : 'USD') : 'SAR');
    const r = c1 && amt ? convert(amt, c1, c2) : null;
    if(r != null) out.push(`<button class="sr-answer" onclick='srGo("conv",0,${JSON.stringify({ from:c1, to:c2, amt:String(amt) })})'><span class="sa-ic">${ico('exchange')}</span><span class="sa-tx"><small>${fmt(amt)} ${c1 === 'PI' ? 'π' : c1} equals</small><b>${fmt(r, digits(r))} ${c2 === 'PI' ? 'π' : c2}</b><small>Live mid-market rate · open converter ›</small></span></button>`);
  }
  // 2) prayer times
  if(/\b(prayer|salah|salat|namaz|adhan|azan|fajr|dhuhr|zuhr|asr|maghrib|isha)\b/i.test(q) && typeof timings !== 'undefined' && timings){
    const n = nextPrayer();
    out.push(`<button class="sr-answer" onclick="closePanel();switchTab('tools')"><span class="sa-ic">${ico('mosque')}</span><span class="sa-tx"><small>Next prayer in ${esc(prayerCity())}</small><b>${n ? n.name + ' · ' + n.time : '—'}</b><small>${PRAYERS.filter(function(p){ return p !== 'Sunrise'; }).map(function(p){ return p + ' ' + timings[p]; }).join(' · ')}</small></span></button>`);
  }
  // 3) Pi price
  if(/\bpi\b.*\b(price|rate|value|worth|usd|dollar)|\b(price|rate)\b.*\bpi\b|^pi$/i.test(q)){
    const p = store.get('pi', null);
    if(p && p.usd) out.push(`<button class="sr-answer" onclick="srGo('live','markets')"><span class="sa-ic">${ico('pi')}</span><span class="sa-tx"><small>Pi Network · live</small><b>$${fmt(p.usd, 4)} <span class="${(p.change || 0) >= 0 ? 'up' : 'down'}" style="font-size:14px">${(p.change || 0) >= 0 ? '▲' : '▼'} ${Math.abs(p.change || 0).toFixed(2)}%</span></b><small>${p.sar ? fmt(p.sar, 4) + ' SAR · ' : ''}open markets ›</small></span></button>`);
  }
  // 4) places near me
  SR_PLACES.forEach(function(p){ if(p[0].test(q)) out.push(`<button class="sr-answer sr-slim" onclick="srGo('map','${p[1]}')"><span class="sa-ic">${ico('pin')}</span><span class="sa-tx"><b>${p[2]} near you</b><small>Open the map</small></span></button>`); });
  return out.slice(0, 3).join('');
}
openSearch = function(){
  srIndexCache = null;
  showPanel('Search', `<div class="sr-box"><svg class="i"><use href="#i-search"/></svg><input id="sq" dir="auto" type="search" placeholder="Search guides, tools, places, phrases…" oninput="runSearch(this.value)" autocomplete="off" enterkeyhint="search"><button class="sr-clear" onclick="$('sq').value='';runSearch('');$('sq').focus()" aria-label="Clear">✕</button></div>
    <div class="chips sr-filters" id="srF"></div><div id="sres"></div>`, { id:'search', share:false });
  srFilter = 'all'; runSearch(''); setTimeout(function(){ const i = $('sq'); if(i) i.focus(); }, 300);
};
runSearch = function(raw){
  const q = String(raw || '').trim().toLowerCase(), box = $('sres'); if(!box) return;
  document.querySelector('.sr-box') && document.querySelector('.sr-box').classList.toggle('has', !!q);
  if(!q){
    $('srF').innerHTML = '';
    const rec = store.get('sq_recent', []);
    const quick = [['exchange', 'Convert', "srGo('item','converter')"], ['mosque', 'Prayer', "closePanel();switchTab('tools')"], ['pin', 'Near me', "srGo('map','all')"], ['spark', 'Ask AI', "srGo('ai',0,'')"], ['pi', 'Pi price', "srGo('live','markets')"]];
    box.innerHTML = `<div class="sr-quick">${quick.map(function(x){ return `<button onclick="${x[2]}"><span>${ico(x[0])}</span>${x[1]}</button>`; }).join('')}</div>` +
      (rec.length ? `<div class="sr-h"><span>Recent searches</span><button onclick="store.set('sq_recent',[]);runSearch('')">Clear</button></div><div class="chips sr-recent">${rec.map(function(r){ return `<button class="chip" onclick="$('sq').value=this.textContent;runSearch(this.textContent)">${esc(r)}</button>`; }).join('')}</div>` : '') +
      `<div class="sr-h"><span>Try</span></div><div class="chips">${['100 SAR to USD', 'pharmacy near me', 'Umrah steps', 'work visa', 'thank you in Arabic', 'Maghrib'].map(function(r){ return `<button class="chip" onclick="$('sq').value=this.textContent;runSearch(this.textContent)">${r}</button>`; }).join('')}</div>` +
      `<div class="sr-h"><span>Popular</span></div>` + ['umrah','visas','nearMe','scores','piHub','whatToDo'].map(rowHTML).join('');
    return;
  }
  const terms = q.split(/\s+/).filter(Boolean), seen = {};
  const res = srIndex().map(function(it){ return { it:it, s:srScore(it, terms, q) }; }).filter(function(r){ if(!r.s) return false; const k = r.it.id + '|' + r.it.t; if(seen[k]) return false; seen[k] = 1; return true; })
    .sort(function(a, b){ return b.s - a.s; });
  const groups = [], byG = {};
  res.forEach(function(r){ if(!byG[r.it.g]){ byG[r.it.g] = []; groups.push(r.it.g); } byG[r.it.g].push(r.it); });
  $('srF').innerHTML = groups.length > 1 ? ['all'].concat(groups).map(function(g){ return `<button class="chip ${srFilter === g ? 'on' : ''}" onclick="srFilter='${g}';runSearch($('sq').value)">${g === 'all' ? 'All · ' + res.length : esc(g) + ' · ' + byG[g].length}</button>`; }).join('') : '';
  if(srFilter !== 'all' && !byG[srFilter]) srFilter = 'all';
  const shown = srFilter === 'all' ? groups : [srFilter];
  const ans = srFilter === 'all' ? srAnswers(q) : '';
  const list = shown.map(function(g){
    const items = byG[g].slice(0, srFilter === 'all' ? 5 : 40);
    return `<div class="sr-h"><span>${esc(g)}</span>${srFilter === 'all' && byG[g].length > 5 ? `<button onclick="srFilter='${g}';runSearch($('sq').value)">See all ${byG[g].length}</button>` : ''}</div>` +
      items.map(function(it){ return `<button class="row sr-row" onclick="srGo('item','${it.id}')"><div class="ic">${it.ic || '•'}</div><div class="tx"><b>${srMark(it.t, terms)}</b>${it.s ? '<small>' + srMark(it.s, terms) + '</small>' : ''}</div><span class="chev">›</span></button>`; }).join('');
  }).join('');
  const ai = `<button class="sr-answer sr-ai" onclick="srGo('ai',0,${JSON.stringify(String(raw).trim()).replace(/"/g, '&quot;')})"><span class="sa-ic">${ico('spark')}</span><span class="sa-tx"><b>Ask Saudi AI</b><small>“${esc(String(raw).trim())}”</small></span></button>`;
  box.innerHTML = ans + (list || (ans ? '' : `<div class="empty" style="padding:18px 8px"><div class="big">🔎</div>No matches for “${esc(raw)}”. Check the spelling or try a shorter word.</div>`)) + ai;
};

/* ==========================================================================
   v4.3 — Polish toward 10/10
   1 Accessibility  2 Gestures  3 Guide reading + official sources
   4 Jump back in + wider search  5 Self-healing live data
   ========================================================================== */

/* ---------------- 1. Accessibility ---------------- */
(function(){
  const panel = $('panel'), title = $('pTitle'), toastEl = $('toast');
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-labelledby', 'pTitle');
  title.setAttribute('tabindex', '-1');
  toastEl.setAttribute('role', 'status'); toastEl.setAttribute('aria-live', 'polite');
  if($('offline')){ $('offline').setAttribute('role', 'status'); $('offline').setAttribute('aria-live', 'polite'); }
  $('main').setAttribute('aria-label', 'Content'); $('nav').setAttribute('aria-label', 'Main');
  let lastFocus = null;
  const _show = showPanel;
  showPanel = function(){
    if(!panel.classList.contains('open')) lastFocus = document.activeElement;
    const r = _show.apply(this, arguments);
    $('app').setAttribute('aria-hidden', 'true');
    setTimeout(function(){ if(panel.classList.contains('open') && !panel.contains(document.activeElement)) title.focus({ preventScroll:true }); }, 80);
    return r;
  };
  const _close = closePanel;
  closePanel = function(){
    const r = _close.apply(this, arguments);
    $('app').removeAttribute('aria-hidden');
    if(lastFocus && document.contains(lastFocus) && lastFocus.focus) try{ lastFocus.focus({ preventScroll:true }); }catch(e){}
    lastFocus = null; return r;
  };
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape'){
      if($('celebrate') && $('celebrate').classList.contains('on')) return $('celebrate').classList.remove('on');
      if($('langSheet') && $('langSheet').classList.contains('open')) return $('langSheet').classList.remove('open');
      if(panel.classList.contains('open')) closePanel();
    }
  });
  // name things a screen reader would otherwise read as emoji or nothing
  const NAMES = { '🌙':'Dark theme', '☀️':'Light theme', 'A-':'Smaller text', 'A':'Normal text', 'A+':'Larger text', 'A++':'Largest text', '☆':'Bookmark', '★':'Bookmarked', '📤':'Share', '✕':'Clear', '➤':'Send' };
  function fix(root){
    if(!root || root.nodeType !== 1) return;
    root.querySelectorAll('svg.i').forEach(function(s){ s.setAttribute('aria-hidden', 'true'); s.setAttribute('focusable', 'false'); });
    root.querySelectorAll('button:not([aria-label])').forEach(function(b){ const t = b.textContent.replace(/️/g, '').trim(); if(NAMES[t] || NAMES[t + '️']) b.setAttribute('aria-label', NAMES[t] || NAMES[t + '️']); });
    root.querySelectorAll('.toggle').forEach(function(t){ t.setAttribute('role', 'switch'); t.setAttribute('aria-checked', t.classList.contains('on') ? 'true' : 'false');
      const lab = t.closest('.setting') && t.closest('.setting').querySelector('b'); if(lab && !t.getAttribute('aria-label')) t.setAttribute('aria-label', lab.textContent.trim()); });
    root.querySelectorAll('select:not([aria-label])').forEach(function(s){ const f = s.closest('.field, .setting'), l = f && f.querySelector('label, b'); s.setAttribute('aria-label', l ? l.textContent.trim() : (s.id === 'prayerCity' || s.id === 'wxCity' ? 'City' : 'Choose')); });
    root.querySelectorAll('.ic, .ni, .pp-i, .sa-ic, .act-ic').forEach(function(e){ e.setAttribute('aria-hidden', 'true'); });
  }
  fix(document.body);
  new MutationObserver(function(ms){ ms.forEach(function(m){
    if(m.type === 'attributes' && m.target.classList && m.target.classList.contains('toggle')) m.target.setAttribute('aria-checked', m.target.classList.contains('on') ? 'true' : 'false');
    m.addedNodes && m.addedNodes.forEach(fix);
  }); }).observe(document.body, { childList:true, subtree:true, attributes:true, attributeFilter:['class'] });
  // tell assistive tech which tab is current
  const _tab = switchTab;
  switchTab = function(n){ _tab(n); document.querySelectorAll('nav button[data-tab]').forEach(function(b){ if(b.classList.contains('active')) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current'); }); };
  document.querySelectorAll('nav button[data-tab].active').forEach(function(b){ b.setAttribute('aria-current', 'page'); });
})();

/* ---------------- 2. Gestures ---------------- */
(function(){
  // swipe the sheet down to close (from its header, or from the top of its content)
  const panel = $('panel'), body = $('pBody'), head = panel.querySelector('.p-head');
  let y0 = null, dy = 0, fromHead = false;
  panel.addEventListener('touchstart', function(e){
    if(e.touches.length !== 1) return;
    fromHead = head.contains(e.target); if(!fromHead && body.scrollTop > 0) { y0 = null; return; }
    if(e.target.closest('input,textarea,select,.leaflet-container,.hscroll,.chips,.pcard')) { y0 = null; return; }
    y0 = e.touches[0].clientY; dy = 0; panel.style.transition = 'none';
  }, { passive:true });
  panel.addEventListener('touchmove', function(e){
    if(y0 == null) return; dy = e.touches[0].clientY - y0;
    if(dy > 0 && (fromHead || body.scrollTop <= 0)){ panel.style.transform = 'translateY(' + dy + 'px)'; }
  }, { passive:true });
  panel.addEventListener('touchend', function(){
    if(y0 == null) return; panel.style.transition = 'transform .25s cubic-bezier(.2,.8,.2,1)';
    if(dy > 110){ panel.style.transform = 'translateY(100%)'; setTimeout(function(){ panel.style.transform = ''; panel.style.transition = ''; closePanel(); }, 200); haptic(8); }
    else panel.style.transform = '';
    y0 = null;
  });
  // pull to refresh on Home and Live
  const main = $('main'), ptr = document.createElement('div'); ptr.id = 'ptr'; ptr.setAttribute('aria-hidden', 'true'); ptr.innerHTML = ico('exchange'); document.body.appendChild(ptr);
  let p0 = null, pd = 0, busy = false;
  main.addEventListener('touchstart', function(e){ p0 = (main.scrollTop <= 0 && (activeTab === 'home' || activeTab === 'live') && !busy) ? e.touches[0].clientY : null; pd = 0; }, { passive:true });
  main.addEventListener('touchmove', function(e){ if(p0 == null) return; pd = Math.max(0, e.touches[0].clientY - p0); const k = Math.min(1, pd / 90);
    ptr.style.opacity = k; ptr.style.transform = 'translate(-50%,' + (pd * .5) + 'px) rotate(' + (pd * 3) + 'deg)'; ptr.classList.toggle('ready', k >= 1); }, { passive:true });
  main.addEventListener('touchend', function(){
    if(p0 == null) return; p0 = null;
    if(pd >= 90){ busy = true; ptr.classList.add('spin'); haptic(10); refreshNow().then(function(){ setTimeout(function(){ busy = false; ptr.classList.remove('spin', 'ready'); ptr.style.opacity = 0; ptr.style.transform = ''; }, 400); }); }
    else { ptr.style.opacity = 0; ptr.style.transform = ''; }
  });
  // swipe left/right between Live sections
  const live = $('tab-live'); let sx = null, sy = null;
  live.addEventListener('touchstart', function(e){ if(e.target.closest('.chips,.hscroll,.tbl,input,select')) { sx = null; return; } sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive:true });
  live.addEventListener('touchend', function(e){
    if(sx == null) return; const dx = e.changedTouches[0].clientX - sx, dyy = Math.abs(e.changedTouches[0].clientY - sy); sx = null;
    if(Math.abs(dx) < 70 || dyy > 50) return;
    const order = ['news','scores','markets','weather','events'], i = order.indexOf(liveView), rtl = document.documentElement.dir === 'rtl';
    const n = order[i + ((dx < 0) !== rtl ? 1 : -1)]; if(n){ openLive(n); haptic(6); const b = document.querySelector('#liveSeg button[data-v="' + n + '"]'); if(b) b.scrollIntoView({ inline:'center', block:'nearest', behavior:'smooth' }); }
  });
})();
function refreshNow(){
  const jobs = [];
  try{ if(activeTab === 'live'){ if(liveView === 'news'){ newsReset(); } else openLive(liveView); }
    else { jobs.push(loadPi(true).then(function(){ renderMarkets(); }).catch(function(){})); loadPrayer(true); if(typeof loadHomeNews === 'function') loadHomeNews(); if(typeof loadHomeWeather === 'function') loadHomeWeather(); } }catch(e){}
  return Promise.all(jobs).then(function(){ toast('Updated just now'); });
}

/* ---------------- 3. Guide reading + official sources ---------------- */
const GUIDE_CAT = { v:['Visas', 'passport', 'var(--t-sky)'], g:['Government services', 'landmark', 'var(--t-teal)'], l:['Daily life', 'house', 'var(--t-sand)'], c:['Cities & career', 'city', 'var(--t-lav)'],
  x:['Experiences', 'compass', 'var(--t-rose)'], k:['Saudi knowledge', 'book', 'var(--t-teal)'], s:['Safety', 'shield', 'var(--t-rose)'], t:['Travel', 'luggage', 'var(--t-sky)'] };
const GUIDE_PANELS = { umrah:['Islamic', 'kaaba', 'var(--accent)'], hajj:['Islamic', 'kaaba', 'var(--accent)'], madinah:['Islamic', 'mosque', 'var(--accent)'], visas:['Visas', 'passport', 'var(--t-sky)'],
  eservices:['Government services', 'landmark', 'var(--t-teal)'], etiquette:['Culture', 'handshake', 'var(--t-sand)'], emergency:['Safety', 'sos', 'var(--t-rose)'], train:['Travel', 'train', 'var(--t-sky)'] };
const OFFICIAL = {
  visa:['visa.mofa.gov.sa', 'https://visa.mofa.gov.sa', 'Ministry of Foreign Affairs — visa platform'],
  nusuk:['nusuk.sa', 'https://www.nusuk.sa', 'Nusuk — Ministry of Hajj and Umrah'],
  absher:['absher.sa', 'https://www.absher.sa', 'Absher — Ministry of Interior'],
  moh:['moh.gov.sa', 'https://www.moh.gov.sa', 'Ministry of Health'],
  hrsd:['hrsd.gov.sa', 'https://www.hrsd.gov.sa', 'Ministry of Human Resources'],
  visit:['visitsaudi.com', 'https://www.visitsaudi.com', 'Visit Saudi — official tourism site']
};
function sourcesFor(id){
  const p = id[0], s = [];
  if(/^v-|^visas$/.test(id)) s.push('visa');
  if(/^eservices$/.test(id)) s.push('absher');
  if(/umrah|hajj|madinah|nusuk/.test(id)) s.push('nusuk');
  if(/absher|passport|v-work|v-family|s-docs/.test(id)) s.push('absher');
  if(/health|medical|sehhaty|heat/.test(id)) s.push('moh');
  if(/job|qiwa|v-work|cv|interview|roadmap/.test(id)) s.push('hrsd');
  if(/^[xck]-/.test(id) && !/job|cv|interview|roadmap/.test(id)) s.push('visit');
  return s.filter(function(v, i, a){ return a.indexOf(v) === i; }).slice(0, 3);
}
(function(){
  const _open = openItem;
  openItem = function(id){
    const r = _open.apply(this, arguments);
    const body = $('pBody');
    let c = allContent().find(function(x){ return x.id === id; });
    if(!c && GUIDE_PANELS[id] && META[id]) c = { id:id, t:META[id].t, s:META[id].s, body:body ? body.innerHTML : '' };
    if(!c || !body || !current || current.id !== id || body.querySelector('.g-hero')) return r;
    let cat = GUIDE_PANELS[id] || GUIDE_CAT[/^[a-z]-/.test(id) ? id[0] : ''] || ['Guide', 'book', 'var(--accent)'];
    if(/^c-/.test(id)) cat = /cv|interview|roadmap|jobs/.test(id) ? ['Career', 'briefcase', 'var(--t-lav)'] : ['Cities', 'city', 'var(--t-lav)'];   // v6.3: cities and career were sharing one label
    const words = (c.body || '').replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length, mins = Math.max(1, Math.round(words / 200));
    const steps = body.querySelectorAll('h4').length;
    body.insertAdjacentHTML('afterbegin', `<div class="g-hero" style="--ic:${cat[2]}"><div class="g-art" aria-hidden="true"><span class="g-ic">${ico(cat[1])}</span></div><div class="g-tx"><small>${esc(t(cat[0]))} · ${mins} ${esc(t('min read'))}${steps > 2 ? ' · ' + steps + ' ' + esc(t('sections')) : ''}</small><h2>${esc(c.t)}</h2>${c.s ? '<p>' + esc(c.s) + '</p>' : ''}</div></div>`);
    // v6.3: drop the plain "Official source: xyz" lines that repeat the sources card below
    const src = sourcesFor(id);
    if(src.length){
      body.querySelectorAll('h4').forEach(function(h){ if(/^Official source$/i.test(h.textContent.trim())){ const n = h.nextElementSibling; if(n && n.tagName === 'P' && /^[\w.-]+\.(sa|com)$/i.test(n.textContent.trim())) n.remove(); h.remove(); } });
      body.querySelectorAll('p').forEach(function(q){ const x = q.textContent.trim(); if(/^[\w.-]+\.(sa|com)$/i.test(x) && src.some(function(k){ return OFFICIAL[k][0] === x; })) q.remove(); });
    }
    if(src.length){
      const rv = body.querySelector('.reviewed');
      const note = src.every(function(k){ return k === 'visit'; }) ? 'Opening times and prices change — check the official site before you go.' : 'Rules and fees change — always confirm on the official site before you apply or pay.';
      const html = `<div class="g-src"><b>${esc(t('Official sources'))}</b>${src.map(function(k){ const o = OFFICIAL[k]; return `<a href="${o[1]}" target="_blank" rel="noopener"><span>${ico('shield')}</span><span><b class="notr">${o[0]}</b><small>${esc(t(o[2]))}</small></span><span class="chev">›</span></a>`; }).join('')}</div>`;
      if(rv) rv.insertAdjacentHTML('beforebegin', html); else body.insertAdjacentHTML('beforeend', html);
    }
    return r;
  };
})();

/* ---------------- 4. Jump back in + wider search ---------------- */
function renderJumpBack(){
  const host = $('jumpBack'); if(!host) return;
  const rec = store.get('recent', []).filter(function(id){ return itemInfo(id); }).slice(0, 6);
  if(!rec.length){ host.innerHTML = ''; host.style.display = 'none'; return; }
  host.style.display = '';
  host.innerHTML = `<h2 class="sec">Jump back in</h2><div class="hscroll jb">${rec.map(function(id){ const m = itemInfo(id); return `<button class="jb-i" onclick="openItem('${id}')"><span class="ic">${m.ic}</span><b>${esc(m.short || m.t)}</b></button>`; }).join('')}</div>`;
}
(function(){
  const qa = $('quickActions'); if(!qa) return;
  const h = qa.previousElementSibling;
  const box = document.createElement('div'); box.id = 'jumpBack';
  (h && h.classList.contains('sec') ? h : qa).insertAdjacentElement('beforebegin', box);
  renderJumpBack();
  const _tab = switchTab; switchTab = function(n){ _tab(n); if(n === 'home') renderJumpBack(); };
})();
(function(){
  const _idx = srIndex;
  srIndex = function(){
    const base = _idx().filter(function(x){ return !x._dyn; });
    const extra = [];
    ((typeof news !== 'undefined' && news.items) || []).slice(0, 60).forEach(function(n){ extra.push({ _dyn:1, id:'__news:' + n.id, t:n.title, s:'News · ' + n.source, ic:'📰', g:'News', tl:n.title.toLowerCase(), x:(n.title + ' ' + (n.summary || '') + ' ' + n.source).toLowerCase() }); });
    store.get('savedPlaces', []).forEach(function(p){ extra.push({ _dyn:1, id:'__place:' + p.id, t:p.name, s:'Saved place · ' + (p.city || ''), ic:'📍', g:'Saved places', tl:p.name.toLowerCase(), x:(p.name + ' ' + p.cat + ' ' + (p.city || '')).toLowerCase() }); });
    store.get('dir_cache', []).forEach(function(b){ extra.push({ _dyn:1, id:'__biz:' + b.id, t:b.name, s:b.category + ' · ' + b.city + (b.accepts_pi ? ' · accepts Pi' : ''), ic:b.accepts_pi ? 'π' : '🏪', g:'Businesses', tl:String(b.name).toLowerCase(), x:(b.name + ' ' + b.category + ' ' + b.city + ' ' + (b.description || '') + (b.accepts_pi ? ' pi merchant' : '')).toLowerCase() }); });
    return base.concat(extra);
  };
  const _go = srGo;
  srGo = function(kind, a, b){
    if(kind === 'item' && /^__/.test(a)){
      const v = a.split(':'), t = v[0], id = a.slice(t.length + 1);
      const q = ($('sq') || {}).value || ''; if(q.trim()){ const r = store.get('sq_recent', []).filter(function(x){ return x !== q.trim(); }); r.unshift(q.trim()); store.set('sq_recent', r.slice(0, 8)); }
      if(t === '__news') return openArticle(id);
      if(t === '__place') return openPlace(id);
      if(t === '__biz') return openBiz(isNaN(+id) ? id : +id);
    }
    return _go.apply(this, arguments);
  };
})();

/* ---------------- 5. Self-healing live data ---------------- */
window.addEventListener('online', function(){ setTimeout(function(){ refreshNow(); }, 600); });
document.addEventListener('visibilitychange', function(){
  if(document.visibilityState !== 'visible') return;
  const p = store.get('pi', null);
  if(!p || Date.now() - (p.t || 0) > 5 * 60000){ try{ loadPi(true).then(function(){ renderMarkets(); }).catch(function(){}); }catch(e){} }
  try{ if(timings && typeof tickPrayer === 'function') tickPrayer(); }catch(e){}
});

/* ==========================================================================
   v5.0 — Story-style welcome (4 pages) — the entry screen itself.
   Pages advance on their own (progress bars), tap right/left to move,
   hold to pause, swipe, keyboard, pause button. Sign in with Pi and
   Continue as guest are on every page. Reduced motion: no auto-advance.
   ========================================================================== */
const OB_DOMAIN = 'digitalsaudi.pi', OB_N = 4, OB_MS = 6000;   // 4 scenes × 6 s = 24 s
let obI = 0, obReplay = false, obHold = false, obUserPause = false, obHidden = false;
function obEl(){ return $('intro'); }
function obOpen(){ const el = obEl(); return !!el && (el.classList.contains('open') || document.documentElement.classList.contains('intro-first')); }
function obPaused(){ return obHold || obUserPause || obHidden || CALM; }
function obSync(){
  const el = obEl(); if(!el) return;
  el.classList.toggle('paused', obPaused());
  const pb = $('obPause');
  if(pb){ const p = obUserPause; pb.classList.toggle('is-paused', p); pb.setAttribute('aria-label', t(p ? 'Play' : 'Pause')); pb.setAttribute('aria-pressed', p ? 'true' : 'false'); }
}
function obRender(){
  const el = obEl(); if(!el) return;
  el.style.setProperty('--ob-ms', OB_MS + 'ms');
  el.classList.toggle('calm', !!CALM);
  el.querySelectorAll('.st-scene').forEach(function(s, i){
    const on = i === obI; s.classList.toggle('on', on);
    if(on){ s.classList.remove('play'); void s.offsetWidth; s.classList.add('play'); }
  });
  el.querySelectorAll('.st-txt').forEach(function(s, i){
    const on = i === obI; s.classList.toggle('on', on); s.setAttribute('aria-hidden', on ? 'false' : 'true');
    if(on){ s.classList.remove('play'); void s.offsetWidth; s.classList.add('play'); }
  });
  const bars = el.querySelectorAll('.st-bar');
  bars.forEach(function(b, i){ b.classList.remove('on'); b.classList.toggle('done', i < obI); b.setAttribute('aria-current', i === obI ? 'step' : 'false'); b.setAttribute('aria-label', t('Page') + ' ' + (i + 1) + ' / ' + OB_N); });
  if(bars[obI]){ void bars[obI].offsetWidth; bars[obI].classList.add('on'); }
  const inApp = obReplay && typeof entered !== 'undefined' && entered;
  el.classList.toggle('replay', inApp);
  el.classList.toggle('last', obI === OB_N - 1);
  const lb = $('loginBtn'); if(lb) lb.classList.toggle('hide', inApp && !!(typeof piUser !== 'undefined' && piUser));
  const g = $('obGuestT'); if(g) g.textContent = t(inApp ? 'Back to the app' : 'Get Started');
  const h = el.querySelectorAll('.st-txt h2')[obI];
  if(h && $('obLive')) $('obLive').textContent = (obI + 1) + ' / ' + OB_N + ' — ' + h.textContent;
  obSync();
}
function obGo(i){ obI = Math.max(0, Math.min(OB_N - 1, i)); obRender(); if(typeof haptic === 'function') haptic(6); }
function obStep(d){ obGo(obI + d); }
function obTogglePause(){ obUserPause = !obUserPause; obSync(); }
function obClose(){
  try{ sessionStorage.setItem('ds_film_session', '1'); }catch(e){}
  store.set('intro_done', true); store.set('onboarded', true);
  if(!store.get('persona', null)) store.set('persona', 'visitor');
  const el = obEl(); if(!el) return;
  document.documentElement.classList.remove('intro-first');
  document.removeEventListener('keydown', obKeys);
  if(!el.classList.contains('open')) { el.style.display = 'none'; return; }
  el.classList.add('leaving');
  setTimeout(function(){ el.classList.remove('open', 'leaving'); el.style.display = 'none'; }, 430);
}
/* Continue as guest (or Back to the app when replayed from Settings) */
function obGuest(){
  const replay = obReplay; obReplay = false; obClose();
  if(!(replay && typeof entered !== 'undefined' && entered)) enterApp();
}
/* Sign in with Pi — on success piLogin() calls enterApp(), which closes this screen */
function obSignIn(){ piLogin(); }
/* older entry point (Settings, tests): close and show the classic Welcome screen */
function obFinish(){
  const replay = obReplay; obReplay = false; obClose();
  if(!replay && !(typeof entered !== 'undefined' && entered)){ const s = $('splash'); if(s){ s.classList.remove('sp-enter'); void s.offsetWidth; s.classList.add('sp-enter'); } spPlay(); }
}
function obKeys(e){
  if(!obOpen() || e.defaultPrevented) return;
  const rtl = document.documentElement.dir === 'rtl';
  if(e.key === 'ArrowRight') obStep(rtl ? -1 : 1);
  else if(e.key === 'ArrowLeft') obStep(rtl ? 1 : -1);
}
function showIntro(replay){
  obReplay = !!replay; obI = 0; obUserPause = false; obHold = false;
  const el = obEl(); if(!el) return;
  el.style.display = ''; el.classList.add('open');
  obRender();
  document.addEventListener('keydown', obKeys);
}
(function(){
  const el = obEl(); if(!el) return;
  /* the bar finishing moves to the next page; the last scene stays on Get Started */
  el.addEventListener('animationend', function(e){
    if(e.animationName === 'st-fill' && obOpen() && e.target.closest('.st-bar.on') && obI < OB_N - 1) obStep(1);
  });
  let x0 = null, y0 = 0, dx = 0, dy = 0, holdT = null;
  el.addEventListener('pointerdown', function(e){
    if(e.target.closest('button,a')) return;
    x0 = e.clientX; y0 = e.clientY; dx = 0; dy = 0;
    clearTimeout(holdT); holdT = setTimeout(function(){ obHold = true; el.classList.add('holding'); obSync(); }, 240);
  });
  el.addEventListener('pointermove', function(e){
    if(x0 == null) return; dx = e.clientX - x0; dy = e.clientY - y0;
    if(Math.abs(dx) > 10 || Math.abs(dy) > 10) clearTimeout(holdT);
  });
  function end(e, cancel){
    clearTimeout(holdT);
    if(obHold){ obHold = false; el.classList.remove('holding'); obSync(); x0 = null; return; }
    if(x0 == null) return;
    const rtl = document.documentElement.dir === 'rtl', fwd = rtl ? -1 : 1;
    if(!cancel){
      if(Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) obStep(dx < 0 ? fwd : -fwd);
      else if(Math.abs(dx) < 10 && Math.abs(dy) < 10){
        const r = el.getBoundingClientRect(), rel = (e.clientX - r.left) / r.width;
        obStep((rtl ? rel > .7 : rel < .3) ? -1 : 1);
      }
    }
    x0 = null;
  }
  el.addEventListener('pointerup', function(e){ end(e, false); });
  el.addEventListener('pointercancel', function(e){ end(e, true); });
  el.addEventListener('contextmenu', function(e){ e.preventDefault(); });
  document.addEventListener('visibilitychange', function(){ obHidden = document.visibilityState !== 'visible'; obSync(); });
  /* signing in or entering the app always closes this screen */
  const _enter = enterApp;
  enterApp = function(){ if(obOpen()) obClose(); return _enter.apply(this, arguments); };
  /* the Sign-in button keeps its look after piLogin() resets it */
  const _login = piLogin;
  piLogin = function(){
    const r = _login.apply(this, arguments);
    const b = $('loginBtn'); if(b && b.disabled) b.innerHTML = '<div class="spinner"></div> ' + t('Connecting…');
    return r;
  };
})();
/* v5.7: the first visit plays the welcome film (p29_ovid.js decides); returning users go straight to the login page */
/* Settings › Welcome tour replays it */
showOnboarding = function(){ showIntro(true); };

/* digitalsaudi.pi everywhere people see the address */
(function(){
  const _share = shareApp;
  shareApp = function(){ shareText('DigitalSaudi', 'DigitalSaudi — your Saudi digital companion: Umrah & Hajj, live news and scores, Pi wallet and payments, Quran and 40 Hadith. Open ' + OB_DOMAIN + ' in the Pi Browser, or:', location.origin); };
})();

/* words for the onboarding in every language (instant, offline) */
(function(){
  const rows = [];

  rows.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ I18N[l][r[0]] = r[i + 1]; }); });
  applyLang(LANG, true); obRender();
  // keep the button label right when the language changes
  const _apply = applyLang; applyLang = function(){ const x = _apply.apply(this, arguments); if(obOpen()) obRender(); return x; };
})();

/* ---------- Welcome film: plays whenever the Welcome screen is showing ---------- */
function spPlay(){
  const v = $('spVideo'); if(!v || CALM) return;
  try{ const p = v.play(); if(p && p.catch) p.catch(function(){}); }catch(e){}
}
function spPause(){ const v = $('spVideo'); if(v) try{ v.pause(); }catch(e){} }
(function(){
  const v = $('spVideo'); if(!v) return;
  v.muted = true; v.defaultMuted = true; v.setAttribute('muted', '');
  v.addEventListener('playing', function(){ v.classList.add('on'); });
  const srcs = v.querySelectorAll('source');
  if(srcs.length) srcs[srcs.length - 1].addEventListener('error', function(){ v.remove(); });   // poster image stays
  if(CALM){ v.removeAttribute('preload'); return; }
  const _enter = enterApp; enterApp = function(){ spPause(); return _enter.apply(this, arguments); };
  document.addEventListener('visibilitychange', function(){
    const s = $('splash'); const showing = s && getComputedStyle(s).display !== 'none' && !obOpen();
    if(document.visibilityState === 'visible' && showing) spPlay(); else spPause();
  });
})();

/* v4.7 — "Why Pi in Saudi?" words in every language (instant and offline)
   Order: English, Arabic, Urdu, Indonesian, Hausa, French */
(function(){
const R = [["Available today", "متاح اليوم", "آج دستیاب", "Tersedia hari ini", "Akwai yau", "Disponible aujourd’hui"], ["All", "الكل", "سب", "Semua", "Duka", "Tout"], ["Businesses", "الأعمال", "کاروبار", "Bisnis", "Kasuwanci", "Entreprises"], ["Hajj & Umrah", "الحج والعمرة", "حج و عمرہ", "Haji & Umrah", "Hajji da Umrah", "Hajj et Omra"], ["Why Pi in Saudi?", "لماذا Pi في السعودية؟", "سعودی عرب میں Pi کیوں؟", "Mengapa Pi di Saudi?", "Me yasa Pi a Saudiyya?", "Pourquoi Pi en Arabie saoudite ?"], ["Add your business", "أضف نشاطك التجاري", "اپنا کاروبار شامل کریں", "Tambahkan usaha Anda", "Ƙara kasuwancinka", "Ajouter votre commerce"], ["Accept Pi in 3 steps", "اقبل Pi في 3 خطوات", "3 مراحل میں Pi قبول کریں", "Terima Pi dalam 3 langkah", "Karɓi Pi a matakai 3", "Accepter Pi en 3 étapes"], ["Business directory", "دليل الأعمال", "بزنس ڈائریکٹری", "Direktori bisnis", "Jerin kasuwanci", "Annuaire des commerces"], ["Explore Saudi with Pi", "استكشف السعودية مع Pi", "Pi کے ساتھ سعودی عرب دیکھیں", "Jelajahi Saudi dengan Pi", "Bincika Saudiyya da Pi", "Explorer l’Arabie saoudite avec Pi"], ["Umrah guide", "دليل العمرة", "عمرہ گائیڈ", "Panduan Umrah", "Jagorar Umrah", "Guide de l’Omra"], ["Hajj guide", "دليل الحج", "حج گائیڈ", "Panduan Haji", "Jagorar Hajji", "Guide du Hajj"], ["Stay safe with Pi", "ابقَ آمنًا مع Pi", "Pi کے ساتھ محفوظ رہیں", "Tetap aman dengan Pi", "Ka zauna lafiya da Pi", "Restez en sécurité avec Pi"], ["Learn", "تعلّم", "سیکھیں", "Belajar", "Koyo", "Apprendre"], ["Education", "التعليم", "تعلیم", "Edukasi", "Ilimi", "Éducation"], ["Sign in with Pi", "تسجيل الدخول عبر Pi", "Pi کے ساتھ سائن اِن کریں", "Masuk dengan Pi", "Shiga da Pi", "Se connecter avec Pi"], ["Your Pi account, no passwords", "حساب Pi الخاص بك، بلا كلمات مرور", "آپ کا Pi اکاؤنٹ، کوئی پاس ورڈ نہیں", "Akun Pi Anda, tanpa kata sandi", "Asusun Pi ɗinka, babu kalmar sirri", "Votre compte Pi, sans mot de passe"], ["Premium with Pi", "الاشتراك المميز عبر Pi", "Pi کے ساتھ پریمیم", "Premium dengan Pi", "Premium da Pi", "Premium avec Pi"], ["1 π a month or 5 π lifetime", "1 π شهريًا أو 5 π مدى الحياة", "1 π ماہانہ یا 5 π تاحیات", "1 π per bulan atau 5 π seumur hidup", "1 π a wata ko 5 π na har abada", "1 π par mois ou 5 π à vie"], ["Accept-Pi poster & pay link", "ملصق «نقبل Pi» ورابط الدفع", "«Pi قبول ہے» پوسٹر اور پے لنک", "Poster Terima Pi & tautan bayar", "Fostar «Muna karɓar Pi» da hanyar biya", "Affiche « Pi accepté » et lien de paiement"], ["QR poster for your business", "ملصق QR لنشاطك التجاري", "آپ کے کاروبار کے لیے QR پوسٹر", "Poster QR untuk usaha Anda", "Fostar QR don kasuwancinka", "Une affiche QR pour votre commerce"], ["Find and list local businesses", "ابحث عن الأعمال المحلية وأدرجها", "مقامی کاروبار تلاش کریں اور درج کریں", "Temukan dan daftarkan usaha lokal", "Nemo kuma ka saka kasuwancin gida", "Trouver et inscrire des commerces locaux"], ["You are signed in", "تم تسجيل دخولك", "آپ سائن اِن ہیں", "Anda sudah masuk", "Ka riga ka shiga", "Vous êtes connecté"], ["Play", "تشغيل", "چلائیں", "Putar", "Kunna", "Lire"], ["Ideas. People. Possibilities.", "أفكار. أشخاص. إمكانات.", "خیالات۔ لوگ۔ امکانات۔", "Ide. Orang. Kemungkinan.", "Ra’ayoyi. Mutane. Damammaki.", "Des idées. Des gens. Des possibilités."], ["See all", "عرض الكل", "سب دیکھیں", "Lihat semua", "Duba duka", "Tout voir"], ["Available today in DigitalSaudi", "متاح اليوم في DigitalSaudi", "آج DigitalSaudi میں دستیاب", "Tersedia hari ini di DigitalSaudi", "Akwai yau a DigitalSaudi", "Disponible aujourd’hui dans DigitalSaudi"], ["Why it matters", "لماذا يهم ذلك", "یہ کیوں اہم ہے", "Mengapa ini penting", "Me yasa yake da muhimmanci", "Pourquoi c’est important"], ["Back", "رجوع", "واپس", "Kembali", "Koma", "Retour"], ["Share", "مشاركة", "شیئر", "Bagikan", "Raba", "Partager"], ["Video player", "مشغّل الفيديو", "ویڈیو پلیئر", "Pemutar video", "Mai kunna bidiyo", "Lecteur vidéo"], ["Close video", "إغلاق الفيديو", "ویڈیو بند کریں", "Tutup video", "Rufe bidiyo", "Fermer la vidéo"], ["Pause", "إيقاف مؤقت", "روکیں", "Jeda", "Dakata", "Pause"], ["Save", "حفظ", "محفوظ کریں", "Simpan", "Adana", "Enregistrer"], ["Ask AI", "اسأل الذكاء", "AI سے پوچھیں", "Tanya AI", "Tambayi AI", "Demander à l’IA"], ["Replay", "إعادة", "دوبارہ چلائیں", "Putar ulang", "Sake kunnawa", "Revoir"], ["Done", "تم", "مکمل", "Selesai", "An gama", "Terminé"], ["video", "فيديو", "ویڈیو", "video", "bidiyo", "vidéo"], ["Videos: ideas, use cases and the road ahead", "فيديوهات: أفكار، واستخدامات، والطريق إلى الأمام", "ویڈیوز: خیالات، استعمال کی مثالیں اور آگے کا راستہ", "Video: ide, contoh penggunaan dan jalan ke depan", "Bidiyoyi: ra’ayoyi, misalan amfani da hanyar gaba", "Vidéos : idées, cas d’usage et route à venir"], ["Why Pi?", "لماذا Pi؟", "Pi کیوں؟", "Mengapa Pi?", "Me yasa Pi?", "Pourquoi Pi ?"]];
R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1]) I18N[l][r[0]] = r[i + 1]; }); });
})();
/* v6.8 — what is still needed from the old "Why Pi" module (the films in p34 replaced the rest):
   icons, the "Available today" actions, entry points (Home promo, Explore row, Pi Hub banner, search) and deep links. */
const WHY_TODAY = [
  ['pi','Sign in with Pi','Your Pi account, no passwords', function(){ whyClose(true); if(typeof piUser !== 'undefined' && piUser) toast(t('You are signed in')); else piLogin(); }],
  ['star','Premium with Pi','1 π a month or 5 π lifetime', function(){ whyClose(true); openItem('premium'); }],
  ['image','Accept-Pi poster & pay link','QR poster for your business', function(){ whyClose(true); openItem('merchantQR'); }],
  ['store','Business directory','Find and list local businesses', function(){ whyClose(true); openItem('directory'); }]
];

(function(){
  const add = {
    film:'<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M3 15h18M8 4v5M16 4v5M8 15v5M16 15v5"/>',
    play:'<path d="M7 4.8v14.4a1 1 0 0 0 1.5.86l11.6-7.2a1 1 0 0 0 0-1.72L8.5 3.94A1 1 0 0 0 7 4.8z" fill="currentColor" stroke="none"/>',
    pause:'<rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" stroke="none"/><rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" stroke="none"/>',
    close:'<path d="M6 6l12 12M18 6L6 18"/>',
    back:'<path d="M15 5l-7 7 7 7"/>',
    volume:'<path d="M4 9.5v5h3.5L12 19V5L7.5 9.5z"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/>',
    replay:'<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 4v4.5h4.5"/>',
    up:'<path d="M6 15l6-6 6 6"/>',
    flag2:'<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>'
  };
  const sp = document.querySelector('body > svg[aria-hidden="true"]');
  if(sp) sp.insertAdjacentHTML('beforeend', Object.keys(add).map(function(k){ return '<symbol id="i-' + k + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + add[k] + '</symbol>'; }).join(''));
  if(typeof EMOJI_ICON !== 'undefined') EMOJI_ICON['🎬'] = 'film';
})();

function renderWhyPromo(){}          // drawn by p34_whyfilms
function whyOpen(){} function whyClose(){} function whyPlay(){} function whyStop(){}   // replaced in p34_whyfilms
function whyShareApp(){ shareText(t('Why Pi in Saudi?'), t('Ideas. People. Possibilities.') + ' — DigitalSaudi · digitalsaudi.pi', location.origin + '/#whyPi'); }
Object.assign(META, { whyPi:{ t:'Why Pi in Saudi?', ic:'🎬', s:'Videos: ideas, use cases and the road ahead', short:'Why Pi?' } });
PANELS.whyPi = function(){ closePanel(); whyOpen(); };
(function(){
  // Home: after "Right now"
  const ayah = $('dailyAyah'); const h2 = ayah && ayah.previousElementSibling;
  if(h2 && !$('whyPromo')){ h2.insertAdjacentHTML('beforebegin', '<div id="whyPromo" class="notr"></div>'); }
  // Explore › Pi & business
  const _rl = renderLists;
  renderLists = function(){ _rl.apply(this, arguments); const e = $('expBiz'); if(e && e.innerHTML.indexOf("'whyPi'") < 0) e.insertAdjacentHTML('afterbegin', rowHTML('whyPi')); };
  const e = $('expBiz'); if(e && e.innerHTML.indexOf("'whyPi'") < 0) e.insertAdjacentHTML('afterbegin', rowHTML('whyPi'));
  // Pi Hub: banner slot at the top (filled by p34_whyfilms)
  const _ph = piHubPanel;
  piHubPanel = function(){ _ph.apply(this, arguments); const b = $('pBody'); if(b && !b.querySelector('.why-banner')) b.insertAdjacentHTML('afterbegin', '<div class="why-banner notr"></div>'); };
  PANELS.piHub = piHubPanel;
  // language change: redraw the promo
  const _apply = applyLang;
  applyLang = function(){ const r = _apply.apply(this, arguments); try{ renderWhyPromo(); }catch(err){} return r; };
  // deep links: #whyPi or #wv-<id>, opened once the person is inside the app
  const hash = location.hash.slice(1);
  if(hash === 'whyPi' || /^wv-/.test(hash)){
    const go = function(){ if(hash === 'whyPi') whyOpen(); else whyPlay(hash.slice(3)); };
    const _enter = enterApp; let done = false;
    enterApp = function(){ const r = _enter.apply(this, arguments); if(!done){ done = true; setTimeout(go, 500); } return r; };
  }
})();

/* ==========================================================================
   v4.9 — Pi price on the prayer card (the clock moved next to the city)
   ========================================================================== */
function renderHeroPi(){
  const p = store.get('pi', null), b = $('hpPi'), c = $('hpPiChg'); if(!b) return;
  if(p && p.usd){
    b.textContent = '$' + fmt(p.usd, 4);
    const ch = p.change || 0;
    c.innerHTML = `<span class="${ch >= 0 ? 'up' : 'down'}">${ch >= 0 ? '▲' : '▼'} ${Math.abs(ch).toFixed(2)}%</span>`;
  } else { b.textContent = '—'; c.textContent = ''; }
}
(function(){
  const _rm = renderMarkets;
  renderMarkets = function(){ const r = _rm.apply(this, arguments); try{ renderHeroPi(); }catch(e){} return r; };
  renderHeroPi();
  const m = document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute('content', '#0B0E12');
})();

/* v4.9 — hero Pi price label */
(function(){ const R = [["Pi price","سعر Pi","Pi کی قیمت","Harga Pi","Farashin Pi","Prix du Pi"]];
R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1] && I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
try{ if(LANG !== 'en') trWalk(document.body); }catch(e){} })();

/* v5.0 — story-style welcome: words in every language (EN, AR, UR, ID, HA, FR) */
(function(){
const R = [
["Saudi Arabia,","السعودية،","سعودی عرب،","Arab Saudi,","Saudiyya,","L’Arabie saoudite,"],
["in your pocket.","في جيبك.","آپ کی جیب میں۔","di saku Anda.","a aljihunka.","dans votre poche."],
["Guides, live updates and tools for visitors, pilgrims, workers and residents.","أدلة وتحديثات مباشرة وأدوات للزوار والحجاج والعاملين والمقيمين.","زائرین، حجاج، کارکنوں اور رہائشیوں کے لیے گائیڈز، لائیو اپڈیٹس اور ٹولز۔","Panduan, info langsung, dan alat untuk pengunjung, jemaah, pekerja, dan penduduk.","Jagora, labarai kai tsaye da kayan aiki ga baƙi, mahajjata, ma’aikata da mazauna.","Guides, infos en direct et outils pour visiteurs, pèlerins, travailleurs et résidents."],
["Live,","مباشر،","لائیو،","Langsung,","Kai tsaye,","En direct,"],
["the moment it happens.","لحظة بلحظة.","لمحہ بہ لمحہ۔","saat itu juga.","a daidai lokacin.","à l’instant même."],
["News, football scores, weather and the Pi price — updated by itself.","الأخبار ونتائج كرة القدم والطقس وسعر Pi — تتحدّث تلقائيًا.","خبریں، فٹبال اسکور، موسم اور Pi کی قیمت — خود بخود اپڈیٹ۔","Berita, skor sepak bola, cuaca, dan harga Pi — diperbarui otomatis.","Labarai, sakamakon ƙwallon ƙafa, yanayi da farashin Pi — suna sabunta kansu.","Actualités, scores de foot, météo et prix du Pi — mis à jour tout seuls."],
["Your journey,","رحلتك،","آپ کا سفر،","Perjalanan Anda,","Tafiyarka,","Votre voyage,"],
["guided step by step.","خطوة بخطوة.","قدم بہ قدم رہنمائی۔","dipandu langkah demi langkah.","jagora mataki-mataki.","guidé pas à pas."],
["Umrah and Hajj guides, prayer times, Qibla and the Quran — wherever you are.","أدلة العمرة والحج ومواقيت الصلاة والقبلة والقرآن — أينما كنت.","عمرہ اور حج گائیڈز، نماز کے اوقات، قبلہ اور قرآن — جہاں بھی ہوں۔","Panduan Umrah dan Haji, waktu salat, kiblat, dan Al-Qur’an — di mana pun Anda berada.","Jagorar Umrah da Hajji, lokutan sallah, Alƙibla da Alƙur’ani — duk inda kake.","Guides Omra et Hajj, heures de prière, Qibla et Coran — où que vous soyez."],
["Pay and get paid,","ادفع واستلم،","ادائیگی کریں اور وصول کریں،","Bayar dan dibayar,","Biya kuma a biya ka,","Payez et soyez payé,"],
["the Pi way.","بطريقة Pi.","Pi کے ذریعے۔","dengan cara Pi.","ta hanyar Pi.","à la manière Pi."],
["Sign in with Pi for Premium, business listings and QR payments.","سجّل الدخول عبر Pi للحصول على Premium وقوائم الأعمال والدفع عبر QR.","Premium، کاروباری فہرستوں اور QR ادائیگیوں کے لیے Pi سے سائن ان کریں۔","Masuk dengan Pi untuk Premium, daftar bisnis, dan pembayaran QR.","Shiga da Pi don Premium, jerin kasuwanci da biyan kuɗi ta QR.","Connectez-vous avec Pi pour le Premium, les fiches d’entreprise et les paiements QR."],
["Back to the app","العودة إلى التطبيق","ایپ پر واپس جائیں","Kembali ke aplikasi","Koma zuwa manhaja","Retour à l’app"],
["Page","الصفحة","صفحہ","Halaman","Shafi","Page"],
["Connecting…","جارٍ الاتصال…","منسلک ہو رہا ہے…","Menghubungkan…","Ana haɗawa…","Connexion…"],
["Welcome to DigitalSaudi","مرحبًا بك في DigitalSaudi","DigitalSaudi میں خوش آمدید","Selamat datang di DigitalSaudi","Barka da zuwa DigitalSaudi","Bienvenue sur DigitalSaudi"]
];
R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1] && I18N[l] && !I18N[l][r[0]]) I18N[l][r[0]] = r[i + 1]; }); });
try{ if(LANG !== 'en') trWalk(document.body); }catch(e){}
try{ if(obOpen()) obRender(); }catch(e){}
})();

/* v5.1 — the clean white look is the default; dark (graphite) stays in Settings.
   Everyone is moved to the new look once; after that their own choice is kept. */
(function(){
  try{
    if(!store.get('look51', false)){
      const s = store.get('settings', { theme:'light', zoom:1 }); s.theme = 'light';
      store.set('settings', s); store.set('look51', true);
    }
  }catch(e){}
  const _apply = applySettings;
  applySettings = function(){
    const r = _apply.apply(this, arguments);
    const light = document.documentElement.getAttribute('data-theme') === 'light';
    const m = document.querySelector('meta[name="theme-color"]'); if(m) m.setAttribute('content', light ? '#FFFFFF' : '#0B0E12');
    return r;
  };
  applySettings();
})();

/* v5.2 — Home card leads with Pi in Saudi: live price (USD + SAR), 24h change,
   24h line, source. Next prayer moves into the small boxes. Real data only. */
function renderHeroPi(){
  const big = $('hpPiBig'); if(!big) return;
  const p = store.get('pi', null), chg = $('hpPiChg'), sub = $('hpPiSar'), src = $('hpPiSrc'), svg = $('hpPiSpark');
  if(!(p && p.usd)){
    big.textContent = '—'; chg.innerHTML = ''; sub.textContent = t('Loading live price…'); if(src) src.textContent = ''; if(svg) svg.innerHTML = ''; return;
  }
  big.textContent = '$' + fmt(p.usd, 4);
  const ch = +p.change || 0, up = ch >= 0;
  chg.className = 'hpx-chg ' + (up ? 'up' : 'down');
  chg.textContent = (up ? '▲ ' : '▼ ') + Math.abs(ch).toFixed(2) + '% · 24h';
  const sar = p.sar || (p.usd * 3.75);
  sub.textContent = '≈ ' + fmt(sar, 4) + ' SAR  ·  1 SAR ≈ ' + fmt(1 / sar, 2) + ' π';
  if(src) src.textContent = (p.stale ? t('Last known price') : '') + '';   // exchange names hidden; CoinGecko requires a credit
  if(svg){
    const a = (p.spark || []).map(Number).filter(function(x){ return isFinite(x); });
    if(a.length < 3){ svg.innerHTML = ''; svg.classList.add('empty'); return; }
    svg.classList.remove('empty');
    const W = 300, H = 54, mn = Math.min.apply(null, a), mx = Math.max.apply(null, a), r = (mx - mn) || 1;
    const pts = a.map(function(v, i){ return [(i / (a.length - 1) * W).toFixed(1), (H - 6 - (v - mn) / r * (H - 14)).toFixed(1)]; });
    const line = 'M' + pts.map(function(q){ return q.join(' '); }).join(' L');
    const col = up ? '#F6D27A' : '#FECACA';
    svg.innerHTML = '<defs><linearGradient id="hpxG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="' + col + '" stop-opacity=".35"/><stop offset="1" stop-color="' + col + '" stop-opacity="0"/></linearGradient></defs>' +
      '<path d="' + line + ' L' + W + ' ' + H + ' L0 ' + H + 'Z" fill="url(#hpxG)"/>' +
      '<path d="' + line + '" fill="none" stroke="' + col + '" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round" vector-effect="non-scaling-stroke"/>' +
      '<circle cx="' + pts[pts.length - 1][0] + '" cy="' + pts[pts.length - 1][1] + '" r="3.4" fill="' + col + '"/>';
  }
}
(function(){
  const R = [
    ["Pi in Saudi","Pi في السعودية","سعودی عرب میں Pi","Pi di Saudi","Pi a Saudiyya","Pi en Arabie saoudite"],
    ["Live price","سعر مباشر","لائیو قیمت","Harga langsung","Farashi kai tsaye","Prix en direct"],
    ["Next prayer","الصلاة القادمة","اگلی نماز","Salat berikutnya","Sallah mai zuwa","Prochaine prière"],
    ["Loading live price…","جارٍ تحميل السعر المباشر…","لائیو قیمت لوڈ ہو رہی ہے…","Memuat harga langsung…","Ana loda farashi kai tsaye…","Chargement du prix en direct…"],
    ["Last known price","آخر سعر معروف","آخری معلوم قیمت","Harga terakhir","Farashi na ƙarshe","Dernier prix connu"],
    ["DigitalSaudi · Pi Digital App","DigitalSaudi · تطبيق Pi الرقمي","DigitalSaudi · Pi ڈیجیٹل ایپ","DigitalSaudi · Aplikasi Digital Pi","DigitalSaudi · Manhajar Pi ta zamani","DigitalSaudi · Appli numérique Pi"],
    ["Pi price — open Markets","سعر Pi — افتح الأسواق","Pi کی قیمت — مارکیٹس کھولیں","Harga Pi — buka Pasar","Farashin Pi — buɗe Kasuwanni","Prix du Pi — ouvrir Marchés"],
    ["Prayer times","مواقيت الصلاة","نماز کے اوقات","Waktu salat","Lokutan sallah","Heures de prière"]
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1] && I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
  try{ if(LANG !== 'en') trWalk(document.body); }catch(e){}
  renderHeroPi();
  const _al = applyLang; applyLang = function(){ const x = _al.apply(this, arguments); try{ renderHeroPi(); }catch(e){} return x; };
})();

/* ==========================================================================
   v5.3 — release fixes
   1) Search works in every language: titles and descriptions are indexed in
      all 6 languages; Arabic/Urdu spelling variants are normalised.
   2) Words for renamed / new labels in every language.
   ========================================================================== */
function srNorm(s){
  s = String(s == null ? '' : s).toLowerCase().normalize('NFD')
    .replace(/[̀-ًͯ-ٰٟـۖ-ۭ]/g, '')
    .replace(/[آأإٱ]/g, 'ا')        // آ أ إ ٱ → ا
    .replace(/ة/g, 'ه')                              // ة → ه
    .replace(/[ىیيئ]/g, 'ي')          // ى ی ئ → ي
    .replace(/ک/g, 'ك')                              // ک → ك
    .replace(/ؤ/g, 'و')                              // ؤ → و
    .replace(/[ہۃھ]/g, 'ه')                // ہ ۃ ھ → ه
    .normalize('NFC');
  return s.split(/[^\p{L}\p{N}]+/u).filter(Boolean)
    .map(function(w){ return w.length > 3 && w.indexOf('ال') === 0 ? w.slice(2) : w; }).join(' ');
}
function srAllLangs(text){
  if(!text) return '';
  const out = [text];
  try{ LANG_ORDER.forEach(function(l){ const d = I18N[l]; if(d && d[text]) out.push(d[text]); }); }catch(e){}
  try{ if(typeof AUTO_TR !== 'undefined' && AUTO_TR[text]) out.push(AUTO_TR[text]); }catch(e){}
  return out.join(' ');
}
(function(){
  const _idx = srIndex;
  srIndex = function(){
    if(srIndexCache && srIndexCache.v53) return srIndexCache;
    srIndexCache = null;
    const list = _idx().map(function(it){
      return Object.assign({}, it, { tl:srNorm(srAllLangs(it.t)), x:srNorm((it.x || '') + ' ' + srAllLangs(it.s) + ' ' + srAllLangs(it.g)) });
    });
    list.v53 = true;
    return (srIndexCache = list);
  };
  srScore = function(it, terms, q){
    q = srNorm(q); terms = terms.map(srNorm).filter(Boolean);
    if(!q || !terms.length) return 0;
    let s = 0;
    if(it.tl === q) s += 100; else if(it.tl.indexOf(q) === 0) s += 60; else if(it.tl.indexOf(q) >= 0) s += 40;
    const words = it.tl.split(' ');
    for(const t of terms){
      if(it.tl.indexOf(t) >= 0) s += 12;
      else if(it.x.indexOf(t) >= 0) s += 4;
      else if(t.length >= 4 && words.some(function(w){ return srLev1(w, t); })) s += 6;
      else return 0;
    }
    if(it.g === 'Tools' || it.g === 'Islamic' || it.g === 'Live') s += 3;
    return s;
  };
  // a fresh index whenever the language changes
  const _al = applyLang; applyLang = function(){ const r = _al.apply(this, arguments); srIndexCache = null; return r; };
  // the "no matches" message in the user's language
  const _rs = runSearch;
  runSearch = function(raw){
    const r = _rs.apply(this, arguments);
    const box = $('sres'), e = box && box.querySelector('.empty');
    if(e){ e.classList.add('notr'); e.innerHTML = '<div class="big">🔎</div>' + esc(t('No matches for')) + ' “' + esc(String(raw).trim()) + '”. ' + esc(t('Check the spelling or try a shorter word.')); }
    return r;
  };
})();

(function(){
  const R = [
    ["Pi requests & history","طلبات Pi والسجل","Pi درخواستیں اور تاریخ","Permintaan & riwayat Pi","Buƙatun Pi da tarihi","Demandes et historique Pi"],
    ["Payment requests, your Pi payments","طلبات الدفع ومدفوعاتك بـ Pi","ادائیگی کی درخواستیں، آپ کی Pi ادائیگیاں","Permintaan pembayaran, pembayaran Pi Anda","Buƙatun biya, biyan kuɗin Pi naka","Demandes de paiement, vos paiements Pi"],
    ["Requests","الطلبات","درخواستیں","Permintaan","Buƙatu","Demandes"],
    ["No matches for","لا توجد نتائج لـ","کوئی نتیجہ نہیں ملا:","Tidak ada hasil untuk","Babu sakamako ga","Aucun résultat pour"],
    ["Check the spelling or try a shorter word.","تحقق من الإملاء أو جرّب كلمة أقصر.","ہجے چیک کریں یا چھوٹا لفظ آزمائیں۔","Periksa ejaan atau coba kata yang lebih pendek.","Duba rubutun ko ka gwada gajeriyar kalma.","Vérifiez l’orthographe ou essayez un mot plus court."],
    ["Pi is a digital currency from the Pi Network app. Sign in with Pi for Premium, business listings and QR payments.","Pi عملة رقمية من تطبيق Pi Network. سجّل الدخول عبر Pi للحصول على Premium وقوائم الأعمال والدفع عبر QR.","Pi، Pi Network ایپ کی ایک ڈیجیٹل کرنسی ہے۔ Premium، کاروباری فہرستوں اور QR ادائیگیوں کے لیے Pi سے سائن ان کریں۔","Pi adalah mata uang digital dari aplikasi Pi Network. Masuk dengan Pi untuk Premium, daftar bisnis, dan pembayaran QR.","Pi kuɗin dijital ne daga manhajar Pi Network. Shiga da Pi don Premium, jerin kasuwanci da biyan kuɗi ta QR.","Pi est une monnaie numérique de l’application Pi Network. Connectez-vous avec Pi pour le Premium, les fiches d’entreprise et les paiements QR."]
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1] && I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
  srIndexCache = null;
  try{ if(LANG !== 'en') trWalk(document.body); }catch(e){}
})();

/* v5.3 — Arabic/Urdu search recall: light stemming, keywords for core tools, native triggers */
(function(){
  const KW = {
    umrah:'عمره عمرہ اعتمار', hajj:'حج حج', madinah:'مدينه منوره مدینہ', quran:'قران مصحف قرآن', duas:'دعاء ادعيه اذكار دعا', tasbih:'تسبيح مسبحه تسبیح', qibla:'قبله اتجاه قبلہ',
    calendar:'تقويم هجري کیلنڈر', zakat:'زكاه زکوه زکات', visas:'تاشيره تاشيرات فيزا اقامه ویزا اقامہ', eservices:'خدمات حكوميه ابشر', docs:'وثايق مستندات اوراق',
    reminders:'انتهاء تجديد اقامه جواز', ecard:'بطاقه طواري ایمرجنسی', emergency:'طواري اسعاف شرطه دفاع مدني ایمرجنسی', converter:'عمله صرف ريال تحويل کرنسی',
    phrases:'قاموس عربي ترجمه لغه عبارات', nearMe:'قريب مني خريطه قریب', hotels:'فندق فنادق سكن ہوٹل', food:'مطعم مطاعم اكل طعام ریسٹورنٹ کھانا',
    transport:'مواصلات نقل باص مترو تاكسي ٹرانسپورٹ', train:'قطار مطار ٹرین', salary:'راتب رواتب تنخواه', gratuity:'مكافاه نهايه خدمه', vat:'ضريبه قيمه مضافه',
    career:'وظايف عمل وظيفه نوکری', safety:'امان سلامه حفاظت', weather:'طقس جو موسم', trips:'رحله رحلات سفر سفر', directory:'دليل اعمال متاجر تجار', piHub:'باي'
  };
  function stem(w){
    if(!/[؀-ۿ]/.test(w) || w.length <= 3) return w;
    return w.replace(/(ات|ين|ون|يه|ه|ي)$/, '');
  }
  const _idx = srIndex;
  srIndex = function(){
    const list = _idx();
    if(!list.kw53){ list.forEach(function(it){ if(KW[it.id]) it.x = it.x + ' ' + srNorm(KW[it.id]); }); list.kw53 = true; }
    return list;
  };
  const _sc = srScore;
  srScore = function(it, terms, q){
    const s = _sc(it, terms, q); if(s) return s;
    // second chance for Arabic-script words: compare stems (تأشيرة ~ تأشيرات, فنادق stays exact)
    const ts = terms.map(srNorm).filter(Boolean).map(stem);
    if(!ts.some(function(t){ return /[؀-ۿ]/.test(t); })) return 0;
    let sc = 0;
    for(const t of ts){ if(t.length < 2) continue; if(it.tl.indexOf(t) >= 0) sc += 10; else if(it.x.indexOf(t) >= 0) sc += 4; else return 0; }
    return sc;
  };
  // native-language triggers for the smart answers (prayer, places)
  const _ans = srAnswers;
  srAnswers = function(q){
    let a = _ans(q);
    if(!a && /صلا|صلو|اذان|أذان|نماز|فجر|ظهر|عصر|مغرب|عشا|عشاء/.test(q)) a = _ans('prayer');
    return a;
  };
  const NATIVE = [[/فندق|فنادق|ہوٹل/, 'hotels', 'Hotels'], [/مطعم|مطاعم|ریسٹورنٹ|کھانا/, 'food', 'Restaurants'], [/مقهى|قهوه|قهوة|کافی/, 'cafes', 'Cafés'], [/مسجد|مساجد/, 'mosques', 'Mosques'],
    [/مستشفى|مستشفي|ہسپتال|اسپتال/, 'health', 'Hospitals'], [/صيدلي|صيدليه|صيدلية|فارمیسی/, 'pharmacy', 'Pharmacies'], [/صراف|بنك|بنوك|بینک/, 'money', 'Banks & ATMs'], [/وقود|بنزين|محطه وقود|محطة وقود|پیٹرول/, 'fuel', 'Fuel']];
  try{ NATIVE.forEach(function(n){ SR_PLACES.push(n); }); }catch(e){}
  srIndexCache = null;
})();

/* ==========================================================================
   v5.4 — 24-second cinematic welcome
   • Photo shots per scene, used only when the licensed photo file exists in
     /onboarding/ (otherwise the original illustration stays) — never blocks.
   • Scene 1: 2 shots, scene 2: 3 shots, scene 4: 1 shot; Ken Burns + cross-fades.
   • Skips photos on data-saver / 2G connections.
   • Optional ambient sound generated in the browser (no audio file), muted by default.
   ========================================================================== */
(function(){
  const el = $('intro'); if(!el) return;
  const SCENE_S = 6;
  const conn = navigator.connection || {};
  const lite = !!(conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''));
  function layout(scene, fresh){
    const ok = [].slice.call(scene.querySelectorAll('.st-shot.ok'));
    const dur = +scene.dataset.dur || SCENE_S, n = ok.length, seg = n ? dur / n : dur;
    // keep shots on the scene's clock even when a photo arrives late
    const t0 = +scene.dataset.t0 || 0, el0 = !fresh && scene.classList.contains('on') && t0 ? Math.min(+scene.dataset.dur || SCENE_S, (performance.now() - t0) / 1000) : 0;
    ok.forEach(function(s, i){ s.style.setProperty('--d', (i * seg - el0).toFixed(2) + 's'); s.style.setProperty('--len', (seg + 0.9).toFixed(2) + 's'); s.classList.toggle('alt', i % 2 === 1); });
    scene.classList.toggle('has-photo', n > 0);
  }
  function load(scene){
    if(lite || scene.dataset.loaded) return; scene.dataset.loaded = '1';
    [].slice.call(scene.querySelectorAll('.st-shot[data-src]')).forEach(function(s){
      const img = new Image(); img.decoding = 'async';
      img.onload = function(){ s.style.backgroundImage = 'url("' + s.dataset.src + '")'; s.classList.add('ok'); layout(scene); };
      img.onerror = function(){ s.remove(); layout(scene); };
      img.src = s.dataset.src;
    });
  }
  const scenes = [].slice.call(el.querySelectorAll('.st-scene'));
  if(scenes[0]) load(scenes[0]);
  const rest = function(){ scenes.slice(1).forEach(load); };
  if(document.readyState === 'complete') setTimeout(rest, 400); else window.addEventListener('load', function(){ setTimeout(rest, 400); });
  // also load a scene the moment someone jumps to it
  const _go = obGo; obGo = function(i){ const r = _go.apply(this, arguments); const sc = scenes[obI]; if(sc) load(sc); return r; };
  const _render = obRender; obRender = function(){ const r = _render.apply(this, arguments); const sc = scenes[obI]; if(sc){ sc.dataset.t0 = performance.now(); layout(sc, true); } return r; };
  if(scenes[0]) scenes[0].dataset.t0 = performance.now();

  /* ambient sound — a soft, slowly breathing chord; off until the user turns it on */
  let ac = null, master = null;
  function startSound(){
    try{
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if(ac.state === 'suspended') ac.resume();
      if(master) return;
      master = ac.createGain(); master.gain.value = 0; master.connect(ac.destination);
      const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 900; lp.connect(master);
      [110, 164.81, 220, 277.18].forEach(function(f, i){
        const o = ac.createOscillator(), g = ac.createGain(), lfo = ac.createOscillator(), lg = ac.createGain();
        o.type = i % 2 ? 'triangle' : 'sine'; o.frequency.value = f; o.detune.value = (i - 1.5) * 4;
        g.gain.value = 0.18 / (i + 1);
        lfo.frequency.value = 0.07 + i * 0.03; lg.gain.value = 0.05; lfo.connect(lg); lg.connect(g.gain);
        o.connect(g); g.connect(lp); o.start(); lfo.start();
      });
      master.gain.linearRampToValueAtTime(0.09, ac.currentTime + 2.5);
    }catch(e){}
  }
  function stopSound(){
    try{ if(master && ac){ const m = master; m.gain.cancelScheduledValues(ac.currentTime); m.gain.setValueAtTime(m.gain.value, ac.currentTime); m.gain.linearRampToValueAtTime(0, ac.currentTime + 0.6); setTimeout(function(){ try{ m.disconnect(); }catch(e){} }, 700); master = null; } }catch(e){}
  }
  window.dsAmb = { start:startSound, stop:stopSound };
  window.obToggleSound = function(){
    const b = $('obSound'), on = !(b && b.classList.contains('on'));
    if(b){ b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.setAttribute('aria-label', t(on ? 'Sound on' : 'Sound off')); }
    if(on) startSound(); else stopSound();
  };
  const _close = obClose; obClose = function(){ stopSound(); const b = $('obSound'); if(b){ b.classList.remove('on'); b.setAttribute('aria-pressed', 'false'); } return _close.apply(this, arguments); };
  document.addEventListener('visibilitychange', function(){ if(document.visibilityState !== 'visible' && master) stopSound(), ($('obSound') || {}).classList && $('obSound').classList.remove('on'); });

  /* words in every language */
  const R = [
    ["Everything Saudi.","كل ما يخص السعودية.","سعودی عرب کی ہر چیز۔","Semua tentang Saudi.","Komai na Saudiyya.","Tout sur l’Arabie saoudite."],
    ["One Digital Experience.","في تجربة رقمية واحدة.","ایک ڈیجیٹل تجربہ۔","Satu pengalaman digital.","A cikin gogewar dijital ɗaya.","Une seule expérience numérique."],
    ["Discover a smarter way to explore, navigate and experience Saudi Arabia.","اكتشف طريقة أذكى لاستكشاف السعودية والتنقل فيها وعيش تجربتها.","سعودی عرب کو دریافت کرنے، گھومنے اور تجربہ کرنے کا ایک بہتر طریقہ۔","Temukan cara yang lebih cerdas untuk menjelajahi dan merasakan Arab Saudi.","Gano hanya mafi wayo don bincike, zagayawa da more Saudiyya.","Découvrez une façon plus intelligente d’explorer et de vivre l’Arabie saoudite."],
    ["Your Journey,","رحلتك،","آپ کا سفر،","Perjalanan Anda,","Tafiyarka,","Votre voyage,"],
    ["Made Simpler.","أصبحت أسهل.","آسان بنا دیا گیا۔","jadi lebih mudah.","an sauƙaƙa shi.","en plus simple."],
    ["Explore Hajj and Umrah guidance, travel information and essential services.","إرشادات الحج والعمرة ومعلومات السفر والخدمات الأساسية.","حج و عمرہ کی رہنمائی، سفری معلومات اور ضروری خدمات۔","Panduan Haji dan Umrah, informasi perjalanan, dan layanan penting.","Jagorar Hajji da Umrah, bayanan tafiya da muhimman ayyuka.","Conseils pour le Hajj et la Omra, infos voyage et services essentiels."],
    ["Your Essential","رفيقك","آپ کا لازمی","Pendamping","Abokin tafiyarka","Votre compagnon"],
    ["Saudi Companion.","السعودي الأساسي.","سعودی ساتھی۔","Saudi Anda.","na Saudiyya.","saoudien essentiel."],
    ["Useful tools and local information, together in one experience.","أدوات مفيدة ومعلومات محلية في تجربة واحدة.","مفید ٹولز اور مقامی معلومات، ایک ہی جگہ۔","Alat berguna dan info lokal dalam satu pengalaman.","Kayan aiki masu amfani da bayanan gida a wuri ɗaya.","Des outils utiles et des infos locales, réunis en une seule expérience."],
    ["Discover Digital","اكتشف إمكانات","Pi کے ساتھ","Temukan peluang","Gano damar","Découvrez les possibilités"],
    ["Possibilities with Pi.","رقمية مع Pi.","ڈیجیٹل امکانات دریافت کریں۔","digital dengan Pi.","dijital tare da Pi.","numériques avec Pi."],
    ["Pi is a digital currency from the Pi Network app. Explore Pi-related tools and supported services where available.","Pi عملة رقمية من تطبيق Pi Network. استكشف أدوات Pi والخدمات المدعومة حيثما توفرت.","Pi، Pi Network ایپ کی ایک ڈیجیٹل کرنسی ہے۔ جہاں دستیاب ہوں Pi ٹولز اور معاون خدمات دیکھیں۔","Pi adalah mata uang digital dari aplikasi Pi Network. Jelajahi alat Pi dan layanan yang didukung jika tersedia.","Pi kuɗin dijital ne daga manhajar Pi Network. Bincika kayan aikin Pi da ayyukan da ake tallafawa inda akwai.","Pi est une monnaie numérique de l’application Pi Network. Découvrez les outils Pi et les services pris en charge, lorsqu’ils sont disponibles."],
    ["Skip","تخطي","چھوڑیں","Lewati","Tsallake","Passer"],
    ["Continue","متابعة","جاری رکھیں","Lanjut","Ci gaba","Continuer"],
    ["Get Started","ابدأ الآن","شروع کریں","Mulai","Fara","Commencer"],
    ["Sound on","الصوت مفعّل","آواز آن","Suara aktif","Sauti a kunne","Son activé"],
    ["Sound off","الصوت متوقف","آواز بند","Suara mati","Sauti a kashe","Son coupé"],
    ["Prayer times","مواقيت الصلاة","نماز کے اوقات","Waktu salat","Lokutan sallah","Heures de prière"],
    ["Qibla","القبلة","قبلہ","Kiblat","Alƙibla","Qibla"],
    ["Weather","الطقس","موسم","Cuaca","Yanayi","Météo"],
    ["Currency","العملات","کرنسی","Mata uang","Kuɗi","Devises"],
    ["Arabic dictionary","القاموس العربي","عربی لغت","Kamus Arab","Ƙamus na Larabci","Dictionnaire arabe"],
    ["Saudi guides","أدلة سعودية","سعودی گائیڈز","Panduan Saudi","Jagororin Saudiyya","Guides saoudiens"],
    ["Accept-Pi poster","ملصق قبول Pi","Pi قبول کرنے کا پوسٹر","Poster Terima Pi","Fosta karɓar Pi","Affiche « Pi accepté »"],
    ["Business directory","دليل الأعمال","کاروباری ڈائریکٹری","Direktori bisnis","Jerin kasuwanci","Annuaire des entreprises"],
    ["Live Pi price","سعر Pi المباشر","Pi کی لائیو قیمت","Harga Pi langsung","Farashin Pi kai tsaye","Prix du Pi en direct"],
    ["Restaurants","مطاعم","ریسٹورنٹس","Restoran","Gidajen abinci","Restaurants"],
    ["Hospitals","مستشفيات","ہسپتال","Rumah sakit","Asibitoci","Hôpitaux"],
    ["Pharmacies","صيدليات","فارمیسیاں","Apotek","Kantin magani","Pharmacies"],
    ["Stations","محطات","اسٹیشن","Stasiun","Tashoshi","Gares et stations"],
    ["Banks & ATMs","بنوك وصرافات","بینک اور اے ٹی ایم","Bank & ATM","Bankuna da ATM","Banques et DAB"]
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1] && I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
  try{ if(LANG !== 'en') trWalk(document.body); }catch(e){}
  try{ if(obOpen()) obRender(); }catch(e){}
  const SHOT_LANGS = ['ar','ur','id','ha','fr'];
  const _r2 = obRender; obRender = function(){ const r = _r2.apply(this, arguments); const lb = el.querySelector('.st-lang'); if(lb) lb.setAttribute('aria-label', t('Language'));
    // the phone shows the real app in the user's language
    const im = el.querySelector('.st-phone img'); if(im){ const want = '/onboarding/app-explore' + (SHOT_LANGS.indexOf(LANG) >= 0 ? '-' + LANG : '') + '.webp'; if(im.getAttribute('src') !== want) im.setAttribute('src', want); }
    return r; };
  try{ obRender(); }catch(e){}
})();

/* v5.5 — welcome before login: the light-backdrop scene darkens the top controls;
   the login page no longer plays the old dark film */
(function(){
  const el = $('intro'); if(!el) return;
  const _r = obRender; obRender = function(){ const r = _r.apply(this, arguments); el.classList.toggle('lm', obI === 2); return r; };
  try{ obRender(); }catch(e){}
  spPlay = function(){};
  const R = [["Next","التالي","اگلا","Berikutnya","Na gaba","Suivant"]];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1] && I18N[l] && !I18N[l][r[0]]) I18N[l][r[0]] = r[i + 1]; }); });
  try{ if(LANG !== 'en') trWalk(document.body); }catch(e){}
})();

/* ==========================================================================
   v5.7 — first-visit welcome film (real 24-second video), then the login page
   • Plays muted, full screen; Skip is visible from the first frame.
   • Headlines are live text synced to the video clock (translated, accessible).
   • Pi scene shows the real price from /pi-price with source and update time,
     or says plainly that the live rate is unavailable — never a made-up number.
   • v6.0: plays each time the app is opened (once per visit); Skip is always visible.
     Settings › Welcome tour plays it again.
   • Data-saver / 2G / reduced motion / video failure → the light photo version.
   ========================================================================== */
(function(){
  const el = $('ovid'), v = $('ovVideo'); if(!el || !v) return;
  const STARTS = [0, 6, 12, 18], END = 24;
  const conn = navigator.connection || {};
  const lite = !!(conn.saveData || /(^|-)2g$/.test(conn.effectiveType || ''));
  // the film is only fetched when it is about to play (returning users never download it);
  // slower connections get the lighter 540p cut (~0.55 MB) instead of 720p (~1.2 MB)
  function pickSrc(){
    if(v.getAttribute('src')) return;
    const slow = /(^|-)3g$/.test(conn.effectiveType || '') || (conn.downlink && conn.downlink < 4);
    const webm = v.canPlayType('video/webm; codecs="vp9"') ? 'webm' : 'mp4';
    v.preload = 'auto';
    v.setAttribute('src', '/onboarding/ovid' + (slow ? '-sd' : '') + '.' + webm + '?v=59');
    v.dataset.cut = slow ? 'sd' : 'hd';
  }
  // a failed play() only counts if the source didn't change meanwhile (WebM → MP4 retry)
  function playOrFallback(){
    const was = v.getAttribute('src'), pr = v.play();
    if(pr && pr.catch) pr.catch(function(){ setTimeout(function(){ if(open && v.getAttribute('src') === was) fallback(); }, 50); });
  }
  let open = false, replay = false, raf = 0, scene = -1, watchdog = 0, endT = 0;
  const sceneAt = function(t){ return t >= 18 ? 3 : t >= 12 ? 2 : t >= 6 ? 1 : 0; };

  function fmtTime(iso){
    try{ return new Date(iso).toLocaleTimeString(LANG === 'en' ? 'en-GB' : LANG, { hour:'2-digit', minute:'2-digit', timeZone:'Asia/Riyadh' }); }catch(e){ return ''; }
  }
  function renderPi(){
    const p = store.get('pi', null), card = el.querySelector('.ov-pi'), tag = $('ovLiveTag');
    const usd = $('ovPiUsd'), chg = $('ovPiChg'), sar = $('ovPiSar'), src = $('ovPiSrc'), svg = $('ovPiSpark');
    if(!(p && p.usd)){
      card.classList.add('none'); tag.className = 'ov-live none'; tag.lastChild.textContent = t('Unavailable');
      usd.textContent = t('Live rate unavailable right now'); chg.textContent = ''; chg.className = '';
      sar.textContent = t('See Markets in the app for the latest price.'); src.textContent = ''; svg.innerHTML = ''; return;
    }
    card.classList.remove('none');
    const stale = !!p.stale || (Date.now() - (p.t || 0) > 15 * 60000);
    tag.className = 'ov-live' + (stale ? ' stale' : ''); tag.lastChild.textContent = t(stale ? 'Last known price' : 'Live');
    usd.textContent = '$' + fmt(p.usd, 4);
    const ch = +p.change || 0, up = ch >= 0; chg.className = up ? 'up' : 'down'; chg.textContent = (up ? '▲ ' : '▼ ') + Math.abs(ch).toFixed(2) + '% · 24h';
    const sv = p.sar || p.usd * 3.75;
    sar.textContent = '≈ ' + fmt(sv, 4) + ' SAR';
    src.textContent = t('Updated') + ' ' + fmtTime(p.upd || p.t);
    const a = (p.spark || []).map(Number).filter(isFinite);
    if(a.length > 2){
      const mn = Math.min.apply(null, a), mx = Math.max.apply(null, a), r = (mx - mn) || 1;
      const pts = a.map(function(x, i){ return (i / (a.length - 1) * 300).toFixed(1) + ' ' + (46 - (x - mn) / r * 40).toFixed(1); });
      const col = up ? '#6EE7B7' : '#FECACA';
      svg.innerHTML = '<path d="M' + pts.join(' L') + '" fill="none" stroke="' + col + '" stroke-width="2.2" stroke-linejoin="round" vector-effect="non-scaling-stroke"/>';
    } else svg.innerHTML = '';
  }

  function tick(){
    if(!open) return;
    const tt = v.currentTime || 0, i = sceneAt(tt);
    el.querySelectorAll('.ov-bars b').forEach(function(b, k){ const w = k < i ? 100 : k > i ? 0 : Math.min(100, (tt - STARTS[k]) / 6 * 100); b.style.width = w.toFixed(1) + '%'; });
    if(i !== scene){
      scene = i;
      el.querySelectorAll('.ov-txt').forEach(function(x, k){ x.classList.toggle('on', k === i); });
      const h = el.querySelectorAll('.ov-txt h2')[i]; if(h) $('ovLive').textContent = (i + 1) + ' / 4 — ' + h.textContent;
    }
    el.classList.toggle('s-phone', tt >= 13.2 && tt < 17.9);
    el.classList.toggle('s-pi', tt >= 18.4);
    el.classList.toggle('s-end', tt >= 18.4);
    raf = requestAnimationFrame(tick);
  }
  function fallback(){
    if(!open) return;
    open = false; cancelAnimationFrame(raf); clearTimeout(watchdog);
    try{ v.pause(); }catch(e){}
    el.classList.remove('open'); el.classList.add('off');
    showIntro(replay);                       // the light photo version (Skip / Next → login)
  }
  window.ovStart = function(isReplay){
    replay = !!isReplay;
    if(lite || CALM){ el.classList.add('off'); showIntro(replay); return; }
    open = true; scene = -1; el.classList.remove('off', 'leaving', 's-pi', 's-end', 's-phone'); el.classList.add('open');
    pickSrc();
    try{ v.currentTime = 0; }catch(e){}
    renderPi();
    try{ loadPi(true).then(renderPi, renderPi); }catch(e){}
    const im = el.querySelector('.ov-phone img'), want = '/onboarding/app-explore' + (['ar','ur','id','ha','fr'].indexOf(LANG) >= 0 ? '-' + LANG : '') + '.webp';
    if(im && im.getAttribute('src') !== want) im.setAttribute('src', want);
    playOrFallback();
    clearTimeout(watchdog);
    watchdog = setTimeout(function(){ if(open && (v.currentTime || 0) < 0.05) fallback(); }, 6000);   // still not playing → photo version
    document.addEventListener('keydown', keys);
    tick();
  };
  window.ovEnd = function(){
    if(!open && !el.classList.contains('open')) return;
    open = false; cancelAnimationFrame(raf); clearTimeout(watchdog); clearTimeout(endT);
    try{ v.pause(); v.removeAttribute('src'); v.load(); }catch(e){}
    try{ if(window.dsAmb) dsAmb.stop(); }catch(e){}
    const sb = $('ovSound'); if(sb){ sb.classList.remove('on'); sb.setAttribute('aria-pressed', 'false'); }
    document.removeEventListener('keydown', keys);
    try{ sessionStorage.setItem('ds_film_session', '1'); }catch(e){}
    store.set('intro_done', true); store.set('onboarded', true); if(!store.get('persona', null)) store.set('persona', 'visitor');
    document.documentElement.classList.remove('intro-first');
    el.classList.add('leaving');
    setTimeout(function(){ el.classList.remove('open', 'leaving'); }, 460);
    if(!replay && !(typeof entered !== 'undefined' && entered)){ const s = $('splash'); if(s){ s.classList.remove('sp-enter'); void s.offsetWidth; s.classList.add('sp-enter'); } }
    replay = false;
  };
  window.ovToggleSound = function(){
    const b = $('ovSound'), on = !(b && b.classList.contains('on'));
    if(b){ b.classList.toggle('on', on); b.setAttribute('aria-pressed', on ? 'true' : 'false'); b.setAttribute('aria-label', t(on ? 'Sound on' : 'Sound off')); }
    try{ if(window.dsAmb){ if(on) dsAmb.start(); else dsAmb.stop(); } }catch(e){}
  };
  function keys(e){
    if(!open) return;
    if(e.key === 'Escape'){ e.preventDefault(); ovEnd(); }
    else if(e.key === 'ArrowRight' || e.key === 'ArrowLeft'){
      const fwd = (e.key === 'ArrowRight') !== (document.documentElement.dir === 'rtl');
      const i = sceneAt(v.currentTime || 0), n = Math.max(0, Math.min(3, i + (fwd ? 1 : -1))); v.currentTime = STARTS[n] + 0.05;
    }
  }
  // tap the right side for the next scene, the left side for the previous one
  el.addEventListener('click', function(e){
    if(!open || e.target.closest('button,a')) return;
    const r = el.getBoundingClientRect(), rel = (e.clientX - r.left) / r.width, rtl = document.documentElement.dir === 'rtl';
    const back = rtl ? rel > .7 : rel < .3, i = sceneAt(v.currentTime || 0), n = Math.max(0, Math.min(3, i + (back ? -1 : 1)));
    if(n !== i){ v.currentTime = STARTS[n] + 0.05; if(v.paused) v.play().catch(function(){}); }
  });
  v.addEventListener('ended', function(){ if(open) endT = setTimeout(function(){ if(open) ovEnd(); }, 1600); });
  v.addEventListener('error', function(){
    const cur = v.getAttribute('src') || '';
    if(/\.webm(\?|$)/.test(cur)){ v.setAttribute('src', cur.replace(/\.webm/, '.mp4')); if(open) playOrFallback(); return; }   // WebM refused → try MP4 once
    fallback();
  });
  document.addEventListener('visibilitychange', function(){ if(!open) return; if(document.visibilityState === 'visible') v.play().catch(function(){}); else v.pause(); });
  const _al = applyLang; applyLang = function(){ const r = _al.apply(this, arguments); if(open){ scene = -1; renderPi(); } return r; };

  /* words in every language */
  const R = [
    ["All rights reserved.","جميع الحقوق محفوظة.","جملہ حقوق محفوظ ہیں۔","Hak cipta dilindungi.","Duk haƙƙoƙi an kiyaye su.","Tous droits réservés."],
    ["All rights reserved. The DigitalSaudi name, logo, design and original content are protected by copyright.","جميع الحقوق محفوظة. اسم DigitalSaudi وشعاره وتصميمه ومحتواه الأصلي محمية بحقوق النشر.","جملہ حقوق محفوظ ہیں۔ DigitalSaudi کا نام، لوگو، ڈیزائن اور اصل مواد کاپی رائٹ کے تحت محفوظ ہیں۔","Hak cipta dilindungi. Nama, logo, desain, dan konten asli DigitalSaudi dilindungi hak cipta.","Duk haƙƙoƙi an kiyaye su. Sunan DigitalSaudi, tambarinsa, zanensa da ainihin abubuwan cikinsa suna ƙarƙashin kariyar haƙƙin mallaka.","Tous droits réservés. Le nom, le logo, le design et le contenu original de DigitalSaudi sont protégés par le droit d’auteur."],
    ["Illustrative images · some AI-generated","صور توضيحية · بعضها مُنشأ بالذكاء الاصطناعي","وضاحتی تصاویر · کچھ AI سے بنی ہیں","Gambar ilustrasi · sebagian dibuat AI","Hotunan misali · AI ya ƙirƙiri wasu","Images d’illustration · certaines générées par IA"],
    ["Your gateway to places, services and more.","بوابتك إلى الأماكن والخدمات والمزيد.","مقامات، خدمات اور بہت کچھ کا دروازہ۔","Gerbang Anda ke tempat, layanan, dan lainnya.","Ƙofarka zuwa wurare, ayyuka da ƙari.","Votre porte d’entrée vers les lieux, les services et plus encore."],
    ["Your Journey","رحلتك","آپ کا سفر","Perjalanan Anda","Tafiyarka","Votre voyage"],
    ["Starts Here.","تبدأ هنا.","یہاں سے شروع ہوتا ہے۔","dimulai di sini.","ta fara nan.","commence ici."],
    ["Hajj and Umrah guides, travel tools and essential services.","أدلة الحج والعمرة وأدوات السفر والخدمات الأساسية.","حج و عمرہ گائیڈز، سفری ٹولز اور ضروری خدمات۔","Panduan Haji dan Umrah, alat perjalanan, dan layanan penting.","Jagororin Hajji da Umrah, kayan tafiya da muhimman ayyuka.","Guides Hajj et Omra, outils de voyage et services essentiels."],
    ["Discover More.","اكتشف أكثر.","مزید دریافت کریں۔","Temukan lebih banyak.","Gano ƙari.","Découvrez plus."],
    ["Do More.","وأنجز أكثر.","مزید کریں۔","Lakukan lebih banyak.","Yi ƙari.","Faites plus."],
    ["Local businesses, shopping and useful tools in one app.","أعمال محلية وتسوق وأدوات مفيدة في تطبيق واحد.","مقامی کاروبار، خریداری اور مفید ٹولز ایک ایپ میں۔","Bisnis lokal, belanja, dan alat berguna dalam satu aplikasi.","Kasuwancin gida, sayayya da kayan aiki masu amfani a manhaja ɗaya.","Commerces locaux, shopping et outils utiles dans une seule appli."],
    ["Explore the","استكشف","دریافت کریں","Jelajahi","Bincika","Explorez"],
    ["Pi Ecosystem.","منظومة Pi.","Pi ایکو سسٹم۔","ekosistem Pi.","yanayin Pi.","l’écosystème Pi."],
    ["Pi is a digital currency from the Pi Network app.","Pi عملة رقمية من تطبيق Pi Network.","Pi، Pi Network ایپ کی ایک ڈیجیٹل کرنسی ہے۔","Pi adalah mata uang digital dari aplikasi Pi Network.","Pi kuɗin dijital ne daga manhajar Pi Network.","Pi est une monnaie numérique de l’application Pi Network."],
    ["Pi market price","سعر Pi في السوق","Pi کی مارکیٹ قیمت","Harga pasar Pi","Farashin kasuwar Pi","Prix du marché du Pi"],
    ["Live","مباشر","لائیو","Langsung","Kai tsaye","En direct"],
    ["Unavailable","غير متاح","دستیاب نہیں","Tidak tersedia","Babu","Indisponible"],
    ["Live rate unavailable right now","السعر المباشر غير متاح الآن","لائیو قیمت ابھی دستیاب نہیں","Harga langsung belum tersedia","Babu farashi kai tsaye yanzu","Cours en direct indisponible pour le moment"],
    ["See Markets in the app for the latest price.","راجع الأسواق في التطبيق لمعرفة أحدث سعر.","تازہ قیمت کے لیے ایپ میں مارکیٹس دیکھیں۔","Lihat Pasar di aplikasi untuk harga terbaru.","Duba Kasuwanni a manhajar don sabon farashi.","Consultez Marchés dans l’appli pour le dernier prix."],
    ["estimate (USD price × USD→SAR rate)","تقدير (سعر الدولار × سعر صرف الريال)","اندازہ (USD قیمت × USD→SAR ریٹ)","perkiraan (harga USD × kurs USD→SAR)","ƙiyasi (farashin USD × canjin USD→SAR)","estimation (prix USD × taux USD→SAR)"],
    ["Source","المصدر","ماخذ","Sumber","Tushe","Source"],
    ["Updated","آخر تحديث","اپ ڈیٹ","Diperbarui","An sabunta","Mis à jour"],
    ["Saudi time","بتوقيت السعودية","سعودی وقت","waktu Saudi","agogon Saudiyya","heure saoudienne"]
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1] && I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
  try{ if(LANG !== 'en') trWalk(document.body); }catch(e){}

  /* start: first visit → film; returning visit → login page */
  showOnboarding = function(){ ovStart(true); };
  // v6.0: the film plays every time the app is opened (once per visit), not only on the very first visit
  let filmSeen = false; try{ filmSeen = sessionStorage.getItem('ds_film_session') === '1'; }catch(e){}
  if(!filmSeen) ovStart(false);
  else { document.documentElement.classList.remove('intro-first'); el.classList.add('off'); }
})();

/* v5.9 polish — words for the photo cards */
(function(){
  const R = [
    ["AI image","صورة بالذكاء الاصطناعي","AI تصویر","Gambar AI","Hoton AI","Image IA"],
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* v5.9 polish — the login photo always ends just above "Welcome to",
   so the logo sits on the photo and every word sits on white, on any screen height */
(function(){
  const s = $('splash'); if(!s) return;
  const hero = s.querySelector('.sp-hero'), w = s.querySelector('.sp-welcome');
  if(!hero || !w) return;
  function fit(){
    if(getComputedStyle(s).display === 'none') return;
    const top = w.getBoundingClientRect().top - s.getBoundingClientRect().top;
    if(top > 80) hero.style.height = Math.round(top + 4) + 'px';
  }
  window.addEventListener('resize', fit);
  new MutationObserver(fit).observe(s, { attributes:true, attributeFilter:['class','style'] });
  if(document.readyState === 'complete') setTimeout(fit, 50); else window.addEventListener('load', function(){ setTimeout(fit, 50); });
  setTimeout(fit, 400);
  const _al = applyLang; applyLang = function(){ const r = _al.apply(this, arguments); setTimeout(fit, 30); return r; };
})();

/* ==========================================================================
   v6.0 — full-screen news reader
   • Tap any story (or "Full screen") → one story per screen, swipe up for the next.
   • Endless: more stories load as you get near the end; at the very end it offers
     the newest stories again.
   • Large, sharp photos edge to edge; stories without a photo get a clean branded card.
   • Back button / Esc closes it. Works in all six languages.
   ========================================================================== */
(function(){
  const R = [
    ['Full screen','ملء الشاشة','فل اسکرین','Layar penuh','Cikakken allo','Plein écran'],
    ['Read full article','اقرأ المقال كاملاً','پورا مضمون پڑھیں','Baca artikel lengkap','Karanta cikakken labari','Lire l’article complet'],
    ['Swipe up for the next story','اسحب للأعلى للخبر التالي','اگلی خبر کے لیے اوپر سوائپ کریں','Geser ke atas untuk berita berikutnya','Ja sama don labari na gaba','Glissez vers le haut pour l’article suivant'],
    ['You’ve seen every story for now','شاهدت كل الأخبار حتى الآن','آپ نے فی الحال تمام خبریں دیکھ لیں','Anda sudah melihat semua berita saat ini','Ka ga duk labarai a yanzu','Vous avez vu tous les articles pour le moment'],
    ['Show the latest news','اعرض أحدث الأخبار','تازہ ترین خبریں دکھائیں','Tampilkan berita terbaru','Nuna sabbin labarai','Afficher les dernières actualités'],
    ['Loading more stories…','جارٍ تحميل المزيد…','مزید خبریں لوڈ ہو رہی ہیں…','Memuat berita lainnya…','Ana loda ƙarin labarai…','Chargement d’autres articles…'],
    ['Close','إغلاق','بند کریں','Tutup','Rufe','Fermer'],
    ['Share','مشاركة','شیئر','Bagikan','Raba','Partager']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });

  const reel = document.createElement('div');
  reel.id = 'newsReel'; reel.setAttribute('role', 'dialog'); reel.setAttribute('aria-modal', 'true'); reel.setAttribute('aria-label', 'News');
  reel.innerHTML = `<div class="nr-top"><button class="nr-ib" id="nrClose" aria-label="Close"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" fill="none"/></svg></button>
      <div class="nr-ttl"><b id="nrCat"></b><span id="nrCount"></span></div>
      <button class="nr-ib" id="nrShare" aria-label="Share"><svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 3v12M7 8l5-5 5 5M5 14v5a2 2 0 002 2h10a2 2 0 002-2v-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg></button></div>
    <div class="nr-track" id="nrTrack"></div>`;
  document.body.appendChild(reel);
  const track = reel.querySelector('#nrTrack');
  let open = false, pushed = false, idx = 0, rendered = 0, endSlide = null;

  function slideHTML(it, i){
    const photo = it.img ? `<img class="nr-img" src="${esc(it.img)}" alt="" ${i > 1 ? 'loading="lazy"' : ''} decoding="async" referrerpolicy="no-referrer" onerror="this.parentNode.classList.add('noimg');this.remove()">` : '';
    return `<article class="nr-slide ${it.img ? '' : 'noimg'}" data-i="${i}" data-id="${esc(it.id)}">
      ${photo}<div class="nr-brand notr" dir="ltr">${esc(it.source)}</div><div class="nr-shade"></div>
      <div class="nr-body">
        <div class="nr-meta"><span class="nr-chip">${esc(t(catName(it.cat)))}</span><span class="notr">${esc(it.source)}</span> · ${esc(ago(it.date))}</div>
        <h2 class="nr-h">${esc(it.title)}</h2>
        ${it.summary ? `<p class="nr-p">${esc(it.summary)}</p>` : ''}
        <button class="nr-read" onclick="readFull('${esc(it.id)}')">${esc(t('Read full article'))} <span aria-hidden="true">›</span></button>
        ${i === 0 ? `<div class="nr-hint">${esc(t('Swipe up for the next story'))} ↑</div>` : ''}
      </div></article>`;
  }
  function renderMore(){
    if(endSlide){ endSlide.remove(); endSlide = null; }
    const frag = news.items.slice(rendered).map(function(it, k){ return slideHTML(it, rendered + k); }).join('');
    if(frag) track.insertAdjacentHTML('beforeend', frag);
    rendered = news.items.length;
    const end = document.createElement('div'); end.className = 'nr-slide nr-end';
    end.innerHTML = news.done
      ? `<div class="nr-endbox"><div class="nr-tick">✓</div><h3>${esc(t('You’ve seen every story for now'))}</h3><button class="nr-read" id="nrFresh">${esc(t('Show the latest news'))} ↻</button></div>`
      : `<div class="nr-endbox"><div class="spinner" style="border-color:rgba(255,255,255,.25);border-top-color:#fff"></div><p>${esc(t('Loading more stories…'))}</p></div>`;
    track.appendChild(end); endSlide = end;
    const fr = end.querySelector('#nrFresh');
    if(fr) fr.onclick = function(){ refresh(); };
    count();
  }
  function count(){
    $('nrCat').textContent = t(catName(news.cat === 'all' ? 'all' : news.cat));
    $('nrCount').textContent = rendered ? (Math.min(idx + 1, rendered) + ' / ' + rendered + (news.done ? '' : '+')) : '';
  }
  function more(){
    if(news.done || news.loading) return;
    loadNews().then(function(){ if(open) renderMore(); });
  }
  function refresh(){
    track.innerHTML = ''; rendered = 0; endSlide = null; idx = 0;
    newsReset();
    (news.pending || Promise.resolve()).then(function(){ if(open){ renderMore(); track.scrollTop = 0; } });
  }
  // which slide is on screen
  let ticking = false;
  track.addEventListener('scroll', function(){
    if(ticking) return; ticking = true;
    requestAnimationFrame(function(){
      ticking = false;
      const h = track.clientHeight || 1; idx = Math.round(track.scrollTop / h); count();
      if(idx >= rendered - 3) more();
    });
  }, { passive:true });

  window.openNewsReel = function(id){
    if(!news.items.length) return false;
    let start = id ? news.items.findIndex(function(x){ return x.id === id; }) : 0;
    if(start < 0) return false;
    track.innerHTML = ''; rendered = 0; endSlide = null;
    renderMore();
    open = true; reel.classList.add('open'); document.documentElement.classList.add('nr-lock');
    try{ history.pushState({ newsReel:1 }, ''); pushed = true; }catch(e){}
    idx = start;
    requestAnimationFrame(function(){ track.scrollTop = start * track.clientHeight; count(); });
    if(start >= rendered - 3) more();
    const r = store.get('readCount', 0) + 1; store.set('readCount', r); if(r >= 5 && typeof award === 'function') award('reader');
    return true;
  };
  function close(viaPop){
    if(!open) return;
    open = false; reel.classList.remove('open'); document.documentElement.classList.remove('nr-lock');
    if(!viaPop && pushed){ pushed = false; try{ history.back(); }catch(e){} }
    pushed = false;
  }
  window.closeNewsReel = close;
  $('nrClose').onclick = function(){ close(false); };
  $('nrShare').onclick = function(){ const it = news.items[idx]; if(it) shareText(it.title, it.title + ' — via DigitalSaudi', it.link); };
  window.addEventListener('popstate', function(){ if(open) close(true); });
  document.addEventListener('keydown', function(e){
    if(!open) return;
    if(e.key === 'Escape') close(false);
    if(e.key === 'ArrowDown' || e.key === 'PageDown'){ e.preventDefault(); track.scrollBy({ top: track.clientHeight, behavior:'smooth' }); }
    if(e.key === 'ArrowUp' || e.key === 'PageUp'){ e.preventDefault(); track.scrollBy({ top: -track.clientHeight, behavior:'smooth' }); }
  });

  // stories in the News list open the full-screen reader
  const _open = openArticle;
  openArticle = function(id){ if(!window.openNewsReel(id)) _open(id); };

  // "Full screen" button above the categories
  const cats = $('newsCats');
  if(cats && !$('nrOpenBtn')){
    const b = document.createElement('button'); b.id = 'nrOpenBtn'; b.className = 'nr-open';
    b.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg><span>' + esc(t('Full screen')) + '</span>';
    b.onclick = function(){ if(news.items.length) openNewsReel(news.items[0].id); else { newsReset(); (news.pending || Promise.resolve()).then(function(){ if(news.items.length) openNewsReel(news.items[0].id); }); } };
    cats.parentNode.insertBefore(b, cats);
  }
})();

/* ==========================================================================
   v6.0 — live minute, goals & cards, and line-ups inside each match
   Data from /match (API-Football). Refreshes every 60 s while a match is live and open.
   If the service isn't set up or has nothing yet, the section stays hidden or says when
   line-ups usually appear — never invented data.
   ========================================================================== */
(function(){
  const R = [
    ['Line-ups','التشكيلات','لائن اپس','Susunan pemain','Jerin ’yan wasa','Compositions'],
    ['Starting XI','التشكيلة الأساسية','ابتدائی الیون','Starting XI','’Yan wasa 11 na farko','Titulaires'],
    ['Substitutes','البدلاء','متبادل کھلاڑی','Pemain cadangan','’Yan canji','Remplaçants'],
    ['Coach','المدرب','کوچ','Pelatih','Koci','Entraîneur'],
    ['Match events','أحداث المباراة','میچ کے واقعات','Kejadian pertandingan','Abubuwan wasa','Faits de match'],
    ['Line-ups usually appear about an hour before kick-off.','تظهر التشكيلات عادةً قبل ساعة تقريباً من بداية المباراة.','لائن اپس عموماً میچ سے تقریباً ایک گھنٹہ پہلے آتے ہیں۔','Susunan pemain biasanya muncul sekitar satu jam sebelum kick-off.','Jerin ’yan wasa yakan fito kusan awa ɗaya kafin fara wasa.','Les compositions paraissent environ une heure avant le coup d’envoi.'],
    ['Live data: API-Football','بيانات مباشرة: API-Football','لائیو ڈیٹا: API-Football','Data langsung: API-Football','Bayanai kai tsaye: API-Football','Données en direct : API-Football'],
    ['No goals or cards yet.','لا أهداف أو بطاقات بعد.','ابھی کوئی گول یا کارڈ نہیں۔','Belum ada gol atau kartu.','Babu ƙwallo ko kati tukuna.','Pas encore de but ni de carton.']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });

  let timer = 0;
  const ICON = function(e){
    if(e.type === 'Goal') return e.detail === 'Own Goal' ? '⚽<small>OG</small>' : e.detail === 'Missed Penalty' ? '❌' : '⚽';
    if(e.type === 'Card') return /red/i.test(e.detail) ? '🟥' : '🟨';
    if(e.type === 'subst') return '🔁';
    if(e.type === 'Var') return '📺';
    return '•';
  };
  function evHTML(d){
    const ev = (d.events || []).filter(function(e){ return e.type === 'Goal' || e.type === 'Card' || e.type === 'subst' || e.type === 'Var'; });
    if(!ev.length) return `<p class="small">${esc(t('No goals or cards yet.'))}</p>`;
    return '<div class="mx-ev">' + ev.map(function(e){
      const min = (e.min != null ? e.min : '') + (e.plus ? '+' + e.plus : '') + '′';
      const who = e.type === 'subst' ? `${esc(e.assist || '')} <span class="mx-dim">↔ ${esc(e.player || '')}</span>` : esc(e.player || '') + (e.assist && e.type === 'Goal' ? ` <span class="mx-dim">(${esc(e.assist)})</span>` : '');
      return `<div class="mx-row ${e.side}"><span class="mx-min">${min}</span><span class="mx-ic">${ICON(e)}</span><span class="mx-who notr">${who}</span></div>`;
    }).join('') + '</div>';
  }
  function luHTML(d){
    if(!d.lineups || !d.lineups.length) return `<p class="small">${esc(t('Line-ups usually appear about an hour before kick-off.'))}</p>`;
    const col = function(l){
      return `<div class="mx-team"><div class="mx-th"><b class="notr">${esc(l.team || '')}</b>${l.formation ? `<span class="mx-form">${esc(l.formation)}</span>` : ''}</div>
        <div class="mx-sub">${esc(t('Starting XI'))}</div>
        ${l.start.map(function(p){ return `<div class="mx-pl"><span class="mx-no">${p.n != null ? p.n : ''}</span><span class="notr">${esc(p.name)}</span><span class="mx-pos">${esc(p.pos || '')}</span></div>`; }).join('')}
        ${l.subs.length ? `<details class="mx-subs"><summary>${esc(t('Substitutes'))} (${l.subs.length})</summary>${l.subs.map(function(p){ return `<div class="mx-pl"><span class="mx-no">${p.n != null ? p.n : ''}</span><span class="notr">${esc(p.name)}</span><span class="mx-pos">${esc(p.pos || '')}</span></div>`; }).join('')}</details>` : ''}
        ${l.coach ? `<div class="mx-coach">${esc(t('Coach'))}: <span class="notr">${esc(l.coach)}</span></div>` : ''}</div>`;
    };
    const h = d.lineups.find(function(l){ return l.side === 'home'; }) || d.lineups[0];
    const a = d.lineups.find(function(l){ return l.side === 'away'; }) || d.lineups[1];
    return `<div class="mx-lu">${h ? col(h) : ''}${a ? col(a) : ''}</div>`;
  }
  function paint(m, d){
    const box = $('mxLive'); if(!box) return;
    if(!d || !d.ok){
      if(d && d.reason === 'not_configured'){ box.innerHTML = ''; return; }
      box.innerHTML = `<h4>${esc(t('Line-ups'))}</h4><p class="small">${esc(t('Line-ups usually appear about an hour before kick-off.'))}</p>`;
      return;
    }
    // fresher score and minute at the top of the match card
    const sc = $('mxScore'), stt = $('mxStatus');
    if(sc && d.score && d.score.home != null) sc.textContent = d.score.home + ' – ' + d.score.away;
    if(stt){ stt.innerHTML = d.live ? `<span class="mx-live">● LIVE ${d.status === 'HT' ? 'HT' : (d.elapsed || 0) + (d.extra ? '+' + d.extra : '') + '′'}</span>` : esc(d.statusText || ''); }
    box.innerHTML = `<h4>${esc(t('Match events'))}</h4>${evHTML(d)}<h4>${esc(t('Line-ups'))}</h4>${luHTML(d)}`;
  }
  function load(m){
    const kick = new Date(m.utc);
    const q = '/match?date=' + kick.toISOString().slice(0, 10) + '&home=' + encodeURIComponent(m.home.name) + '&away=' + encodeURIComponent(m.away.name) + '&kick=' + encodeURIComponent(m.utc);
    getJSON(q, 15000).then(function(d){
      if(!current || current.id !== 'match') return;
      paint(m, d);
      clearTimeout(timer);
      if(d && d.ok && d.live) timer = setTimeout(function(){ if(current && current.id === 'match') load(m); }, 60000);
    }).catch(function(){ const b = $('mxLive'); if(b) b.innerHTML = ''; });
  }
  const _open = openMatch;
  openMatch = function(id){
    _open(id);
    const m = matchCache[id]; if(!m || !current || current.id !== 'match') return;
    // mark the score and status so live data can update them
    const card = document.querySelector('#pBody .card');
    if(card){
      const st = card.querySelector('.small'); if(st) st.id = 'mxStatus';
      const sc = card.querySelector('div[style*="font-size:34px"]'); if(sc) sc.id = 'mxScore';
    }
    const fav = [].slice.call(document.querySelectorAll('#pBody h4')).find(function(h){ return /Favourite team/.test(h.textContent) || h.textContent === t('Favourite team'); });
    const box = document.createElement('div'); box.id = 'mxLive';
    box.innerHTML = '<div class="skeleton" style="height:60px;margin:14px 0"></div>';
    if(fav) fav.parentNode.insertBefore(box, fav); else $('pBody').appendChild(box);
    const prevCleanup = typeof panelCleanup === 'function' ? panelCleanup : null;
    panelCleanup = function(){ clearTimeout(timer); if(prevCleanup) try{ prevCleanup(); }catch(e){} };
    load(m);
  };
})();

/* v6.0 — finish a poster download that Pi Browser handed to the phone's own browser */
(function(){
  const h = location.hash || '';
  if(h.indexOf('#mkposter=') !== 0) return;
  let d = null; try{ d = JSON.parse(decodeURIComponent(h.slice(10))); }catch(e){}
  try{ history.replaceState(null, '', location.pathname); }catch(e){}
  if(!d || !d.name || !d.to) return;
  const fmt = d.f === 'pdf' ? 'pdf' : 'png'; delete d.f;
  setTimeout(function(){
    store.set('onboarded', true); store.set('intro_done', true);
    try{ if(typeof ovEnd === 'function') ovEnd(); }catch(e){}
    try{ if(!(typeof entered !== 'undefined' && entered)) enterApp(); }catch(e){}
    setTimeout(function(){
      posterPanel(d); setTimeout(function(){ POSTER_LAST = null; makePoster(); }, 300);
      let n = 0; const wait = setInterval(function(){
        n++;
        if(POSTER_LAST && POSTER_LAST.canvas){
          clearInterval(wait);
          if(fmt === 'pdf') posterPDF(); else posterDownload();
          toast('Your poster is downloading. Check your Downloads folder.');
        } else if(n > 40){ clearInterval(wait); toast('Tap “Save PNG” to download your poster'); }
      }, 300);
    }, 600);
  }, 400);
})();

/* ==========================================================================
   v6.2 — "Why Pi in Saudi?" rebuilt as a small film library.
   Five real motion films (films/*.mp4, made from DigitalSaudi's own screens and photos).
   Captions are overlaid by the app, timed to the film, in all six languages.
   Replaces the drawn SVG stories, "Filming soon" placeholders and the old screen tours.
   ========================================================================== */
const WF_FILMS = [
  { id:'intro', t:'Why Pi in Saudi?', s:'The story in 30 seconds', d:30, cap:[
    [0.4, 'Saudi Arabia is going digital.'],
    [6.4, 'Pi is a digital currency built by a global community.'],
    [12.4, 'DigitalSaudi brings Pi into everyday life: prayer times, places, prices and payments.'],
    [18.4, 'Made for businesses, visitors and pilgrims.'],
    [24.4, 'DigitalSaudi — Pi in Saudi, made simple.'] ] },
  { id:'shop', t:'Paying with Pi in a shop', s:'Scan, check, approve', d:32, act:['Find Pi businesses', 'directory'], cap:[
    [0.4, 'You see an “Accept Pi” poster at a shop.'],
    [6.4, 'Scan the QR code with your phone.'],
    [12.4, 'The pay page shows the shop and the price. Check both.'],
    [18.4, 'Send from your Pi Wallet and confirm. Only you can approve.'],
    [25.4, 'Done. The payment is recorded on the Pi blockchain.'] ] },
  { id:'merchant', t:'Accept Pi in 3 steps', s:'For shops, cafés and freelancers', d:30, act:['Make my poster', 'merchantQR'], cap:[
    [0.4, 'Step 1 · Open the “Accept Pi” poster tool in DigitalSaudi.'],
    [7.4, 'Step 2 · Add your Pi username and price. Your poster is ready.'],
    [15.4, 'Step 3 · Print it, or share your pay link with customers.'],
    [22.4, 'Payments go straight to your own wallet. Never share your passphrase.'] ] },
  { id:'travel', t:'Explore Saudi with Pi', s:'Heritage, cities and trips', d:28, act:['Plan a trip', 'trips'], cap:[
    [0.4, 'Plan your journey across Saudi Arabia.'],
    [6.4, 'Discover heritage sites like AlUla and Hegra.'],
    [12.4, 'Find breathtaking views and hidden gems.'],
    [18.4, 'City guides, a trip planner and a Pi business directory — in one app.'],
    [24.4, 'Explore Saudi with DigitalSaudi.'] ] },
  { id:'safety', t:'Stay safe with Pi', s:'Simple rules that protect you', d:30, act:['Open the Safety center', 'safety'], cap:[
    [0.4, 'Stay safe with Pi.'],
    [7.4, 'Never share your wallet passphrase — with anyone.'],
    [15.4, 'Before you pay, check the name and amount. Pi payments can’t be reversed.'],
    [22.4, 'DigitalSaudi will never ask for your passphrase.'] ] }
];

(function(){
  const R = [
    ['Saudi Arabia is going digital.','المملكة العربية السعودية تتجه نحو الرقمنة.','سعودی عرب ڈیجیٹل دور کی طرف بڑھ رہا ہے۔','Arab Saudi sedang bergerak ke era digital.','Saudiyya na tafiya zuwa zamanin dijital.','L’Arabie saoudite passe au numérique.'],
    ['Pi is a digital currency built by a global community.','Pi عملة رقمية يبنيها مجتمع عالمي.','Pi ایک ڈیجیٹل کرنسی ہے جسے ایک عالمی کمیونٹی بنا رہی ہے۔','Pi adalah mata uang digital yang dibangun oleh komunitas global.','Pi kuɗin dijital ne da al’ummar duniya ke ginawa.','Pi est une monnaie numérique construite par une communauté mondiale.'],
    ['DigitalSaudi brings Pi into everyday life: prayer times, places, prices and payments.','يجلب DigitalSaudi عملة Pi إلى الحياة اليومية: أوقات الصلاة، والأماكن، والأسعار، والمدفوعات.','DigitalSaudi، Pi کو روزمرہ زندگی میں لاتا ہے: نماز کے اوقات، مقامات، قیمتیں اور ادائیگیاں۔','DigitalSaudi membawa Pi ke kehidupan sehari-hari: waktu salat, tempat, harga, dan pembayaran.','DigitalSaudi na kawo Pi cikin rayuwar yau da kullum: lokutan sallah, wurare, farashi da biyan kuɗi.','DigitalSaudi intègre Pi au quotidien : heures de prière, lieux, cours et paiements.'],
    ['Made for businesses, visitors and pilgrims.','مصمَّم للأعمال والزوار والحجاج والمعتمرين.','کاروبار، سیاحوں اور زائرین کے لیے بنایا گیا۔','Dibuat untuk pelaku usaha, wisatawan, dan jemaah.','An yi shi don ’yan kasuwa, baƙi da mahajjata.','Pensé pour les commerces, les visiteurs et les pèlerins.'],
    ['DigitalSaudi — Pi in Saudi, made simple.','DigitalSaudi — عملة Pi في السعودية، بكل بساطة.','DigitalSaudi — سعودی عرب میں Pi، آسان انداز میں۔','DigitalSaudi — Pi di Saudi, jadi mudah.','DigitalSaudi — Pi a Saudiyya, cikin sauƙi.','DigitalSaudi — Pi en Arabie saoudite, en toute simplicité.'],
    ['You see an “Accept Pi” poster at a shop.','ترى ملصق «نقبل Pi» في أحد المتاجر.','آپ کسی دکان پر «Pi قبول ہے» کا پوسٹر دیکھتے ہیں۔','Anda melihat poster “Terima Pi” di sebuah toko.','Ka ga fosta “Ana karɓar Pi” a wani shago.','Vous voyez une affiche « Pi accepté » dans une boutique.'],
    ['Scan the QR code with your phone.','امسح رمز QR بهاتفك.','اپنے فون سے QR کوڈ اسکین کریں۔','Pindai kode QR dengan ponsel Anda.','Duba lambar QR da wayarka.','Scannez le QR code avec votre téléphone.'],
    ['The pay page shows the shop and the price. Check both.','تعرض صفحة الدفع اسم المتجر والسعر. تحقّق من الاثنين.','ادائیگی کے صفحے پر دکان اور قیمت نظر آتی ہے۔ دونوں چیک کریں۔','Halaman bayar menampilkan toko dan harganya. Periksa keduanya.','Shafin biya yana nuna shagon da farashin. Duba duka biyun.','La page de paiement affiche la boutique et le prix. Vérifiez les deux.'],
    ['Send from your Pi Wallet and confirm. Only you can approve.','أرسل من محفظة Pi وأكّد. أنت وحدك من يوافق.','اپنے Pi Wallet سے بھیجیں اور تصدیق کریں۔ منظوری صرف آپ دے سکتے ہیں۔','Kirim dari Pi Wallet Anda lalu konfirmasi. Hanya Anda yang bisa menyetujui.','Aika daga Pi Wallet ɗinka ka tabbatar. Kai kaɗai ke iya amincewa.','Envoyez depuis votre Pi Wallet et confirmez. Vous seul pouvez valider.'],
    ['Done. The payment is recorded on the Pi blockchain.','تم. تُسجَّل الدفعة على بلوكشين Pi.','ہو گیا۔ ادائیگی Pi بلاک چین پر درج ہو جاتی ہے۔','Selesai. Pembayaran tercatat di blockchain Pi.','An gama. An rubuta biyan a blockchain na Pi.','C’est fait. Le paiement est enregistré sur la blockchain Pi.'],
    ['Step 1 · Open the “Accept Pi” poster tool in DigitalSaudi.','الخطوة 1 · افتح أداة ملصق «نقبل Pi» في DigitalSaudi.','مرحلہ 1 · DigitalSaudi میں «Pi قبول ہے» پوسٹر ٹول کھولیں۔','Langkah 1 · Buka alat poster “Terima Pi” di DigitalSaudi.','Mataki na 1 · Buɗe kayan aikin fosta “Ana karɓar Pi” a DigitalSaudi.','Étape 1 · Ouvrez l’outil d’affiche « Pi accepté » dans DigitalSaudi.'],
    ['Step 2 · Add your Pi username and price. Your poster is ready.','الخطوة 2 · أضف اسم مستخدم Pi والسعر. ملصقك جاهز.','مرحلہ 2 · اپنا Pi یوزرنیم اور قیمت درج کریں۔ آپ کا پوسٹر تیار ہے۔','Langkah 2 · Masukkan nama pengguna Pi dan harga. Poster Anda siap.','Mataki na 2 · Saka sunan Pi ɗinka da farashi. Fostarka ta shirya.','Étape 2 · Ajoutez votre nom d’utilisateur Pi et le prix. Votre affiche est prête.'],
    ['Step 3 · Print it, or share your pay link with customers.','الخطوة 3 · اطبعه أو شارك رابط الدفع مع عملائك.','مرحلہ 3 · اسے پرنٹ کریں یا ادائیگی کا لنک گاہکوں کے ساتھ شیئر کریں۔','Langkah 3 · Cetak, atau bagikan tautan bayar Anda ke pelanggan.','Mataki na 3 · Buga ta, ko raba hanyar biyanka da kwastomomi.','Étape 3 · Imprimez-la ou partagez votre lien de paiement avec vos clients.'],
    ['Payments go straight to your own wallet. Never share your passphrase.','تصل المدفوعات مباشرة إلى محفظتك. لا تشارك عبارة المرور أبداً.','ادائیگیاں سیدھی آپ کے اپنے والٹ میں آتی ہیں۔ اپنا پاس فریز کبھی شیئر نہ کریں۔','Pembayaran langsung masuk ke dompet Anda sendiri. Jangan pernah membagikan frasa sandi.','Kuɗi na shiga walat ɗinka kai tsaye. Kada ka taɓa raba kalmomin sirrinka.','Les paiements arrivent directement dans votre portefeuille. Ne partagez jamais votre phrase secrète.'],
    ['Plan your journey across Saudi Arabia.','خطّط لرحلتك في أرجاء المملكة.','سعودی عرب بھر میں اپنے سفر کی منصوبہ بندی کریں۔','Rencanakan perjalanan Anda di seluruh Arab Saudi.','Tsara tafiyarka a faɗin Saudiyya.','Préparez votre voyage à travers l’Arabie saoudite.'],
    ['Discover heritage sites like AlUla and Hegra.','اكتشف مواقع التراث مثل العُلا والحِجر.','العُلا اور حِجر جیسے تاریخی مقامات دریافت کریں۔','Temukan situs warisan seperti AlUla dan Hegra.','Gano wuraren tarihi kamar AlUla da Hegra.','Découvrez des sites historiques comme AlUla et Hégra.'],
    ['Find breathtaking views and hidden gems.','اعثر على إطلالات خلّابة وأماكن مميزة.','دلکش نظارے اور چھپے ہوئے خوبصورت مقامات تلاش کریں۔','Temukan pemandangan menakjubkan dan tempat tersembunyi.','Nemo kyawawan wurare da wuraren ɓoye masu ban sha’awa.','Trouvez des panoramas superbes et des lieux secrets.'],
    ['City guides, a trip planner and a Pi business directory — in one app.','أدلة المدن، ومخطِّط الرحلات، ودليل أعمال Pi — في تطبيق واحد.','شہری گائیڈز، ٹرپ پلانر اور Pi کاروباری ڈائریکٹری — ایک ہی ایپ میں۔','Panduan kota, perencana perjalanan, dan direktori bisnis Pi — dalam satu aplikasi.','Jagororin birane, mai tsara tafiya da jerin kasuwancin Pi — a manhaja ɗaya.','Guides de ville, planificateur de voyage et annuaire des commerces Pi — dans une seule app.'],
    ['Explore Saudi with DigitalSaudi.','استكشف السعودية مع DigitalSaudi.','DigitalSaudi کے ساتھ سعودی عرب دریافت کریں۔','Jelajahi Saudi bersama DigitalSaudi.','Bincika Saudiyya tare da DigitalSaudi.','Explorez l’Arabie saoudite avec DigitalSaudi.'],
    ['Stay safe with Pi.','ابقَ آمناً مع Pi.','Pi کے ساتھ محفوظ رہیں۔','Tetap aman bersama Pi.','Ka kasance lafiya da Pi.','Restez en sécurité avec Pi.'],
    ['Never share your wallet passphrase — with anyone.','لا تشارك عبارة مرور محفظتك أبداً — مع أي شخص.','اپنے والٹ کا پاس فریز کبھی کسی کے ساتھ شیئر نہ کریں۔','Jangan pernah membagikan frasa sandi dompet Anda — kepada siapa pun.','Kada ka taɓa raba kalmomin sirrin walat ɗinka — da kowa.','Ne partagez jamais la phrase secrète de votre portefeuille — avec personne.'],
    ['Before you pay, check the name and amount. Pi payments can’t be reversed.','قبل الدفع، تحقّق من الاسم والمبلغ. لا يمكن استرجاع مدفوعات Pi.','ادائیگی سے پہلے نام اور رقم چیک کریں۔ Pi کی ادائیگیاں واپس نہیں ہو سکتیں۔','Sebelum membayar, periksa nama dan jumlahnya. Pembayaran Pi tidak bisa dibatalkan.','Kafin ka biya, duba suna da adadin. Ba a iya dawo da biyan Pi.','Avant de payer, vérifiez le nom et le montant. Les paiements Pi sont irréversibles.'],
    ['DigitalSaudi will never ask for your passphrase.','لن يطلب DigitalSaudi عبارة المرور الخاصة بك أبداً.','DigitalSaudi آپ سے کبھی آپ کا پاس فریز نہیں مانگے گا۔','DigitalSaudi tidak akan pernah meminta frasa sandi Anda.','DigitalSaudi ba za ta taɓa neman kalmomin sirrinka ba.','DigitalSaudi ne vous demandera jamais votre phrase secrète.'],
    ['The story in 30 seconds','القصة في 30 ثانية','30 سیکنڈ میں پوری کہانی','Ceritanya dalam 30 detik','Labarin cikin daƙiƙa 30','L’histoire en 30 secondes'],
    ['Paying with Pi in a shop','الدفع بعملة Pi في المتجر','دکان میں Pi سے ادائیگی','Membayar dengan Pi di toko','Biyan kuɗi da Pi a shago','Payer en Pi dans une boutique'],
    ['Scan, check, approve','امسح، تحقّق، وافق','اسکین کریں، چیک کریں، منظور کریں','Pindai, periksa, setujui','Duba, tabbatar, amince','Scanner, vérifier, valider'],
    ['Accept Pi in 3 steps','اقبل Pi في 3 خطوات','3 مراحل میں Pi قبول کریں','Terima Pi dalam 3 langkah','Karɓi Pi cikin matakai 3','Accepter Pi en 3 étapes'],
    ['For shops, cafés and freelancers','للمتاجر والمقاهي والمستقلين','دکانوں، کیفے اور فری لانسرز کے لیے','Untuk toko, kafe, dan pekerja lepas','Don shaguna, gidajen shayi da masu aikin kansu','Pour boutiques, cafés et indépendants'],
    ['Explore Saudi with Pi','استكشف السعودية مع Pi','Pi کے ساتھ سعودی عرب دریافت کریں','Jelajahi Saudi dengan Pi','Bincika Saudiyya da Pi','Explorer l’Arabie saoudite avec Pi'],
    ['Heritage, cities and trips','تراث ومدن ورحلات','ورثہ، شہر اور سفر','Warisan, kota, dan perjalanan','Tarihi, birane da tafiye-tafiye','Patrimoine, villes et voyages'],
    ['Stay safe with Pi','ابقَ آمناً مع Pi','Pi کے ساتھ محفوظ رہیں','Tetap aman bersama Pi','Ka kasance lafiya da Pi','Restez en sécurité avec Pi'],
    ['Simple rules that protect you','قواعد بسيطة تحميك','آسان اصول جو آپ کی حفاظت کرتے ہیں','Aturan sederhana yang melindungi Anda','Dokoki masu sauƙi da ke kare ka','Des règles simples qui vous protègent'],
    ['Watch the film','شاهد الفيلم','فلم دیکھیں','Tonton filmnya','Kalli fim ɗin','Voir le film'],
    ['All films','جميع الأفلام','تمام فلمیں','Semua film','Duk fina-finai','Tous les films'],
    ['Watch next','التالي','اگلی فلم','Tonton berikutnya','Na gaba','À suivre'],
    ['Replay','إعادة التشغيل','دوبارہ چلائیں','Putar ulang','Sake kunnawa','Revoir'],
    ['Find Pi businesses','ابحث عن أعمال تقبل Pi','Pi قبول کرنے والے کاروبار تلاش کریں','Cari bisnis Pi','Nemo kasuwancin Pi','Trouver des commerces Pi'],
    ['Make my poster','أنشئ ملصقي','میرا پوسٹر بنائیں','Buat poster saya','Ƙirƙiri fostata','Créer mon affiche'],
    ['Plan a trip','خطّط لرحلة','سفر کا منصوبہ بنائیں','Rencanakan perjalanan','Tsara tafiya','Préparer un voyage'],
    ['Open the Safety center','افتح مركز الأمان','سیفٹی سینٹر کھولیں','Buka Pusat Keamanan','Buɗe Cibiyar Tsaro','Ouvrir le centre de sécurité'],
    ['Short films about Pi in everyday Saudi life','أفلام قصيرة عن Pi في الحياة اليومية بالسعودية','سعودی عرب کی روزمرہ زندگی میں Pi پر مختصر فلمیں','Film pendek tentang Pi dalam kehidupan sehari-hari di Saudi','Gajerun fina-finai game da Pi a rayuwar yau da kullum a Saudiyya','Courts films sur Pi dans la vie quotidienne en Arabie saoudite'],
    ['Captions','الترجمة','کیپشن','Teks','Rubutu','Sous-titres'],
    ['Video could not play. Check your connection and try again.','تعذّر تشغيل الفيديو. تحقّق من الاتصال وحاول مجدداً.','ویڈیو نہیں چل سکی۔ کنکشن چیک کر کے دوبارہ کوشش کریں۔','Video tidak dapat diputar. Periksa koneksi dan coba lagi.','Bidiyo bai kunna ba. Duba haɗin intanet ka sake gwadawa.','La vidéo n’a pas pu être lue. Vérifiez votre connexion et réessayez.']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
})();

const WF = { pushed:0, skipPop:false, film:null, raf:0, cap:-1, opener:null };
function wfFilm(id){ return WF_FILMS.find(function(f){ return f.id === id; }); }
function wfSrc(id){
  let sd = (window.innerWidth * (window.devicePixelRatio || 1)) < 900;
  try{ if(navigator.connection && (navigator.connection.saveData || /2g/.test(navigator.connection.effectiveType || ''))) sd = true; }catch(e){}
  return 'films/' + id + (sd ? '-sd' : '') + wfExt() + '?v=62';
}
function wfExt(){
  // H.264 MP4 plays almost everywhere (iPhone, Android, Pi Browser); WebM VP9 covers browsers without H.264
  try{ const v = document.createElement('video');
    if(v.canPlayType('video/mp4; codecs="avc1.640028"')) return '.mp4';
    if(v.canPlayType('video/webm; codecs="vp9"')) return '.webm'; }catch(e){}
  return '.mp4';
}
function wfDur(f){ return '0:' + String(f.d).padStart(2, '0'); }
function wfCardHTML(f){
  return `<button class="wf-card" onclick="whyPlay('${f.id}')"><span class="wf-th"><img src="films/${f.id}.jpg?v=62" alt="" loading="lazy" decoding="async"><span class="wf-pp">${ico('play')}</span><span class="wf-d">${wfDur(f)}</span></span><span class="wf-tx"><b>${esc(t(f.t))}</b><small>${esc(t(f.s))}</small></span></button>`;
}
function wfLibHTML(){
  const hero = WF_FILMS[0];
  return `<div class="wf-hero" onclick="whyPlay('intro')" role="button" tabindex="0" aria-label="${esc(t('Watch the film'))}">
      <img src="films/intro.jpg?v=62" alt="">
      <div class="wf-hg"></div>
      <div class="wf-ht"><h1>${esc(t(hero.t))}</h1><p>${esc(t('Short films about Pi in everyday Saudi life'))}</p>
        <span class="wf-btn">${ico('play')}${esc(t('Watch the film'))}<em>${wfDur(hero)}</em></span></div></div>
    <div class="wf-sec">${esc(t('All films'))}</div>
    <div class="wf-grid">${WF_FILMS.slice(1).map(wfCardHTML).join('')}</div>
    ${typeof WHY_TODAY !== 'undefined' ? `<div class="wf-sec">${esc(t('Available today in DigitalSaudi'))}</div><div class="wf-today">${WHY_TODAY.map(function(x, i){ return `<button onclick="WHY_TODAY[${i}][3]()"><span class="ti">${ico(x[0])}</span><span><b>${esc(t(x[1]))}</b><small>${esc(t(x[2]))}</small></span><span class="go">›</span></button>`; }).join('')}</div>` : ''}
    <p class="wf-copy">© 2026 DigitalSaudi</p>`;
}
function wfEnsure(){
  if($('wf')) return;
  document.body.insertAdjacentHTML('beforeend', `<div id="wf" class="wf notr" role="dialog" aria-modal="true" aria-labelledby="wfTitle">
      <div class="wf-top"><button class="wf-ib" onclick="whyClose()" aria-label="${esc(t('Back'))}">${ico('back')}</button><h2 id="wfTitle">${esc(t('Why Pi in Saudi?'))}</h2><button class="wf-ib" onclick="whyShareApp()" aria-label="${esc(t('Share'))}">${ico('share')}</button></div>
      <div class="wf-body" id="wfBody"></div></div>
    <div id="wfp" class="wfp notr" role="dialog" aria-modal="true" aria-label="${esc(t('Video player'))}">
      <video id="wfv" playsinline webkit-playsinline muted preload="auto" disablepictureinpicture></video>
      <div class="wfp-shade"></div>
      <div class="wfp-bar"><i id="wfpBar"></i></div>
      <div class="wfp-head"><button class="wf-ib" onclick="whyStop()" aria-label="${esc(t('Close video'))}">${ico('close')}</button><b id="wfpTitle"></b><button class="wf-ib" id="wfpCC" onclick="wfToggleCC()" aria-pressed="true" aria-label="${esc(t('Captions'))}">CC</button></div>
      <div class="wfp-tap" onclick="wfPP()"></div>
      <div class="wfp-paused" aria-hidden="true">${ico('play')}</div>
      <div class="wfp-cap" id="wfpCap" aria-live="polite"></div>
      <div class="wfp-end" id="wfpEnd"></div>
    </div>`);
  const v = $('wfv');
  v.addEventListener('timeupdate', wfTick);
  v.addEventListener('ended', wfEnded);
  v.addEventListener('playing', function(){ $('wfp').classList.remove('paused', 'loading'); });
  v.addEventListener('waiting', function(){ $('wfp').classList.add('loading'); });
  v.addEventListener('error', function(){
    if(v.dataset.tried !== '1' && WF.film){ v.dataset.tried = '1'; v.src = 'films/' + WF.film.id + '-sd' + (wfExt() === '.mp4' ? '.webm' : '.mp4') + '?v=62'; v.play().catch(function(){}); return; }
    toast(t('Video could not play. Check your connection and try again.'));
  });
}
function whyRender(){ const b = $('wfBody'); if(b) b.innerHTML = wfLibHTML(); }
whyOpen = function(){
  wfEnsure(); WF.opener = document.activeElement;
  whyRender();
  $('wf').classList.add('open');
  document.documentElement.style.overflow = 'hidden';
  try{ history.pushState({ wf:1 }, ''); WF.pushed++; }catch(e){}
  if(typeof haptic === 'function') haptic(6);
};
whyClose = function(silent, viaPop){
  if($('wfp') && $('wfp').classList.contains('open')) whyStop(true);
  const el = $('wf'); if(el && el.classList.contains('open')){
    el.classList.remove('open');
    if(!silent && WF.opener && WF.opener.focus) try{ WF.opener.focus({ preventScroll:true }); }catch(e){}
  }
  document.documentElement.style.overflow = '';
  if(!viaPop && WF.pushed > 0){ const n = WF.pushed; WF.pushed = 0; WF.skipPop = true; try{ history.go(-n); }catch(e){} }
  if(viaPop) WF.pushed = 0;
};
whyPlay = function(id){
  const f = wfFilm(id) || WF_FILMS[0];
  wfEnsure(); WF.film = f; WF.cap = -1;
  const p = $('wfp'), v = $('wfv');
  v.dataset.tried = '';
  v.poster = 'films/' + f.id + '.jpg?v=62';
  v.src = wfSrc(f.id);
  $('wfpTitle').textContent = t(f.t);
  $('wfpCap').innerHTML = ''; $('wfpEnd').innerHTML = ''; $('wfpBar').style.width = '0';
  p.classList.remove('ended', 'paused'); p.classList.add('open', 'loading');
  p.classList.toggle('nocc', store.get('wf_cc', true) === false);
  document.documentElement.style.overflow = 'hidden';
  if(!(history.state && history.state.wfp)){ try{ history.pushState({ wfp:1 }, ''); WF.pushed++; }catch(e){} }
  v.currentTime = 0;
  v.play().catch(function(){ p.classList.add('paused'); p.classList.remove('loading'); });
  cancelAnimationFrame(WF.raf); const loop = function(){ wfTick(); if(p.classList.contains('open')) WF.raf = requestAnimationFrame(loop); }; WF.raf = requestAnimationFrame(loop);
  store.set('why_last', { id:f.id });
};
whyStop = function(viaPop){
  const p = $('wfp'); if(!p || !p.classList.contains('open')) return;
  const v = $('wfv'); try{ v.pause(); }catch(e){}
  v.removeAttribute('src'); try{ v.load(); }catch(e){}
  p.classList.remove('open'); cancelAnimationFrame(WF.raf);
  if(!($('wf') && $('wf').classList.contains('open'))) document.documentElement.style.overflow = '';
  if(!viaPop && history.state && history.state.wfp && WF.pushed > 0){ WF.pushed--; WF.skipPop = true; try{ history.back(); }catch(e){} }
};
function wfPP(){
  const v = $('wfv'), p = $('wfp');
  if(p.classList.contains('ended')) return;
  if(v.paused){ v.play().catch(function(){}); p.classList.remove('paused'); }
  else { v.pause(); p.classList.add('paused'); }
}
function wfToggleCC(){ const p = $('wfp'); const off = !p.classList.contains('nocc'); p.classList.toggle('nocc', off); store.set('wf_cc', !off); $('wfpCC').setAttribute('aria-pressed', off ? 'false' : 'true'); }
function wfTick(){
  const f = WF.film, v = $('wfv'); if(!f || !v) return;
  const tm = v.currentTime || 0, d = v.duration || f.d;
  $('wfpBar').style.width = Math.min(100, tm / d * 100) + '%';
  let i = -1; f.cap.forEach(function(c, k){ if(tm >= c[0]) i = k; });
  if(i !== WF.cap){
    WF.cap = i; const box = $('wfpCap');
    box.innerHTML = i >= 0 ? `<span dir="auto">${esc(t(f.cap[i][1]))}</span>` : '';
  }
}
function wfEnded(){
  const f = WF.film; if(!f) return;
  const p = $('wfp'); p.classList.add('ended');
  const nx = WF_FILMS[(WF_FILMS.indexOf(f) + 1) % WF_FILMS.length];
  $('wfpEnd').innerHTML = `<div class="wfp-endc">
      ${f.act ? `<button class="wf-btn" onclick="wfAct('${f.id}')">${esc(t(f.act[0]))}</button>` : ''}
      <button class="wfp-next" onclick="whyPlay('${nx.id}')"><img src="films/${nx.id}.jpg?v=62" alt=""><span><small>${esc(t('Watch next'))}</small><b>${esc(t(nx.t))}</b></span>${ico('play')}</button>
      <button class="wf-ghost" onclick="whyPlay('${f.id}')">↺ ${esc(t('Replay'))}</button></div>`;
}
function wfAct(id){ const f = wfFilm(id); if(!f || !f.act) return; whyClose(true); setTimeout(function(){ openItem(f.act[1]); }, 120); }
window.addEventListener('popstate', function(){
  if(WF.skipPop){ WF.skipPop = false; return; }
  if($('wfp') && $('wfp').classList.contains('open')){ if(WF.pushed > 0) WF.pushed--; whyStop(true); return; }
  if($('wf') && $('wf').classList.contains('open')){ WF.pushed = 0; whyClose(true, true); }
});

/* entry points: home promo and Pi Hub banner use a real film frame instead of a drawing */
function wfPromoHTML(){
  return `<button class="wf-promo" onclick="whyOpen()" aria-label="${esc(t('Why Pi in Saudi?'))}"><img src="films/intro.jpg?v=62" alt="" loading="lazy"><span class="wf-pg"></span>
    <span class="tx"><small>${ico('film')}${esc(t('All films'))} · 5</small><b>${esc(t('Why Pi in Saudi?'))}</b><span>${esc(t('Short films about Pi in everyday Saudi life'))}</span></span><span class="pp">${ico('play')}</span></button>`;
}
renderWhyPromo = function(){ const box = $('whyPromo'); if(box) box.innerHTML = wfPromoHTML(); };
renderWhyPromo();
(function(){
  const _ph = piHubPanel;
  piHubPanel = function(){ _ph.apply(this, arguments); const b = $('pBody'); const w = b && b.querySelector('.why-banner'); if(w) w.innerHTML = wfPromoHTML(); };
  PANELS.piHub = piHubPanel;
  const _apply = applyLang;
  applyLang = function(){ const r = _apply.apply(this, arguments);
    const lib = $('wf') && $('wf').classList.contains('open'), pl = $('wfp') && $('wfp').classList.contains('open');
    if($('wf') && !lib && !pl){ $('wf').remove(); $('wfp').remove(); }
    else { if(lib){ $('wfTitle').textContent = t('Why Pi in Saudi?'); whyRender(); } if(pl && WF.film){ $('wfpTitle').textContent = t(WF.film.t); WF.cap = -1; wfTick(); } }
    return r; };
  META.whyPi.s = 'Short films about Pi in everyday Saudi life';
  WF_FILMS.forEach(function(f){ META['wv-' + f.id] = { t:f.t, ic:'🎬', s:f.s }; PANELS['wv-' + f.id] = function(){ closePanel(); whyPlay(f.id); }; });
})();

/* ==========================================================================
   v6.3 — quality pass. Each block fixes one problem found while testing every
   screen in six languages, light and dark, on small and large phones.
   ========================================================================== */

/* 1 · Dates and weekdays in the user's language (they were always English) */
const DS_LOCALE = { en:'en-GB', ar:'ar-SA-u-ca-gregory-nu-latn', ur:'ur-PK-u-nu-latn', id:'id-ID', ha:'ha-NG', fr:'fr-FR' };
function dsLocale(){ const l = DS_LOCALE[typeof LANG !== 'undefined' ? LANG : 'en'] || 'en-GB'; try{ new Intl.DateTimeFormat(l); return l; }catch(e){ return 'en-GB'; } }
(function(){
  ['toLocaleDateString', 'toLocaleString'].forEach(function(fn){
    const orig = Date.prototype[fn];
    Date.prototype[fn] = function(loc, o){
      // only text dates (month or weekday names) change; plain times stay 24-hour as before
      if(loc === 'en-GB' && o && (o.weekday || o.month === 'short' || o.month === 'long')) loc = dsLocale();
      return orig.call(this, loc, o);
    };
  });
})();

/* 2 · Day counts ("113d", "113 days") and "Nationwide" in the right language */
(function(){
  const R = [
    ['days','يوماً','دن','hari','kwanaki','jours'], ['d','ي','د','h','k','j'], ['Now','الآن','ابھی','Sekarang','Yanzu','Maintenant'],
    ['Nationwide','على مستوى المملكة','ملک بھر میں','Seluruh negeri','Ko’ina a ƙasar','Tout le pays']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
  if(typeof eventRowHTML === 'function'){
    const _row = eventRowHTML;
    eventRowHTML = function(e){
      return _row.apply(this, arguments).replace(/<span class="badge">(\d+)d<\/span>/, function(m, n){ return '<span class="badge">' + n + ' ' + esc(t('days')) + '</span>'; })
        .replace('<span class="badge">Now</span>', '<span class="badge">' + esc(t('Now')) + '</span>').replace(/ · Nationwide/g, ' · ' + esc(t('Nationwide')));
    };
  }
})();

/* 3 · Panels: icon share button, full two-line titles, body flag so toasts sit low */
(function(){
  const sh = $('pShare'); if(sh) sh.innerHTML = ico('share');
  const _show = showPanel;
  showPanel = function(title){
    const r = _show.apply(this, arguments);
    const h = $('pTitle'); if(h) h.classList.toggle('long', (h.textContent || '').length > 22);
    document.body.classList.add('panel-open');
    return r;
  };
  const _close = closePanel;
  closePanel = function(){ document.body.classList.remove('panel-open'); return _close.apply(this, arguments); };
})();

/* 4 · One toast at a time, never stacked; badge toasts wait their turn */
(function(){
  const q = []; let busy = false;
  const _toast = toast;
  function next(){ if(!q.length){ busy = false; return; } busy = true; const m = q.shift(); _toast(m); setTimeout(next, 2900); }
  toast = function(msg){
    msg = t(String(msg));
    if(q.indexOf(msg) >= 0) return;                 // same message twice → show once
    if(/^🏅/.test(msg)){ q.push(msg); if(!busy) next(); return; }
    q.length = 0; busy = true; _toast(msg); clearTimeout(toast._n); toast._n = setTimeout(function(){ busy = false; next(); }, 2900);
  };
})();

/* 5 · In-app confirm instead of the browser's grey box (which shows a web address in Pi Browser) */
function dsConfirm(title, text, yes, onYes){
  const d = document.createElement('div'); d.className = 'ds-confirm'; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true');
  d.innerHTML = `<div class="box"><h4>${esc(t(title))}</h4><p>${esc(t(text))}</p><div class="row2"><button class="no">${esc(t('Cancel'))}</button><button class="yes">${esc(t(yes))}</button></div></div>`;
  document.body.appendChild(d); requestAnimationFrame(function(){ d.classList.add('open'); });
  const close = function(){ d.classList.remove('open'); setTimeout(function(){ d.remove(); }, 220); };
  d.addEventListener('click', function(e){ if(e.target === d) close(); });
  d.querySelector('.no').onclick = close;
  d.querySelector('.yes').onclick = function(){ close(); onYes(); };
  setTimeout(function(){ d.querySelector('.no').focus(); }, 50);
}
(function(){
  if(typeof deleteTrip === 'function'){
    deleteTrip = function(id){ dsConfirm('Delete this trip?', 'Its dates, checklist and notes will be removed from this device.', 'Delete', function(){ store.set('trips', trips().filter(function(x){ return x.id !== id; })); renderHomeTrip(); openItem('trips'); }); };
  }
  if(typeof clearData === 'function'){
    const _clear = clearData;
    clearData = function(){
      const _c = window.confirm; window.confirm = function(){ return true; };
      dsConfirm('Clear saved data?', 'Clear checklists, bookmarks, reminders and cached data on this device? Premium bought with Pi is restored when you sign in again.', 'Clear', function(){ try{ _clear(); } finally { window.confirm = _c; } });
      setTimeout(function(){ if(window.confirm !== _c && !document.querySelector('.ds-confirm')) window.confirm = _c; }, 60000);
    };
  }
})();

/* 6 · Live data that fails: say so clearly, offer a retry, keep the last known value */
function dsRetryBtn(fn, light){ return `<button class="ds-retry${light ? ' ds-retry-light' : ''}" onclick="${fn}">↻ ${esc(t('Try again'))}</button>`; }
(function(){
  // Home Pi card: "Loading live price…" stayed forever when the price service was down
  let tries = 0;
  const _hero = renderHeroPi;
  renderHeroPi = function(){
    const r = _hero.apply(this, arguments);
    const p = store.get('pi', null), sub = $('hpPiSar');
    if(!(p && p.usd) && sub && dsPiFailed){ sub.innerHTML = esc(t('Pi price is unavailable right now.')) + '<br>' + dsRetryBtn('dsRetryPi()'); }
    return r;
  };
  let dsPiFailed = false;
  window.dsRetryPi = function(){ const sub = $('hpPiSar'); if(sub) sub.textContent = t('Loading live price…'); dsPiFailed = false; loadPi(true).then(function(){ renderMarkets(); dsAfterPi(); }); };
  function dsAfterPi(){ const p = store.get('pi', null); if(!(p && p.usd)){ dsPiFailed = true; tries++; if(tries < 4) setTimeout(function(){ loadPi(true).then(function(){ renderMarkets(); dsAfterPi(); }); }, 15000 * tries); } else dsPiFailed = false; try{ renderHeroPi(); }catch(e){} }
  const _mk = renderMarkets;
  renderMarkets = function(){
    const r = _mk.apply(this, arguments);
    const p = store.get('pi', null), fx = store.get('fx', null);
    if(!(p && p.usd)){
      if($('piUpd')) $('piUpd').textContent = t('Pi price is unavailable right now.');
      if($('piChg')) $('piChg').textContent = '';
      if($('hPiChg')) $('hPiChg').textContent = t('unavailable');
    }
    if(!(fx && fx.rates) && $('rateList') && $('rateList').querySelector('.skeleton') && dsFxTried){
      $('rateList').innerHTML = `<div class="ds-off">${esc(t('Exchange rates are unavailable right now.'))}</div>${dsRetryBtn("dsFxTried=false;loadFx(true).then(function(){dsFxTried=true;renderMarkets();})", true)}`;
    }
    return r;
  };
  window.dsFxTried = false;
  const _lfx = loadFx;
  loadFx = function(){ return _lfx.apply(this, arguments).then(function(v){ window.dsFxTried = true; return v; }); };
  // first round: after the first attempt finishes, show the clear state
  setTimeout(function(){ loadPi().then(function(){ dsAfterPi(); renderMarkets(); }); }, 2500);
})();

/* 7 · Home news and Ayah of the day when offline */
(function(){
  // a short offline set so the card is never empty (Arabic text with Pickthall's public-domain English)
  const AYAT = [
    { ar:'فَإِنَّ مَعَ ٱلْعُسْرِ يُسْرًا', en:'But lo! with hardship goeth ease.', ref:'Ash-Sharh 94:5', s:94 },
    { ar:'وَقُل رَّبِّ زِدْنِى عِلْمًا', en:'And say: My Lord! Increase me in knowledge.', ref:'Taa-Haa 20:114', s:20 },
    { ar:'أَلَا بِذِكْرِ ٱللَّهِ تَطْمَئِنُّ ٱلْقُلُوبُ', en:'Verily in the remembrance of Allah do hearts find rest!', ref:'Ar-Ra\'d 13:28', s:13 },
    { ar:'لَا يُكَلِّفُ ٱللَّهُ نَفْسًا إِلَّا وُسْعَهَا', en:'Allah tasketh not a soul beyond its scope.', ref:'Al-Baqara 2:286', s:2 },
    { ar:'وَٱللَّهُ يُحِبُّ ٱلْمُحْسِنِينَ', en:'Allah loveth the good.', ref:'Aal-i-Imraan 3:134', s:3 },
    { ar:'إِنَّ ٱللَّهَ مَعَ ٱلصَّـٰبِرِينَ', en:'Lo! Allah is with the steadfast.', ref:'Al-Baqara 2:153', s:2 },
    { ar:'فَٱذْكُرُونِىٓ أَذْكُرْكُمْ', en:'Therefore remember Me, I will remember you.', ref:'Al-Baqara 2:152', s:2 }
  ];
  window.dsAyahFallback = function(){
    const box = $('dailyAyah'); if(!box) return;
    const a = AYAT[new Date().getDate() % AYAT.length];
    box.innerHTML = `<div class="ar">${a.ar}</div><p style="margin:8px 0 6px;color:var(--text-2);font-size:14.5px">${esc(a.en)}</p><div style="display:flex;justify-content:space-between;align-items:center"><span class="small notr">${esc(a.ref)}</span><button class="btn btn-ghost btn-sm" onclick="openSurah(${a.s})">${esc(t('Read surah'))} ›</button></div>`;
  };
})();

/* 8 · Quran: the list of 114 surahs is built in, so it always opens (verses still load online) */
const DS_SURAHS = 'Al-Faatiha|The Opening|7|M|الفاتحة;Al-Baqara|The Cow|286|D|البقرة;Aal-i-Imraan|The Family of Imraan|200|D|آل عمران;An-Nisaa|The Women|176|D|النساء;Al-Maaida|The Table|120|D|المائدة;Al-An\'aam|The Cattle|165|M|الأنعام;Al-A\'raaf|The Heights|206|M|الأعراف;Al-Anfaal|The Spoils of War|75|D|الأنفال;At-Tawba|The Repentance|129|D|التوبة;Yunus|Jonah|109|M|يونس;Hud|Hud|123|M|هود;Yusuf|Joseph|111|M|يوسف;Ar-Ra\'d|The Thunder|43|D|الرعد;Ibrahim|Abraham|52|M|إبراهيم;Al-Hijr|The Rock|99|M|الحجر;An-Nahl|The Bee|128|M|النحل;Al-Israa|The Night Journey|111|M|الإسراء;Al-Kahf|The Cave|110|M|الكهف;Maryam|Mary|98|M|مريم;Taa-Haa|Taa-Haa|135|M|طه;Al-Anbiyaa|The Prophets|112|M|الأنبياء;Al-Hajj|The Pilgrimage|78|D|الحج;Al-Muminoon|The Believers|118|M|المؤمنون;An-Noor|The Light|64|D|النور;Al-Furqaan|The Criterion|77|M|الفرقان;Ash-Shu\'araa|The Poets|227|M|الشعراء;An-Naml|The Ant|93|M|النمل;Al-Qasas|The Stories|88|M|القصص;Al-Ankaboot|The Spider|69|M|العنكبوت;Ar-Room|The Romans|60|M|الروم;Luqman|Luqman|34|M|لقمان;As-Sajda|The Prostration|30|M|السجدة;Al-Ahzaab|The Clans|73|D|الأحزاب;Saba|Sheba|54|M|سبأ;Faatir|The Originator|45|M|فاطر;Yaseen|Yaseen|83|M|يس;As-Saaffaat|Those drawn up in Ranks|182|M|الصافات;Saad|The letter Saad|88|M|ص;Az-Zumar|The Groups|75|M|الزمر;Ghafir|The Forgiver|85|M|غافر;Fussilat|Explained in detail|54|M|فصلت;Ash-Shura|Consultation|53|M|الشورى;Az-Zukhruf|Ornaments of gold|89|M|الزخرف;Ad-Dukhaan|The Smoke|59|M|الدخان;Al-Jaathiya|Crouching|37|M|الجاثية;Al-Ahqaf|The Dunes|35|M|الأحقاف;Muhammad|Muhammad|38|D|محمد;Al-Fath|The Victory|29|D|الفتح;Al-Hujuraat|The Inner Apartments|18|D|الحجرات;Qaaf|The letter Qaaf|45|M|ق;Adh-Dhaariyat|The Winnowing Winds|60|M|الذاريات;At-Tur|The Mount|49|M|الطور;An-Najm|The Star|62|M|النجم;Al-Qamar|The Moon|55|M|القمر;Ar-Rahmaan|The Beneficent|78|D|الرحمن;Al-Waaqia|The Inevitable|96|M|الواقعة;Al-Hadid|The Iron|29|D|الحديد;Al-Mujaadila|The Pleading Woman|22|D|المجادلة;Al-Hashr|The Exile|24|D|الحشر;Al-Mumtahana|She that is to be examined|13|D|الممتحنة;As-Saff|The Ranks|14|D|الصف;Al-Jumu\'a|Friday|11|D|الجمعة;Al-Munaafiqoon|The Hypocrites|11|D|المنافقون;At-Taghaabun|Mutual Disillusion|18|D|التغابن;At-Talaaq|Divorce|12|D|الطلاق;At-Tahrim|The Prohibition|12|D|التحريم;Al-Mulk|The Sovereignty|30|M|الملك;Al-Qalam|The Pen|52|M|القلم;Al-Haaqqa|The Reality|52|M|الحاقة;Al-Ma\'aarij|The Ascending Stairways|44|M|المعارج;Nooh|Noah|28|M|نوح;Al-Jinn|The Jinn|28|M|الجن;Al-Muzzammil|The Enshrouded One|20|M|المزمل;Al-Muddaththir|The Cloaked One|56|M|المدثر;Al-Qiyaama|The Resurrection|40|M|القيامة;Al-Insaan|Man|31|D|الإنسان;Al-Mursalaat|The Emissaries|50|M|المرسلات;An-Naba|The Announcement|40|M|النبأ;An-Naazi\'aat|Those who drag forth|46|M|النازعات;Abasa|He frowned|42|M|عبس;At-Takwir|The Overthrowing|29|M|التكوير;Al-Infitaar|The Cleaving|19|M|الانفطار;Al-Mutaffifin|Defrauding|36|M|المطففين;Al-Inshiqaaq|The Splitting Open|25|M|الانشقاق;Al-Burooj|The Constellations|22|M|البروج;At-Taariq|The Morning Star|17|M|الطارق;Al-A\'laa|The Most High|19|M|الأعلى;Al-Ghaashiya|The Overwhelming|26|M|الغاشية;Al-Fajr|The Dawn|30|M|الفجر;Al-Balad|The City|20|M|البلد;Ash-Shams|The Sun|15|M|الشمس;Al-Lail|The Night|21|M|الليل;Ad-Dhuhaa|The Morning Hours|11|M|الضحى;Ash-Sharh|The Consolation|8|M|الشرح;At-Tin|The Fig|8|M|التين;Al-Alaq|The Clot|19|M|العلق;Al-Qadr|The Power|5|M|القدر;Al-Bayyina|The Evidence|8|D|البينة;Az-Zalzala|The Earthquake|8|D|الزلزلة;Al-Aadiyaat|The Chargers|11|M|العاديات;Al-Qaari\'a|The Calamity|11|M|القارعة;At-Takaathur|Competition|8|M|التكاثر;Al-Asr|The Declining Day|3|M|العصر;Al-Humaza|The Traducer|9|M|الهمزة;Al-Fil|The Elephant|5|M|الفيل;Quraish|Quraysh|4|M|قريش;Al-Maa\'un|Almsgiving|7|M|الماعون;Al-Kawthar|Abundance|3|M|الكوثر;Al-Kaafiroon|The Disbelievers|6|M|الكافرون;An-Nasr|Divine Support|3|D|النصر;Al-Masad|The Palm Fibre|5|M|المسد;Al-Ikhlaas|Sincerity|4|M|الإخلاص;Al-Falaq|The Dawn|5|M|الفلق;An-Naas|Mankind|6|M|الناس'
  .split(';').map(function(r, i){ const a = r.split('|'); return { number:i + 1, englishName:a[0], englishNameTranslation:a[1], numberOfAyahs:+a[2], revelationType:a[3] === 'M' ? 'Meccan' : 'Medinan', name:a[4] }; });
(function(){ try{ if(!store.get('surahs', null)) store.set('surahs', DS_SURAHS); }catch(e){} })();

/* 9 · Qibla: bearing from your chosen city straight away; GPS makes it exact */
(function(){
  if(!PANELS.qibla) return;
  const _q = PANELS.qibla;
  PANELS.qibla = function(){
    const r = _q.apply(this, arguments);
    const city = typeof prayerCity === 'function' ? prayerCity() : 'Makkah', c = CITY_COORDS[city];
    if(c && $('qOut')){
      if(city === 'Makkah'){ $('qOut').textContent = t('In Makkah — face the Kaaba'); return r; }
      const R = Math.PI / 180, lat = c[0] * R, lon = c[1] * R, kLat = 21.4225 * R, kLon = 39.8262 * R;
      const b = (Math.atan2(Math.sin(kLon - lon), Math.cos(lat) * Math.tan(kLat) - Math.sin(lat) * Math.cos(kLon - lon)) / R + 360) % 360;
      qiblaBearing = b; $('qOut').textContent = b.toFixed(1) + '°'; $('qNeedle').style.transform = 'rotate(' + b + 'deg)';
      const sm = $('qOut').parentNode.querySelector('small'); if(sm) sm.textContent = t('Qibla bearing from North') + ' · ' + t(city);
    }
    return r;
  };
})();

/* 10 · Settings › Favourite team opens Scores instead of only telling you where to go */
(function(){
  const _s = PANELS.settings; if(!_s) return;
  PANELS.settings = function(){
    const r = _s.apply(this, arguments);
    [].slice.call(document.querySelectorAll('#pBody .setting')).forEach(function(row){
      if(/Favourite team|الفريق|Équipe|Tim favorit|Kungiya|پسندیدہ/.test(row.textContent) && !row.querySelector('button')){
        row.insertAdjacentHTML('beforeend', `<button class="btn btn-ghost btn-sm" onclick="closePanel();switchTab('live');openLive('scores')">${esc(t('Choose'))}</button>`);
      }
    });
    return r;
  };
})();

/* 11 · Returning Pi users: one tap less — sign in automatically after the welcome film */
(function(){
  let tried = false;
  function inPi(){ return typeof Pi !== 'undefined' && /PiBrowser|; wv\)/i.test(navigator.userAgent); }
  function check(){
    if(tried || (typeof entered !== 'undefined' && entered)) return;
    const sp = $('splash'), ov = $('ovid'), last = store.get('lastUser', null);
    if(!last || !inPi() || !sp || getComputedStyle(sp).display === 'none') return;
    if(ov && ov.classList.contains('open')) return;
    tried = true;
    const b = $('loginBtn'); if(b) b.innerHTML = '<span>π</span> ' + esc(t('Continue as')) + ' @' + esc(last);
    const go = function(){ setTimeout(function(){ if(!(typeof entered !== 'undefined' && entered)) piLogin(); }, 600); };
    if(document.readyState === 'complete') go(); else window.addEventListener('load', go, { once:true });
  }
  const iv = setInterval(function(){ check(); if(tried || (typeof entered !== 'undefined' && entered)) clearInterval(iv); }, 500);
  setTimeout(function(){ clearInterval(iv); }, 120000);
})();

/* 12 · Why Pi promo uses a clean frame without the film's labels */
(function(){
  if(typeof wfPromoHTML !== 'function') return;
  const _p = wfPromoHTML;
  wfPromoHTML = function(){ return _p.apply(this, arguments).replace('films/intro.jpg?v=62', 'films/cover.jpg?v=63'); };
  try{ renderWhyPromo(); }catch(e){}
})();

/* 13 · Words for everything above */
(function(){
  const R = [
    ['Pi price is unavailable right now.','سعر Pi غير متاح الآن.','Pi کی قیمت ابھی دستیاب نہیں۔','Harga Pi sedang tidak tersedia.','Farashin Pi ba ya samuwa yanzu.','Le cours du Pi est indisponible pour le moment.'],
    ['Exchange rates are unavailable right now.','أسعار الصرف غير متاحة الآن.','شرحِ مبادلہ ابھی دستیاب نہیں۔','Kurs tukar sedang tidak tersedia.','Farashin musayar kuɗi ba ya samuwa yanzu.','Les taux de change sont indisponibles pour le moment.'],
    ['unavailable','غير متاح','دستیاب نہیں','tidak tersedia','ba ya samuwa','indisponible'],
    ['Try again','حاول مجدداً','دوبارہ کوشش کریں','Coba lagi','Sake gwadawa','Réessayer'],
    ['Couldn’t load news.','تعذّر تحميل الأخبار.','خبریں لوڈ نہیں ہو سکیں۔','Berita gagal dimuat.','An kasa loda labarai.','Impossible de charger les actualités.'],
    ['Read surah','اقرأ السورة','سورت پڑھیں','Baca surah','Karanta sura','Lire la sourate'],
    ['In Makkah — face the Kaaba','في مكة — استقبل الكعبة','مکہ میں — کعبہ کی طرف رخ کریں','Di Makkah — menghadap Ka’bah','A Makka — fuskanci Ka’aba','À La Mecque — face à la Kaaba'],
    ['Qibla bearing from North','اتجاه القبلة من الشمال','شمال سے قبلہ کا رخ','Arah kiblat dari utara','Alƙiblar daga Arewa','Direction de la qibla depuis le nord'],
    ['Choose','اختر','منتخب کریں','Pilih','Zaɓa','Choisir'],
    ['Continue as','المتابعة باسم','بطور جاری رکھیں','Lanjut sebagai','Ci gaba a matsayin','Continuer en tant que'],
    ['Cancel','إلغاء','منسوخ','Batal','Soke','Annuler'],
    ['Delete','حذف','حذف کریں','Hapus','Goge','Supprimer'],
    ['Clear','مسح','صاف کریں','Hapus','Share','Effacer'],
    ['Delete this trip?','حذف هذه الرحلة؟','یہ سفر حذف کریں؟','Hapus perjalanan ini?','A goge wannan tafiya?','Supprimer ce voyage ?'],
    ['Its dates, checklist and notes will be removed from this device.','ستُحذف تواريخها وقائمة التحقق والملاحظات من هذا الجهاز.','اس کی تاریخیں، چیک لسٹ اور نوٹس اس ڈیوائس سے ہٹ جائیں گے۔','Tanggal, daftar periksa, dan catatannya akan dihapus dari perangkat ini.','Za a cire kwanakinta, jerin dubawa da bayananta daga wannan na’ura.','Ses dates, sa liste et ses notes seront supprimées de cet appareil.'],
    ['Clear saved data?','مسح البيانات المحفوظة؟','محفوظ ڈیٹا صاف کریں؟','Hapus data tersimpan?','A share bayanan da aka adana?','Effacer les données enregistrées ?'],
    ['Clear checklists, bookmarks, reminders and cached data on this device? Premium bought with Pi is restored when you sign in again.','مسح قوائم التحقق والإشارات المرجعية والتذكيرات والبيانات المؤقتة على هذا الجهاز؟ يُستعاد بريميوم المشترى بـ Pi عند تسجيل الدخول مجدداً.','اس ڈیوائس پر چیک لسٹیں، بُک مارکس، یاد دہانیاں اور عارضی ڈیٹا صاف کریں؟ Pi سے خریدا گیا پریمیم دوبارہ سائن اِن پر بحال ہو جاتا ہے۔','Hapus daftar periksa, markah, pengingat, dan data cache di perangkat ini? Premium yang dibeli dengan Pi dipulihkan saat Anda masuk lagi.','A share jerin dubawa, alamomi, tunatarwa da bayanan wucin gadi a wannan na’ura? Ana dawo da Premium da aka saya da Pi idan ka sake shiga.','Effacer listes, favoris, rappels et données en cache sur cet appareil ? Le Premium acheté en Pi est restauré à la prochaine connexion.'],
    ['Opening times and prices change — check the official site before you go.','تتغير أوقات العمل والأسعار — تحقّق من الموقع الرسمي قبل الذهاب.','اوقات اور قیمتیں بدلتی رہتی ہیں — جانے سے پہلے سرکاری سائٹ دیکھیں۔','Jam buka dan harga bisa berubah — cek situs resmi sebelum pergi.','Lokutan buɗewa da farashi suna canzawa — duba shafin hukuma kafin ka tafi.','Horaires et prix changent — vérifiez le site officiel avant d’y aller.'],
    ['Rules and fees change — always confirm on the official site before you apply or pay.','القواعد والرسوم تتغير — تأكد دائماً من الموقع الرسمي قبل التقديم أو الدفع.','قواعد اور فیس بدلتی رہتی ہیں — درخواست یا ادائیگی سے پہلے سرکاری سائٹ پر تصدیق کریں۔','Aturan dan biaya bisa berubah — selalu cek situs resmi sebelum mendaftar atau membayar.','Dokoki da kuɗaɗe suna canzawa — ko da yaushe ka tabbatar a shafin hukuma kafin ka nema ko ka biya.','Règles et frais changent — vérifiez toujours sur le site officiel avant de demander ou de payer.'],
    ['Official sources','المصادر الرسمية','سرکاری ذرائع','Sumber resmi','Majiyoyin hukuma','Sources officielles'],
    ['min read','دقيقة قراءة','منٹ مطالعہ','menit baca','minti na karatu','min de lecture'],
    ['sections','أقسام','حصے','bagian','sassa','sections'],
    ['Cities','المدن','شہر','Kota','Birane','Villes'],
    ['Career','المسار المهني','کیریئر','Karier','Sana’a','Carrière'],
    ['Ministry of Foreign Affairs — visa platform','وزارة الخارجية — منصة التأشيرات','وزارتِ خارجہ — ویزا پلیٹ فارم','Kementerian Luar Negeri — platform visa','Ma’aikatar Harkokin Waje — dandalin biza','Ministère des Affaires étrangères — plateforme des visas'],
    ['Nusuk — Ministry of Hajj and Umrah','نسك — وزارة الحج والعمرة','نُسک — وزارتِ حج و عمرہ','Nusuk — Kementerian Haji dan Umrah','Nusuk — Ma’aikatar Hajji da Umrah','Nusuk — Ministère du Hajj et de la Omra'],
    ['Absher — Ministry of Interior','أبشر — وزارة الداخلية','ابشر — وزارتِ داخلہ','Absher — Kementerian Dalam Negeri','Absher — Ma’aikatar Cikin Gida','Absher — Ministère de l’Intérieur'],
    ['Ministry of Health','وزارة الصحة','وزارتِ صحت','Kementerian Kesehatan','Ma’aikatar Lafiya','Ministère de la Santé'],
    ['Ministry of Human Resources','وزارة الموارد البشرية','وزارتِ افرادی قوت','Kementerian Sumber Daya Manusia','Ma’aikatar Albarkatun Ɗan Adam','Ministère des Ressources humaines'],
    ['Visit Saudi — official tourism site','روح السعودية — الموقع السياحي الرسمي','وزٹ سعودی — سرکاری سیاحتی سائٹ','Visit Saudi — situs pariwisata resmi','Visit Saudi — shafin yawon buɗe ido na hukuma','Visit Saudi — site touristique officiel'],
    ['GOSI deduction','استقطاع التأمينات (GOSI)','GOSI کٹوتی','Potongan GOSI','Ragin GOSI','Retenue GOSI'],
    ['Net per year','الصافي سنوياً','سالانہ خالص','Bersih per tahun','Net a shekara','Net par an'],
    ['Net / month in EUR','الصافي شهرياً باليورو','ماہانہ خالص (EUR)','Bersih / bulan dalam EUR','Net / wata a EUR','Net / mois en EUR'],
    ['Net / month in USD','الصافي شهرياً بالدولار','ماہانہ خالص (USD)','Bersih / bulan dalam USD','Net / wata a USD','Net / mois en USD'],
    ['Full award','المكافأة الكاملة','مکمل انعام','Pesangon penuh','Cikakken lada','Indemnité complète'],
    ['100%','100%','100%','100%','100%','100 %'], ['None','لا شيء','کچھ نہیں','Tidak ada','Babu','Aucune'],
    ['Less than 2 years: no award on resignation','أقل من سنتين: لا مكافأة عند الاستقالة','2 سال سے کم: استعفیٰ پر کوئی انعام نہیں','Kurang dari 2 tahun: tidak ada pesangon saat mengundurkan diri','Ƙasa da shekara 2: babu lada idan ka yi murabus','Moins de 2 ans : pas d’indemnité en cas de démission'],
    ['2–5 years: one-third of the award','2–5 سنوات: ثلث المكافأة','2–5 سال: انعام کا ایک تہائی','2–5 tahun: sepertiga pesangon','Shekara 2–5: kashi ɗaya bisa uku na lada','2–5 ans : un tiers de l’indemnité'],
    ['5–10 years: two-thirds of the award','5–10 سنوات: ثلثا المكافأة','5–10 سال: انعام کا دو تہائی','5–10 tahun: dua pertiga pesangon','Shekara 5–10: kashi biyu bisa uku na lada','5–10 ans : deux tiers de l’indemnité'],
    ['10+ years: full award','10 سنوات فأكثر: المكافأة كاملة','10+ سال: مکمل انعام','10+ tahun: pesangon penuh','Shekara 10+: cikakken lada','10 ans et plus : indemnité complète']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* 14 · News areas are skipped by the page translator (headlines are translated separately),
   so their status messages and buttons are translated here */
(function(){
  function fix(root){
    if(!root || typeof LANG === 'undefined' || LANG === 'en') return;
    root.querySelectorAll('.empty, .small, button, .ds-off').forEach(function(el){
      if(el.closest('.nrow, .news-row, article, .n-card')) return;
      [].slice.call(el.childNodes).forEach(function(n){ if(n.nodeType === 3){ const s = n.nodeValue.trim(); if(s && /[A-Za-z]/.test(s)){ const x = t(s); if(x !== s) n.nodeValue = n.nodeValue.replace(s, x); } } });
    });
  }
  ['newsList', 'homeNews'].forEach(function(id){ const el = $(id); if(el) new MutationObserver(function(){ fix(el); }).observe(el, { childList:true, subtree:true }); });
})();

/* v6.3 — built-in words for the main screens, so Arabic, Urdu, Indonesian, Hausa and French
   users see their language instantly (no waiting for online translation, works offline). */
(function(){
  const R = [
  // Live › News / Scores / Markets / Weather / Events
  ['Top','الأبرز','اہم','Utama','Manyan labarai','À la une'],
  ['Saudi','السعودية','سعودی','Saudi','Saudiyya','Arabie saoudite'],
  ['Business','أعمال','کاروبار','Bisnis','Kasuwanci','Économie'],
  ['Sport','رياضة','کھیل','Olahraga','Wasanni','Sport'],
  ['Pi & Crypto','Pi والعملات الرقمية','Pi اور کرپٹو','Pi & Kripto','Pi da kuɗin kirifto','Pi et crypto'],
  ['World','العالم','دنیا','Dunia','Duniya','Monde'],
  ['Upcoming','القادمة','آنے والے','Mendatang','Masu zuwa','À venir'],
  ['Results','النتائج','نتائج','Hasil','Sakamako','Résultats'],
  ['Scores are unavailable right now.','النتائج غير متاحة الآن.','اسکور ابھی دستیاب نہیں۔','Skor sedang tidak tersedia.','Sakamakon wasa ba ya samuwa yanzu.','Les scores sont indisponibles pour le moment.'],
  ['Data: football-data.org · Times shown in Saudi time (UTC+3)','البيانات: football-data.org · الأوقات بتوقيت السعودية (UTC+3)','ڈیٹا: football-data.org · اوقات سعودی وقت میں (UTC+3)','Data: football-data.org · Waktu Saudi (UTC+3)','Bayanai: football-data.org · Lokaci a agogon Saudiyya (UTC+3)','Données : football-data.org · Heure saoudienne (UTC+3)'],
  ['Weather unavailable.','الطقس غير متاح.','موسم دستیاب نہیں۔','Cuaca tidak tersedia.','Yanayi ba ya samuwa.','Météo indisponible.'],
  ['Pi price unavailable right now','سعر Pi غير متاح الآن','Pi کی قیمت ابھی دستیاب نہیں','Harga Pi sedang tidak tersedia','Farashin Pi ba ya samuwa yanzu','Cours du Pi indisponible pour le moment'],
  ['Not financial advice ·','ليست نصيحة مالية ·','مالی مشورہ نہیں ·','Bukan nasihat keuangan ·','Ba shawarar kuɗi ba ce ·','Pas un conseil financier ·'],
  ['Know an event that’s missing?','هل تعرف فعالية غير موجودة؟','کوئی تقریب رہ گئی ہے؟','Tahu acara yang belum ada?','Ka san wani taron da babu?','Un événement manque ?'],
  ['Suggest it','اقترحها','تجویز کریں','Usulkan','Ba da shawara','Proposez-le'],
  ['🕌 Religious','🕌 دينية','🕌 مذہبی','🕌 Keagamaan','🕌 Na addini','🕌 Religieux'],
  ['🇸🇦 National','🇸🇦 وطنية','🇸🇦 قومی','🇸🇦 Nasional','🇸🇦 Na ƙasa','🇸🇦 National'],
  ['⚽ Sports','⚽ رياضة','⚽ کھیل','⚽ Olahraga','⚽ Wasanni','⚽ Sport'],
  ['🎭 Culture','🎭 ثقافة','🎭 ثقافت','🎭 Budaya','🎭 Al’adu','🎭 Culture'],
  ['🎵 Concerts','🎵 حفلات','🎵 کنسرٹ','🎵 Konser','🎵 Wasannin kiɗa','🎵 Concerts'],
  ['👨‍👩‍👧 Family','👨‍👩‍👧 عائلية','👨‍👩‍👧 فیملی','👨‍👩‍👧 Keluarga','👨‍👩‍👧 Iyali','👨‍👩‍👧 Famille'],
  ['🖼️ Exhibitions','🖼️ معارض','🖼️ نمائشیں','🖼️ Pameran','🖼️ Nune-nune','🖼️ Expositions'],
  ['🎤 Conferences','🎤 مؤتمرات','🎤 کانفرنسیں','🎤 Konferensi','🎤 Taruka','🎤 Conférences'],
  ['🎆 Seasons','🎆 مواسم','🎆 سیزن','🎆 Musim','🎆 Lokutan biki','🎆 Saisons'],
  ['📍 All cities','📍 كل المدن','📍 تمام شہر','📍 Semua kota','📍 Duk birane','📍 Toutes les villes'],
  ['Ramadan begins','بداية رمضان','رمضان کا آغاز','Awal Ramadan','Farkon Ramadan','Début du Ramadan'],
  ['Saudi Founding Day','يوم التأسيس','سعودی یومِ تاسیس','Hari Pendirian Saudi','Ranar Kafuwar Saudiyya','Jour de la fondation'],
  ['Eid al-Fitr','عيد الفطر','عید الفطر','Idul Fitri','Sallah Ƙarama','Aïd el-Fitr'],
  ['Hajj begins','بداية الحج','حج کا آغاز','Awal Haji','Farkon Hajji','Début du Hajj'],
  ['Day of Arafah','يوم عرفة','یومِ عرفہ','Hari Arafah','Ranar Arafa','Jour d’Arafat'],
  ['Eid al-Adha','عيد الأضحى','عید الاضحیٰ','Idul Adha','Sallah Babba','Aïd al-Adha'],
  ['Islamic New Year','رأس السنة الهجرية','اسلامی نیا سال','Tahun Baru Islam','Sabuwar Shekarar Musulunci','Nouvel an islamique'],
  ['Day of Ashura','يوم عاشوراء','یومِ عاشورہ','Hari Asyura','Ranar Ashura','Jour d’Achoura'],
  ['Saudi National Day','اليوم الوطني السعودي','سعودی قومی دن','Hari Nasional Saudi','Ranar Ƙasar Saudiyya','Fête nationale saoudienne'],
  // Home
  ['GREEN TIP OF THE DAY','نصيحة خضراء لليوم','آج کا سبز مشورہ','TIPS HIJAU HARI INI','SHAWARAR KORE TA YAU','ASTUCE VERTE DU JOUR'],
  ['Explore Green Saudi ›','استكشف السعودية الخضراء ›','گرین سعودی دیکھیں ›','Jelajahi Saudi Hijau ›','Bincika Saudiyya Mai Kore ›','Découvrir l’Arabie verte ›'],
  ['Wash the car with a bucket, not a hose: about 20 litres instead of 150+.','اغسل السيارة بدلو لا بخرطوم: نحو 20 لتراً بدلاً من أكثر من 150.','گاڑی پائپ کے بجائے بالٹی سے دھوئیں: 150+ کے بجائے تقریباً 20 لیٹر۔','Cuci mobil dengan ember, bukan selang: sekitar 20 liter, bukan 150+.','Wanke mota da bokiti, ba da bututu ba: kusan lita 20 maimakon 150+.','Lavez la voiture au seau, pas au tuyau : environ 20 litres au lieu de 150+.'],
  ['Hegra, rock art & canyons','الحِجر والنقوش الصخرية والأودية','حِجر، چٹانی نقوش اور وادیاں','Hegra, seni batu & ngarai','Hegra, zane-zanen dutse da kwazazzabai','Hégra, art rupestre et canyons'],
  ['Dunes, camps & stargazing','كثبان ومخيمات ومشاهدة النجوم','ٹیلے، کیمپ اور ستارہ بینی','Bukit pasir, kemah & melihat bintang','Tuddan yashi, sansani da kallon taurari','Dunes, camps et observation des étoiles'],
  ['Kabsa, mandi, jareesh…','كبسة، مندي، جريش…','کبسہ، مندی، جریش…','Kabsa, mandi, jareesh…','Kabsa, mandi, jareesh…','Kabsa, mandi, jareesh…'],
  ['Car, train, flight & bus between cities','سيارة وقطار وطيران وحافلة بين المدن','شہروں کے درمیان کار، ٹرین، پرواز اور بس','Mobil, kereta, pesawat & bus antarkota','Mota, jirgin ƙasa, jirgin sama da bas tsakanin birane','Voiture, train, avion et bus entre villes'],
  ['AlUla','العُلا','العُلا','AlUla','AlUla','AlUla'],
  ['Saudi food guide','دليل الطعام السعودي','سعودی کھانوں کی گائیڈ','Panduan kuliner Saudi','Jagorar abincin Saudiyya','Guide de la cuisine saoudienne'],
  ['Desert adventures','مغامرات الصحراء','صحرائی مہم جوئی','Petualangan gurun','Kasadar hamada','Aventures dans le désert'],
  ['Tourist safety','سلامة السياح','سیاحوں کی حفاظت','Keamanan wisatawan','Tsaron ’yan yawon buɗe ido','Sécurité des touristes'],
  ['General tips','نصائح عامة','عمومی مشورے','Tips umum','Shawarwari na gaba ɗaya','Conseils généraux'],
  // Explore
  ['OpenStreetMap · real places','OpenStreetMap · أماكن حقيقية','OpenStreetMap · حقیقی مقامات','OpenStreetMap · tempat nyata','OpenStreetMap · wurare na gaske','OpenStreetMap · lieux réels'],
  ['Dashboard, countdown & checklists','لوحة وعدّ تنازلي وقوائم','ڈیش بورڈ، الٹی گنتی اور چیک لسٹیں','Dasbor, hitung mundur & daftar periksa','Dashboard, ƙirgawa da jerin dubawa','Tableau de bord, compte à rebours et listes'],
  ['Distance to Haram, saved hotels','المسافة إلى الحرم والفنادق المحفوظة','حرم تک فاصلہ، محفوظ ہوٹل','Jarak ke Haram, hotel tersimpan','Nisa zuwa Haram, otal-otal da aka adana','Distance au Haram, hôtels enregistrés'],
  ['By city and cuisine','حسب المدينة والمطبخ','شہر اور کھانے کے لحاظ سے','Menurut kota dan masakan','Ta birni da nau’in abinci','Par ville et cuisine'],
  ['The capital','العاصمة','دارالحکومت','Ibu kota','Babban birni','La capitale'],
  ['Red Sea gateway','بوابة البحر الأحمر','بحیرۂ احمر کا دروازہ','Gerbang Laut Merah','Ƙofar Bahar Maliya','Porte de la mer Rouge'],
  ['The holiest city','أقدس مدينة','سب سے مقدس شہر','Kota tersuci','Birni mafi tsarki','La ville la plus sainte'],
  ['City of the Prophet ﷺ','مدينة النبي ﷺ','شہرِ نبی ﷺ','Kota Nabi ﷺ','Birnin Annabi ﷺ','La ville du Prophète ﷺ'],
  ['Ancient Hegra','الحِجر العريقة','قدیم حِجر','Hegra kuno','Tsohuwar Hegra','L’antique Hégra'],
  ['Cool mountains','جبال معتدلة','ٹھنڈے پہاڑ','Pegunungan sejuk','Duwatsu masu sanyi','Montagnes fraîches'],
  ['Eastern Province','المنطقة الشرقية','مشرقی صوبہ','Provinsi Timur','Lardin Gabas','Province orientale'],
  ['New destinations','وجهات جديدة','نئی منزلیں','Destinasi baru','Sababbin wurare','Nouvelles destinations'],
  ['Coral reefs & islands','شعاب مرجانية وجزر','مرجانی چٹانیں اور جزیرے','Terumbu karang & pulau','Murjani da tsibirai','Récifs coralliens et îles'],
  ['Cool air in the southwest','أجواء معتدلة في الجنوب الغربي','جنوب مغرب میں ٹھنڈی ہوا','Udara sejuk di barat daya','Iska mai sanyi a kudu maso yamma','De l’air frais dans le sud-ouest'],
  ['Traditional architecture','عمارة تقليدية','روایتی طرزِ تعمیر','Arsitektur tradisional','Gine-gine na gargajiya','Architecture traditionnelle'],
  ['History, art & Islam','التاريخ والفن والإسلام','تاریخ، فن اور اسلام','Sejarah, seni & Islam','Tarihi, fasaha da Musulunci','Histoire, art et islam'],
  ['Parks, aquariums & shows','حدائق وأحواض أسماك وعروض','پارک، ایکویریم اور شوز','Taman, akuarium & pertunjukan','Wuraren shakatawa, akwatin kifi da nune-nune','Parcs, aquariums et spectacles'],
  ['Riyadh Season & more','موسم الرياض والمزيد','ریاض سیزن اور مزید','Riyadh Season & lainnya','Riyadh Season da sauransu','Riyadh Season et plus'],
  ['Local businesses, reviewed','أعمال محلية تمت مراجعتها','مقامی کاروبار، جانچ شدہ','Bisnis lokal, sudah ditinjau','Kasuwancin gida, an duba su','Commerces locaux vérifiés'],
  ['Price, merchants, QR & safety','السعر والتجار ورمز QR والأمان','قیمت، تاجر، QR اور حفاظت','Harga, pedagang, QR & keamanan','Farashi, ’yan kasuwa, QR da tsaro','Cours, commerçants, QR et sécurité'],
  ['Free listing · accepts Pi option','إدراج مجاني · خيار قبول Pi','مفت اندراج · Pi قبول کرنے کا آپشن','Daftar gratis · opsi terima Pi','Rajista kyauta · zaɓin karɓar Pi','Inscription gratuite · option Pi acceptée'],
  ['Deserts, coasts, mountains','صحارى وسواحل وجبال','صحرا، ساحل، پہاڑ','Gurun, pantai, pegunungan','Hamada, gaɓar teku, duwatsu','Déserts, côtes, montagnes'],
  ['From Diriyah to today','من الدرعية إلى اليوم','درعیہ سے آج تک','Dari Diriyah hingga kini','Daga Diriyah zuwa yau','De Diriyah à aujourd’hui'],
  ['Hospitality, dress, arts','الضيافة واللباس والفنون','مہمان نوازی، لباس، فنون','Keramahan, busana, seni','Karɓar baƙi, sutura, fasaha','Hospitalité, tenue, arts'],
  ['Holy sites to skyscrapers','من الأماكن المقدسة إلى ناطحات السحاب','مقدس مقامات سے فلک بوس عمارتوں تک','Dari tempat suci hingga gedung pencakar langit','Daga wurare masu tsarki zuwa dogayen gine-gine','Des lieux saints aux gratte-ciel'],
  ['Everyday dialect','اللهجة اليومية','روزمرہ لہجہ','Dialek sehari-hari','Yaren yau da kullum','Dialecte du quotidien'],
  ['At a glance','لمحة سريعة','ایک نظر میں','Sekilas','A taƙaice','En bref'],
  ['10 questions · earn a badge','10 أسئلة · اربح شارة','10 سوالات · بیج حاصل کریں','10 pertanyaan · dapatkan lencana','Tambayoyi 10 · sami lamba','10 questions · gagnez un badge'],
  ['Dammam & Khobar','الدمام والخبر','دمام اور خبر','Dammam & Khobar','Dammam da Khobar','Dammam et Khobar'],
  ['Red Sea coast','ساحل البحر الأحمر','بحیرۂ احمر کا ساحل','Pesisir Laut Merah','Gaɓar Bahar Maliya','Côte de la mer Rouge'],
  ['Major cities','المدن الكبرى','بڑے شہر','Kota-kota besar','Manyan birane','Grandes villes'],
  ['Culture & traditions','الثقافة والتقاليد','ثقافت اور روایات','Budaya & tradisi','Al’adu da gargajiya','Culture et traditions'],
  ['Saudi expressions','تعابير سعودية','سعودی محاورے','Ungkapan Saudi','Kalaman Saudiyya','Expressions saoudiennes'],
  ['Geography','الجغرافيا','جغرافیہ','Geografi','Labarin ƙasa','Géographie'],
  ['History','التاريخ','تاریخ','Sejarah','Tarihi','Histoire'],
  ['Famous landmarks','معالم شهيرة','مشہور مقامات','Landmark terkenal','Shahararrun wurare','Sites célèbres'],
  ['Family fun','مرح عائلي','فیملی تفریح','Hiburan keluarga','Nishaɗin iyali','Loisirs en famille'],
  ['Heritage villages','قرى تراثية','تاریخی دیہات','Desa warisan','Ƙauyukan tarihi','Villages du patrimoine'],
  ['Mountains & hiking','الجبال والمشي','پہاڑ اور ہائیکنگ','Gunung & pendakian','Duwatsu da hawan ƙafa','Montagnes et randonnée'],
  ['Museums & culture','المتاحف والثقافة','عجائب گھر اور ثقافت','Museum & budaya','Gidajen tarihi da al’adu','Musées et culture'],
  ['Red Sea & diving','البحر الأحمر والغوص','بحیرۂ احمر اور غوطہ خوری','Laut Merah & menyelam','Bahar Maliya da ninkaya a ƙarƙashin ruwa','Mer Rouge et plongée'],
  ['Seasonal festivals','المهرجانات الموسمية','موسمی میلے','Festival musiman','Bukukuwan yanayi','Festivals saisonniers'],
  ['Abha','أبها','ابہا','Abha','Abha','Abha'], ['Dammam','الدمام','دمام','Dammam','Dammam','Dammam'], ['Khobar','الخبر','خبر','Khobar','Khobar','Khobar'], ['Taif','الطائف','طائف','Taif','Taif','Taïf'], ['Tabuk','تبوك','تبوک','Tabuk','Tabuk','Tabouk'],
  // Tools
  ['Full calendar ›','التقويم الكامل ›','مکمل کیلنڈر ›','Kalender lengkap ›','Cikakken kalanda ›','Calendrier complet ›'],
  ['All visa types','جميع أنواع التأشيرات','تمام اقسام کے ویزے','Semua jenis visa','Duk nau’in biza','Tous les types de visa'],
  ['SAR, mada, SADAD, remittance','الريال ومدى وسداد والحوالات','ریال، مدی، سداد، ترسیلات','SAR, mada, SADAD, kiriman uang','SAR, mada, SADAD, aika kuɗi','SAR, mada, SADAD, transferts'],
  ['Renting safely','الاستئجار بأمان','محفوظ طریقے سے کرایہ','Menyewa dengan aman','Yin haya cikin aminci','Louer en toute sécurité'],
  ['Metro, trains, taxis','المترو والقطارات وسيارات الأجرة','میٹرو، ٹرینیں، ٹیکسیاں','Metro, kereta, taksi','Metro, jiragen ƙasa, tasi','Métro, trains, taxis'],
  ['Hospitals, insurance, pharmacies','المستشفيات والتأمين والصيدليات','ہسپتال، انشورنس، فارمیسیاں','Rumah sakit, asuransi, apotek','Asibitoci, inshora, kantin magani','Hôpitaux, assurance, pharmacies'],
  ['Guides, checklists & emergency help','أدلة وقوائم ومساعدة طارئة','گائیڈز، چیک لسٹیں اور ہنگامی مدد','Panduan, daftar periksa & bantuan darurat','Jagorori, jerin dubawa da taimakon gaggawa','Guides, listes et aide d’urgence'],
  ['CV builder, interviews, salary, gratuity','منشئ السيرة الذاتية والمقابلات والراتب ومكافأة نهاية الخدمة','سی وی بلڈر، انٹرویو، تنخواہ، گریجویٹی','Pembuat CV, wawancara, gaji, pesangon','Mai haɗa CV, hira, albashi, kuɗin sallama','CV, entretiens, salaire, indemnité'],
  ['Dress, prayer times, Ramadan','اللباس وأوقات الصلاة ورمضان','لباس، نماز کے اوقات، رمضان','Busana, waktu salat, Ramadan','Sutura, lokutan sallah, Ramadan','Tenue, heures de prière, Ramadan'],
  ['Legit job channels & scam warning','قنوات توظيف موثوقة وتحذير من الاحتيال','قابلِ اعتماد ملازمت ذرائع اور فراڈ سے انتباہ','Saluran kerja resmi & peringatan penipuan','Hanyoyin aiki na gaske da gargaɗin zamba','Canaux d’emploi fiables et alerte arnaques'],
  ['Finding jobs','البحث عن عمل','ملازمت تلاش کرنا','Mencari kerja','Neman aiki','Trouver un emploi'],
  ['Iqama, exit/re-entry, traffic','الإقامة والخروج والعودة والمرور','اقامہ، خروج/واپسی، ٹریفک','Iqama, keluar/masuk kembali, lalu lintas','Iqama, fita/dawowa, zirga-zirga','Iqama, sortie/retour, circulation'],
  ['National digital login','الدخول الرقمي الوطني','قومی ڈیجیٹل لاگ اِن','Login digital nasional','Shiga ta dijital na ƙasa','Connexion numérique nationale'],
  ['Unified government services app','تطبيق الخدمات الحكومية الموحد','متحدہ سرکاری خدمات ایپ','Aplikasi layanan pemerintah terpadu','Manhajar ayyukan gwamnati ta bai ɗaya','Application unifiée des services publics'],
  ['Employment contracts & job changes','عقود العمل ونقل الخدمات','ملازمت کے معاہدے اور تبدیلی','Kontrak kerja & pindah kerja','Kwangilolin aiki da sauya aiki','Contrats de travail et changements d’emploi'],
  ['Umrah, Rawdah & Hajj','العمرة والروضة والحج','عمرہ، روضہ اور حج','Umrah, Raudhah & Haji','Umrah, Rawdah da Hajji','Omra, Rawdah et Hajj'],
  ['Health appointments & records','المواعيد والسجلات الصحية','طبی ملاقاتیں اور ریکارڈ','Janji temu & catatan kesehatan','Ganawa da bayanan lafiya','Rendez-vous et dossiers de santé'],
  ['Balady, Ejar, Musaned, Muqeem','بلدي، إيجار، مساند، مقيم','بلدی، ایجار، مساند، مقیم','Balady, Ejar, Musaned, Muqeem','Balady, Ejar, Musaned, Muqeem','Balady, Ejar, Musaned, Muqeem'],
  ['More platforms','منصات أخرى','مزید پلیٹ فارمز','Platform lain','Ƙarin dandamali','Autres plateformes'],
  ['Your yearly CO₂ footprint','بصمتك الكربونية السنوية','آپ کا سالانہ CO₂ اثر','Jejak CO₂ tahunan Anda','Sawun CO₂ ɗinka na shekara','Votre empreinte CO₂ annuelle'],
  ['Daily litres & savings','اللترات اليومية والتوفير','روزانہ لیٹر اور بچت','Liter harian & penghematan','Lita na kullum da tanadi','Litres par jour et économies'],
  ['kWh and SAR estimate','تقدير الكيلوواط ساعة والريال','kWh اور ریال کا اندازہ','Perkiraan kWh dan SAR','Kimanin kWh da SAR','Estimation kWh et SAR'],
  ['What, how and where','ماذا وكيف وأين','کیا، کیسے اور کہاں','Apa, bagaimana, dan di mana','Me, yaya da ina','Quoi, comment et où'],
  ['Home, travel, shopping, Umrah','المنزل والسفر والتسوق والعمرة','گھر، سفر، خریداری، عمرہ','Rumah, perjalanan, belanja, Umrah','Gida, tafiya, siyayya, Umrah','Maison, voyage, achats, Omra'],
  ['6 short lessons','6 دروس قصيرة','6 مختصر اسباق','6 pelajaran singkat','Gajerun darussa 6','6 courtes leçons'],
  ['Solar, wind, hydrogen & more','الشمس والرياح والهيدروجين والمزيد','شمسی، ہوا، ہائیڈروجن اور مزید','Surya, angin, hidrogen & lainnya','Hasken rana, iska, hydrogen da sauransu','Solaire, éolien, hydrogène et plus'],
  ['Healthcare information','معلومات الرعاية الصحية','صحت کی معلومات','Informasi layanan kesehatan','Bayanan kiwon lafiya','Informations santé'],
  ['Housing','السكن','رہائش','Perumahan','Gidaje','Logement'],
  ['Money & banking','المال والبنوك','رقم اور بینکاری','Uang & perbankan','Kuɗi da banki','Argent et banque'],
  ['Getting around','التنقل','آمد و رفت','Berkeliling','Zirga-zirga','Se déplacer'],
  ['When to visit','متى تزور','کب جائیں','Kapan berkunjung','Lokacin ziyara','Quand y aller'],
  ['Offline, on this device','بدون إنترنت، على هذا الجهاز','آف لائن، اسی ڈیوائس پر','Offline, di perangkat ini','Ba intanet, a wannan na’ura','Hors ligne, sur cet appareil'],
  ['Common tricks & how to avoid them','حيل شائعة وكيف تتجنبها','عام چالیں اور ان سے بچاؤ','Trik umum & cara menghindarinya','Dabarun da aka saba da yadda za a guje su','Arnaques courantes et comment les éviter'],
  ['Step-by-step emergency guide','دليل الطوارئ خطوة بخطوة','قدم بہ قدم ہنگامی رہنمائی','Panduan darurat langkah demi langkah','Jagorar gaggawa mataki-mataki','Guide d’urgence pas à pas'],
  ['Scam awareness','التوعية بالاحتيال','فراڈ سے آگاہی','Waspada penipuan','Wayar da kai kan zamba','Prévention des arnaques'],
  ['Made for your trip type','مصمم لنوع رحلتك','آپ کے سفر کی قسم کے مطابق','Sesuai jenis perjalanan Anda','An yi shi don irin tafiyarka','Adapté à votre type de voyage'],
  // Profile & badges
  ['No payments yet.','لا مدفوعات بعد.','ابھی کوئی ادائیگی نہیں۔','Belum ada pembayaran.','Babu biya tukuna.','Aucun paiement pour le moment.'],
  ['Tap a locked badge to see how to earn it','اضغط على شارة مقفلة لمعرفة طريقة كسبها','مقفل بیج پر ٹیپ کریں کہ اسے کیسے حاصل کریں','Ketuk lencana terkunci untuk melihat cara mendapatkannya','Taɓa lamba a kulle don ganin yadda za ka samu','Touchez un badge verrouillé pour savoir comment l’obtenir'],
  ['First step','الخطوة الأولى','پہلا قدم','Langkah pertama','Mataki na farko','Premier pas'],
  ['3-day streak','3 أيام متتالية','3 دن مسلسل','3 hari berturut-turut','Kwana 3 a jere','3 jours d’affilée'],
  ['7-day streak','7 أيام متتالية','7 دن مسلسل','7 hari berturut-turut','Kwana 7 a jere','7 jours d’affilée'],
  ['30-day streak','30 يوماً متتالية','30 دن مسلسل','30 hari berturut-turut','Kwana 30 a jere','30 jours d’affilée'],
  ['Guide reader','قارئ الأدلة','گائیڈ ریڈر','Pembaca panduan','Mai karanta jagora','Lecteur de guides'],
  ['City explorer','مستكشف المدن','شہروں کا متلاشی','Penjelajah kota','Mai binciken birane','Explorateur de villes'],
  ['Near-me navigator','مستكشف ما حولي','قریبی رہنما','Navigator terdekat','Mai bincike kusa da ni','Navigateur de proximité'],
  ['Trip planner','مخطط الرحلات','ٹرپ پلانر','Perencana perjalanan','Mai tsara tafiya','Planificateur de voyage'],
  ['Stay sorted','منظّم دائماً','منظم رہیں','Selalu teratur','Kasance cikin tsari','Toujours organisé'],
  ['Foodie','محب الطعام','کھانے کا شوقین','Pecinta kuliner','Mai son abinci','Gourmand'],
  ['News reader','قارئ الأخبار','خبریں پڑھنے والا','Pembaca berita','Mai karanta labarai','Lecteur d’actualités'],
  ['Event goer','حاضر الفعاليات','تقریبات میں جانے والا','Pengunjung acara','Mai halartar taro','Amateur d’événements'],
  ['Umrah ready','جاهز للعمرة','عمرہ کے لیے تیار','Siap Umrah','A shirye don Umrah','Prêt pour la Omra'],
  ['Quran reader','قارئ القرآن','قرآن پڑھنے والا','Pembaca Al-Qur’an','Mai karatun Alƙur’ani','Lecteur du Coran'],
  ['First dua saved','أول دعاء محفوظ','پہلی دعا محفوظ','Doa pertama tersimpan','Addu’a ta farko an adana','Première invocation enregistrée'],
  ['100 dhikr','100 ذكر','100 ذکر','100 zikir','Zikiri 100','100 dhikr'],
  ['Saudi scholar','خبير السعودية','سعودی ماہر','Pakar Saudi','Masanin Saudiyya','Expert de l’Arabie'],
  ['Safety smart','واعٍ بالسلامة','حفاظت میں ہوشیار','Cerdas keamanan','Mai hankali kan tsaro','Prudent'],
  ['CV ready','السيرة الذاتية جاهزة','سی وی تیار','CV siap','CV ta shirya','CV prêt'],
  ['Local supporter','داعم محلي','مقامی حامی','Pendukung lokal','Mai tallafa wa gida','Soutien local'],
  ['Pi shopper','متسوق بـ Pi','Pi خریدار','Pembeli Pi','Mai siyayya da Pi','Acheteur Pi'],
  ['AI explorer','مستكشف الذكاء الاصطناعي','AI متلاشی','Penjelajah AI','Mai binciken AI','Explorateur IA'],
  ['Green champion','بطل البيئة','ماحول دوست چیمپئن','Juara hijau','Gwarzon muhalli','Champion vert'],
  ['Supporter','داعم','حامی','Pendukung','Mai tallafi','Soutien'],
  ['Word explorer','مستكشف الكلمات','الفاظ کا متلاشی','Penjelajah kata','Mai binciken kalmomi','Explorateur de mots'],
  ['Pi Pioneer','رائد Pi','Pi پائنیر','Pionir Pi','Majagaban Pi','Pionnier Pi'],
  // Pi Hub, wallet, premium, support
  ['Live from market data','مباشر من بيانات السوق','مارکیٹ ڈیٹا سے براہِ راست','Langsung dari data pasar','Kai tsaye daga bayanan kasuwa','En direct des données du marché'],
  ['Merchants unavailable right now.','التجار غير متاحين الآن.','تاجر ابھی دستیاب نہیں۔','Pedagang sedang tidak tersedia.','’Yan kasuwa ba sa samuwa yanzu.','Commerçants indisponibles pour le moment.'],
  ['Get listed free — shown on the Pi map','أدرج نشاطك مجاناً — يظهر على خريطة Pi','مفت اندراج — Pi نقشے پر دکھایا جائے گا','Daftar gratis — tampil di peta Pi','Yi rajista kyauta — za a nuna a taswirar Pi','Inscription gratuite — visible sur la carte Pi'],
  ['Real QR code · print, stick or share on WhatsApp','رمز QR حقيقي · اطبع أو ألصق أو شارك عبر واتساب','حقیقی QR کوڈ · پرنٹ کریں، لگائیں یا واٹس ایپ پر بھیجیں','Kode QR asli · cetak, tempel, atau bagikan di WhatsApp','Lambar QR ta gaske · buga, liƙa ko raba a WhatsApp','Vrai QR code · imprimez, collez ou partagez sur WhatsApp'],
  ['Prices are for information only and are not financial advice.','الأسعار للمعلومات فقط وليست نصيحة مالية.','قیمتیں صرف معلومات کے لیے ہیں، مالی مشورہ نہیں۔','Harga hanya untuk informasi, bukan nasihat keuangan.','Farashi don bayani ne kawai, ba shawarar kuɗi ba.','Les prix sont indicatifs et ne constituent pas un conseil financier.'],
  ['Account','الحساب','اکاؤنٹ','Akun','Asusu','Compte'],
  ['Paid via app','مدفوع عبر التطبيق','ایپ کے ذریعے ادا شدہ','Dibayar via aplikasi','An biya ta manhaja','Payé via l’app'],
  ['Poster','الملصق','پوسٹر','Poster','Fosta','Affiche'],
  ['Activity','النشاط','سرگرمی','Aktivitas','Ayyuka','Activité'],
  ['Create a payment request to show or share. The payer sends Pi from their own Pi Wallet.','أنشئ طلب دفع لعرضه أو مشاركته. يرسل الدافع Pi من محفظته الخاصة.','دکھانے یا بھیجنے کے لیے ادائیگی کی درخواست بنائیں۔ ادا کرنے والا اپنے Pi Wallet سے Pi بھیجتا ہے۔','Buat permintaan pembayaran untuk ditunjukkan atau dibagikan. Pembayar mengirim Pi dari Pi Wallet miliknya.','Ƙirƙiri buƙatar biya don nunawa ko rabawa. Mai biya yana aika Pi daga Pi Wallet ɗinsa.','Créez une demande de paiement à montrer ou partager. Le payeur envoie des Pi depuis son propre Pi Wallet.'],
  ['Your Pi username or wallet address','اسم مستخدم Pi أو عنوان المحفظة','آپ کا Pi یوزرنیم یا والٹ ایڈریس','Nama pengguna Pi atau alamat dompet','Sunan Pi ɗinka ko adireshin walat','Votre nom Pi ou adresse de portefeuille'],
  ['Amount (π)','المبلغ (π)','رقم (π)','Jumlah (π)','Adadi (π)','Montant (π)'],
  ['For (memo)','الغرض (ملاحظة)','کس لیے (میمو)','Untuk (memo)','Don (bayani)','Pour (mémo)'],
  ['Create request','إنشاء طلب','درخواست بنائیں','Buat permintaan','Ƙirƙiri buƙata','Créer la demande'],
  ['Fix “Pending payment found”','إصلاح «تم العثور على دفعة معلقة»','«زیرِ التوا ادائیگی» ٹھیک کریں','Perbaiki “Pembayaran tertunda ditemukan”','Gyara “An sami biya da ke jira”','Corriger « Paiement en attente trouvé »'],
  ['Clears an unfinished payment so you can pay again','يزيل دفعة غير مكتملة لتتمكن من الدفع مجدداً','نامکمل ادائیگی صاف کرتا ہے تاکہ آپ دوبارہ ادا کر سکیں','Menghapus pembayaran yang belum selesai agar bisa membayar lagi','Yana share biyan da bai kammala ba domin ka sake biya','Supprime un paiement inachevé pour pouvoir repayer'],
  ['Go Premium','اشترك في بريميوم','پریمیم لیں','Jadi Premium','Shiga Premium','Passer à Premium'],
  ['Unlock planners and checklists for your trip.','افتح المخططات وقوائم التحقق لرحلتك.','اپنے سفر کے لیے پلانر اور چیک لسٹیں کھولیں۔','Buka perencana dan daftar periksa untuk perjalanan Anda.','Buɗe masu tsara tafiya da jerin dubawa don tafiyarka.','Débloquez planificateurs et listes pour votre voyage.'],
  ['What you get','ما تحصل عليه','آپ کو کیا ملے گا','Yang Anda dapatkan','Abin da za ka samu','Ce que vous obtenez'],
  ['Choose a plan','اختر خطة','پلان منتخب کریں','Pilih paket','Zaɓi tsari','Choisissez une formule'],
  ['Monthly','شهري','ماہانہ','Bulanan','Na wata','Mensuel'],
  ['30 days of Premium','30 يوماً من بريميوم','30 دن کا پریمیم','30 hari Premium','Kwana 30 na Premium','30 jours de Premium'],
  ['BEST VALUE','أفضل قيمة','بہترین قدر','PALING HEMAT','MAFI ARHA','MEILLEURE OFFRE'],
  ['Lifetime','مدى الحياة','تاحیات','Seumur hidup','Har abada','À vie'],
  ['Pay once, keep forever','ادفع مرة واحتفظ للأبد','ایک بار ادا کریں، ہمیشہ رکھیں','Bayar sekali, milik selamanya','Biya sau ɗaya, ka mallaka har abada','Payez une fois, gardez pour toujours'],
  ['Seeing “Pending payment found”?','هل تظهر «دفعة معلقة»؟','«زیرِ التوا ادائیگی» نظر آ رہی ہے؟','Muncul “Pembayaran tertunda ditemukan”?','Kana ganin “An sami biya da ke jira”?','Vous voyez « Paiement en attente » ?'],
  ['Fix it','أصلحه','ٹھیک کریں','Perbaiki','Gyara','Corriger'],
  ['Or enter an amount','أو أدخل مبلغاً','یا رقم درج کریں','Atau masukkan jumlah','Ko shigar da adadi','Ou saisissez un montant'],
  ['Send support','أرسل الدعم','حمایت بھیجیں','Kirim dukungan','Aika tallafi','Envoyer le soutien'],
  ['Premium feature','ميزة بريميوم','پریمیم فیچر','Fitur Premium','Fasalin Premium','Fonction Premium'],
  ['See Premium','عرض بريميوم','پریمیم دیکھیں','Lihat Premium','Duba Premium','Voir Premium'],
  // Common empty states and labels
  ['No notifications yet.','لا إشعارات بعد.','ابھی کوئی اطلاع نہیں۔','Belum ada notifikasi.','Babu sanarwa tukuna.','Aucune notification pour le moment.'],
  ['No bookmarks yet.','لا إشارات مرجعية بعد.','ابھی کوئی بُک مارک نہیں۔','Belum ada markah.','Babu alamomi tukuna.','Aucun favori pour le moment.'],
  ['Tap ☆ on any guide to save it here.','اضغط ☆ على أي دليل لحفظه هنا.','کسی بھی گائیڈ پر ☆ دبائیں تاکہ یہاں محفوظ ہو۔','Ketuk ☆ pada panduan untuk menyimpannya di sini.','Taɓa ☆ a kowace jagora don adana ta nan.','Touchez ☆ sur un guide pour l’enregistrer ici.'],
  ['No saved places yet.','لا أماكن محفوظة بعد.','ابھی کوئی محفوظ جگہ نہیں۔','Belum ada tempat tersimpan.','Babu wuraren da aka adana tukuna.','Aucun lieu enregistré pour le moment.'],
  ['Tap ☆ Save on any place in Explore.','اضغط ☆ حفظ على أي مكان في استكشف.','ایکسپلور میں کسی بھی جگہ پر ☆ محفوظ دبائیں۔','Ketuk ☆ Simpan pada tempat di Jelajahi.','Taɓa ☆ Adana a kowane wuri a Bincike.','Touchez ☆ Enregistrer sur un lieu dans Explorer.'],
  ['No reminders yet.','لا تذكيرات بعد.','ابھی کوئی یاد دہانی نہیں۔','Belum ada pengingat.','Babu tunatarwa tukuna.','Aucun rappel pour le moment.'],
  ['Couldn’t load places. Check your connection.','تعذّر تحميل الأماكن. تحقّق من الاتصال.','مقامات لوڈ نہیں ہو سکے۔ کنکشن چیک کریں۔','Tempat gagal dimuat. Periksa koneksi Anda.','An kasa loda wurare. Duba haɗin intanet.','Impossible de charger les lieux. Vérifiez votre connexion.'],
  ['Couldn’t load places right now.','تعذّر تحميل الأماكن الآن.','مقامات ابھی لوڈ نہیں ہو سکے۔','Tempat gagal dimuat saat ini.','An kasa loda wurare yanzu.','Impossible de charger les lieux pour le moment.'],
  ['Map could not load. Showing the list only.','تعذّر تحميل الخريطة. تُعرض القائمة فقط.','نقشہ لوڈ نہیں ہو سکا۔ صرف فہرست دکھائی جا رہی ہے۔','Peta gagal dimuat. Hanya menampilkan daftar.','Taswira ta kasa lodi. Ana nuna jeri kawai.','La carte n’a pas pu se charger. Liste uniquement.'],
  ['Couldn’t load the Quran. Check your connection.','تعذّر تحميل القرآن. تحقّق من الاتصال.','قرآن لوڈ نہیں ہو سکا۔ کنکشن چیک کریں۔','Al-Qur’an gagal dimuat. Periksa koneksi Anda.','An kasa loda Alƙur’ani. Duba haɗin intanet.','Impossible de charger le Coran. Vérifiez votre connexion.'],
  ['Directory unavailable right now.','الدليل غير متاح الآن.','ڈائریکٹری ابھی دستیاب نہیں۔','Direktori sedang tidak tersedia.','Jerin kasuwanci ba ya samuwa yanzu.','Annuaire indisponible pour le moment.'],
  ['All businesses','كل الأنشطة','تمام کاروبار','Semua bisnis','Duk kasuwanci','Tous les commerces'],
  ['Sign in to add a business','سجّل الدخول لإضافة نشاط','کاروبار شامل کرنے کے لیے سائن اِن کریں','Masuk untuk menambah bisnis','Shiga don ƙara kasuwanci','Connectez-vous pour ajouter un commerce'],
  ['We ask for a Pi sign-in to keep the directory free of spam.','نطلب تسجيل الدخول بـ Pi لإبقاء الدليل خالياً من الرسائل المزعجة.','ڈائریکٹری کو اسپام سے پاک رکھنے کے لیے Pi سائن اِن ضروری ہے۔','Kami meminta login Pi agar direktori bebas spam.','Muna buƙatar shiga da Pi don kare jerin daga saƙonnin banza.','Nous demandons une connexion Pi pour éviter le spam.'],
  ['Ask anything. Try:','اسأل أي شيء. جرّب:','کچھ بھی پوچھیں۔ آزمائیں:','Tanya apa saja. Coba:','Tambayi komai. Gwada:','Posez une question. Essayez :'],
  ['Free: 10 questions a day · unlimited with Premium','مجاناً: 10 أسئلة يومياً · بلا حدود مع بريميوم','مفت: روزانہ 10 سوالات · پریمیم کے ساتھ لامحدود','Gratis: 10 pertanyaan sehari · tanpa batas dengan Premium','Kyauta: tambayoyi 10 a rana · marar iyaka da Premium','Gratuit : 10 questions par jour · illimité avec Premium'],
  ['AI can make mistakes — check important details on official sources.','قد يخطئ الذكاء الاصطناعي — تحقّق من التفاصيل المهمة في المصادر الرسمية.','AI غلطی کر سکتا ہے — اہم تفصیلات سرکاری ذرائع سے چیک کریں۔','AI bisa keliru — cek detail penting di sumber resmi.','AI na iya yin kuskure — duba muhimman bayanai a majiyoyin hukuma.','L’IA peut se tromper — vérifiez les points importants auprès des sources officielles.'],
  ['Unified emergency number','رقم الطوارئ الموحد','متحدہ ایمرجنسی نمبر','Nomor darurat terpadu','Lambar gaggawa ta bai ɗaya','Numéro d’urgence unifié'],
  ['Police','الشرطة','پولیس','Polisi','’Yan sanda','Police'],
  ['Ambulance','الإسعاف','ایمبولینس','Ambulans','Motar asibiti','Ambulance'],
  ['Civil Defence (fire)','الدفاع المدني (حريق)','شہری دفاع (آگ)','Pertahanan Sipil (kebakaran)','Tsaron farar hula (gobara)','Défense civile (incendie)'],
  ['Traffic police','المرور','ٹریفک پولیس','Polisi lalu lintas','’Yan sandan hanya','Police de la route'],
  ['My emergency card','بطاقة الطوارئ الخاصة بي','میرا ایمرجنسی کارڈ','Kartu darurat saya','Katin gaggawa na','Ma carte d’urgence'],
  ['Your details, works offline','بياناتك، تعمل بدون إنترنت','آپ کی تفصیلات، آف لائن کام کرتی ہیں','Data Anda, berfungsi offline','Bayananka, yana aiki ba intanet','Vos informations, hors ligne'],
  ['Save card','حفظ البطاقة','کارڈ محفوظ کریں','Simpan kartu','Adana kati','Enregistrer la carte'],
  ['Stored only on this device.','مخزّنة على هذا الجهاز فقط.','صرف اسی ڈیوائس پر محفوظ۔','Hanya disimpan di perangkat ini.','An adana a wannan na’ura kawai.','Stocké uniquement sur cet appareil.'],
  ['Full name','الاسم الكامل','پورا نام','Nama lengkap','Cikakken suna','Nom complet'],
  ['Nationality','الجنسية','قومیت','Kewarganegaraan','Ɗan ƙasa','Nationalité'],
  ['Blood group','فصيلة الدم','بلڈ گروپ','Golongan darah','Rukunin jini','Groupe sanguin'],
  ['Emergency contact','جهة اتصال للطوارئ','ہنگامی رابطہ','Kontak darurat','Wanda za a kira a gaggawa','Contact d’urgence'],
  ['Contact phone','رقم الهاتف','رابطہ نمبر','Nomor telepon','Lambar waya','Téléphone'],
  ['Embassy phone','هاتف السفارة','سفارت خانے کا فون','Telepon kedutaan','Lambar ofishin jakadanci','Téléphone de l’ambassade'],
  ['Document','المستند','دستاویز','Dokumen','Takarda','Document'],
  ['Expiry date','تاريخ الانتهاء','میعاد ختم ہونے کی تاریخ','Tanggal kedaluwarsa','Ranar ƙarewa','Date d’expiration'],
  ['Note (optional)','ملاحظة (اختياري)','نوٹ (اختیاری)','Catatan (opsional)','Bayani (na zaɓi)','Note (facultatif)'],
  ['＋ Add reminder','＋ إضافة تذكير','＋ یاد دہانی شامل کریں','＋ Tambah pengingat','＋ Ƙara tunatarwa','＋ Ajouter un rappel'],
  ['＋ Plan a new trip','＋ خطّط لرحلة جديدة','＋ نیا سفر پلان کریں','＋ Rencanakan perjalanan baru','＋ Tsara sabuwar tafiya','＋ Planifier un voyage'],
  ['Plan your first trip — dates, documents, packing, budget and places in one dashboard.','خطّط لأول رحلة — التواريخ والمستندات والتجهيز والميزانية والأماكن في لوحة واحدة.','اپنا پہلا سفر پلان کریں — تاریخیں، دستاویزات، سامان، بجٹ اور مقامات ایک ڈیش بورڈ میں۔','Rencanakan perjalanan pertama — tanggal, dokumen, barang bawaan, anggaran, dan tempat dalam satu dasbor.','Tsara tafiyarka ta farko — kwanaki, takardu, kaya, kasafi da wurare a wuri ɗaya.','Planifiez votre premier voyage — dates, documents, bagages, budget et lieux en un seul tableau.'],
  ['Upcoming dates','المواعيد القادمة','آنے والی تاریخیں','Tanggal mendatang','Kwanaki masu zuwa','Dates à venir'],
  ['Today (Umm al-Qura)','اليوم (أم القرى)','آج (اُمّ القریٰ)','Hari ini (Umm al-Qura)','Yau (Umm al-Qura)','Aujourd’hui (Umm al-Qura)'],
  ['Convert a date','تحويل تاريخ','تاریخ تبدیل کریں','Konversi tanggal','Canza kwanan wata','Convertir une date'],
  ['Gregorian date','التاريخ الميلادي','عیسوی تاریخ','Tanggal Masehi','Kwanan watan Miladiyya','Date grégorienne'],
  ['You have','لديك','آپ کے پاس','Anda punya','Kana da','Vous avez'],
  ['You get','تحصل على','آپ کو ملے گا','Anda dapat','Za ka samu','Vous obtenez'],
  ['Subject','الموضوع','موضوع','Subjek','Batu','Objet'],
  ['Message','الرسالة','پیغام','Pesan','Saƙo','Message'],
  ['✉️ Send via email','✉️ إرسال بالبريد','✉️ ای میل سے بھیجیں','✉️ Kirim lewat email','✉️ Aika ta imel','✉️ Envoyer par e-mail'],
  ['Independence','الاستقلالية','خود مختاری','Independensi','’Yancin kai','Indépendance'],
  ['Data sources','مصادر البيانات','ڈیٹا کے ذرائع','Sumber data','Majiyoyin bayanai','Sources des données'],
  ['Contact','التواصل','رابطہ','Kontak','Tuntuɓa','Contact'],
  ['Guides','الأدلة','گائیڈز','Panduan','Jagorori','Guides'],
  ['Calculators','الحاسبات','کیلکولیٹر','Kalkulator','Na’urorin lissafi','Calculateurs'],
  ['Common questions','أسئلة شائعة','عام سوالات','Pertanyaan umum','Tambayoyin da aka saba','Questions fréquentes'],
  ['Tips','نصائح','مشورے','Tips','Shawarwari','Conseils'],
  ['Overview','نظرة عامة','جائزہ','Ikhtisar','Bayani a taƙaice','Aperçu'],
  ['What it is','ما هي','یہ کیا ہے','Apa itu','Menene shi','De quoi s’agit-il'],
  ['How it works','كيف تعمل','یہ کیسے کام کرتا ہے','Cara kerjanya','Yadda yake aiki','Comment ça marche'],
  ['Keep in mind','تذكّر','یاد رکھیں','Ingat','Ka tuna','À savoir'],
  ['Who can apply','من يمكنه التقديم','کون درخواست دے سکتا ہے','Siapa yang bisa mendaftar','Wa zai iya nema','Qui peut postuler'],
  ['Where','أين','کہاں','Di mana','Ina','Où'],
  ['Prevent','الوقاية','بچاؤ','Pencegahan','Rigakafi','Prévenir'],
  ['Warning signs','علامات التحذير','انتباہی علامات','Tanda bahaya','Alamun gargaɗi','Signes d’alerte'],
  ['Visas & residency','التأشيرات والإقامة','ویزے اور رہائش','Visa & izin tinggal','Biza da zama','Visas et résidence'],
  ['Tourist eVisa','التأشيرة السياحية الإلكترونية','سیاحتی ای ویزا','eVisa turis','Bizar yawon buɗe ido ta intanet','eVisa touristique'],
  ['Umrah visa & permits','تأشيرة العمرة والتصاريح','عمرہ ویزا اور اجازت نامے','Visa & izin Umrah','Bizar Umrah da izini','Visa et permis de Omra'],
  ['Work visa & Iqama','تأشيرة العمل والإقامة','ورک ویزا اور اقامہ','Visa kerja & Iqama','Bizar aiki da Iqama','Visa de travail et Iqama'],
  ['Family visit visa','تأشيرة الزيارة العائلية','فیملی وزٹ ویزا','Visa kunjungan keluarga','Bizar ziyarar iyali','Visa de visite familiale'],
  ['Premium Residency','الإقامة المميزة','پریمیم ریزیڈنسی','Izin Tinggal Premium','Zama na musamman (Premium)','Résidence Premium'],
  ['Online visa for eligible nationalities','تأشيرة إلكترونية للجنسيات المؤهلة','اہل قومیتوں کے لیے آن لائن ویزا','Visa online untuk negara yang memenuhi syarat','Biza ta intanet ga ƙasashen da suka cancanta','Visa en ligne pour les nationalités éligibles'],
  ['Via Nusuk or approved agents','عبر نسك أو الوكلاء المعتمدين','نُسک یا منظور شدہ ایجنٹس کے ذریعے','Melalui Nusuk atau agen resmi','Ta Nusuk ko wakilai da aka amince','Via Nusuk ou des agents agréés'],
  ['Through your country’s Hajj mission','عبر بعثة الحج في بلدك','اپنے ملک کے حج مشن کے ذریعے','Melalui misi haji negara Anda','Ta hukumar Hajjin ƙasarka','Par la mission Hajj de votre pays'],
  ['Employer-sponsored residency','إقامة بكفالة صاحب العمل','آجر کی کفالت والی رہائش','Izin tinggal disponsori pemberi kerja','Zama ta hanyar mai ɗaukar aiki','Résidence parrainée par l’employeur'],
  ['For residents inviting family','للمقيمين الذين يدعون عائلاتهم','اہلِ خانہ کو بلانے والے مقیمین کے لیے','Untuk penduduk yang mengundang keluarga','Ga mazauna da ke gayyatar iyali','Pour les résidents qui invitent leur famille'],
  ['Long-term residency without a sponsor','إقامة طويلة دون كفيل','کفیل کے بغیر طویل مدتی رہائش','Izin tinggal jangka panjang tanpa sponsor','Zama na dogon lokaci ba tare da mai ɗauka ba','Résidence longue durée sans parrain'],
  ['Lost passport','فقدان جواز السفر','پاسپورٹ گم ہو جانا','Paspor hilang','Fasfo ya ɓace','Passeport perdu'],
  ['Lost phone','فقدان الهاتف','فون گم ہو جانا','Ponsel hilang','Waya ta ɓace','Téléphone perdu'],
  ['Road safety','السلامة المرورية','سڑک پر حفاظت','Keselamatan jalan','Tsaron hanya','Sécurité routière'],
  ['Heat safety','السلامة من الحرارة','گرمی سے حفاظت','Keamanan dari panas','Tsaro daga zafi','Se protéger de la chaleur'],
  ['Desert safety','السلامة في الصحراء','صحرا میں حفاظت','Keamanan di gurun','Tsaro a hamada','Sécurité dans le désert'],
  ['Medical emergencies','الطوارئ الطبية','طبی ہنگامی حالات','Darurat medis','Gaggawar lafiya','Urgences médicales'],
  ['Important documents','المستندات المهمة','اہم دستاویزات','Dokumen penting','Muhimman takardu','Documents importants'],
  ['Saudi CV guide','دليل السيرة الذاتية السعودية','سعودی سی وی گائیڈ','Panduan CV Saudi','Jagorar CV ta Saudiyya','Guide du CV saoudien'],
  ['Interview preparation','التحضير للمقابلة','انٹرویو کی تیاری','Persiapan wawancara','Shirye-shiryen hira','Préparer un entretien'],
  ['Where to find jobs','أين تجد الوظائف','ملازمتیں کہاں ملیں','Tempat mencari kerja','Inda za a samu aiki','Où trouver un emploi'],
  ['Career roadmap','خارطة المسار المهني','کیریئر کا روڈ میپ','Peta jalan karier','Taswirar sana’a','Feuille de route professionnelle'],
  ['What employers expect','ما يتوقعه أصحاب العمل','آجر کیا توقع رکھتے ہیں','Yang diharapkan pemberi kerja','Abin da masu ɗaukar aiki ke tsammani','Ce qu’attendent les employeurs'],
  ['Common questions & tips','أسئلة شائعة ونصائح','عام سوالات اور مشورے','Pertanyaan umum & tips','Tambayoyin da aka saba da shawarwari','Questions fréquentes et conseils'],
  ['From student to professional','من طالب إلى محترف','طالب علم سے پیشہ ور تک','Dari pelajar ke profesional','Daga ɗalibi zuwa ƙwararre','De l’étudiant au professionnel'],
  ['Trusted platforms','منصات موثوقة','قابلِ اعتماد پلیٹ فارمز','Platform tepercaya','Dandamali amintattu','Plateformes fiables'],
  ['Basic salary','الراتب الأساسي','بنیادی تنخواہ','Gaji pokok','Albashi na asali','Salaire de base'],
  ['Housing allowance','بدل السكن','رہائشی الاؤنس','Tunjangan perumahan','Alawus na gida','Indemnité de logement'],
  ['Transport allowance','بدل المواصلات','ٹرانسپورٹ الاؤنس','Tunjangan transportasi','Alawus na sufuri','Indemnité de transport'],
  ['Other allowances','بدلات أخرى','دیگر الاؤنس','Tunjangan lain','Sauran alawus','Autres indemnités'],
  ['Gross / month','الإجمالي / شهرياً','کل / ماہانہ','Kotor / bulan','Jimla / wata','Brut / mois'],
  ['Net / month','الصافي / شهرياً','خالص / ماہانہ','Bersih / bulan','Net / wata','Net / mois'],
  ['Start date','تاريخ البداية','آغاز کی تاریخ','Tanggal mulai','Ranar farawa','Date de début'],
  ['End date','تاريخ النهاية','اختتام کی تاریخ','Tanggal selesai','Ranar ƙarshe','Date de fin'],
  ['Estimated gratuity','المكافأة التقديرية','اندازاً گریجویٹی','Perkiraan pesangon','Kimanin kuɗin sallama','Indemnité estimée'],
  ['Total','الإجمالي','کل','Total','Jimla','Total'],
  ['People','الأشخاص','افراد','Orang','Mutane','Personnes'],
  ['Each person','لكل شخص','فی کس','Per orang','Kowane mutum','Par personne'],
  ['Result','النتيجة','نتیجہ','Hasil','Sakamako','Résultat'],
  ['Value','القيمة','قدر','Nilai','Ƙima','Valeur'],
  ['Type','النوع','قسم','Jenis','Nau’i','Type'],
  ['From','من','سے','Dari','Daga','De'],
  ['Total with VAT','الإجمالي مع الضريبة','VAT سمیت کل','Total dengan PPN','Jimla da VAT','Total TTC'],
  ['Amount (SAR)','المبلغ (ريال)','رقم (ریال)','Jumlah (SAR)','Adadi (SAR)','Montant (SAR)'],
  ['Mode','الوضع','موڈ','Mode','Yanayi','Mode'],
  ['Read & listen','اقرأ واستمع','پڑھیں اور سنیں','Baca & dengarkan','Karanta ka saurara','Lire et écouter'],
  ['Countdowns & converter','العد التنازلي والمحوّل','الٹی گنتی اور کنورٹر','Hitung mundur & konverter','Ƙirgawa da mai canzawa','Comptes à rebours et convertisseur'],
  ['Direction to the Kaaba','الاتجاه إلى الكعبة','کعبہ کی سمت','Arah ke Ka’bah','Hanyar Ka’aba','Direction de la Kaaba'],
  ['Digital counter','عدّاد رقمي','ڈیجیٹل کاؤنٹر','Penghitung digital','Ma’aunin dijital','Compteur numérique'],
  ['By situation, with audio','حسب الموقف، مع الصوت','حالات کے مطابق، آڈیو کے ساتھ','Sesuai situasi, dengan audio','Bisa yanayi, da sauti','Par situation, avec audio'],
  ['2.5% of eligible wealth','2.5% من المال الزكوي','قابلِ زکوٰۃ مال کا 2.5%','2,5% dari harta wajib zakat','2.5% na dukiyar da ta cancanta','2,5 % des biens imposables'],
  ['KSA vs your time','توقيت السعودية مقابل توقيتك','سعودی وقت بمقابلہ آپ کا وقت','Waktu Saudi vs waktu Anda','Lokacin Saudiyya da naka','Heure saoudienne et la vôtre'],
  ['Share costs + VAT','تقسيم التكاليف + الضريبة','اخراجات تقسیم + VAT','Bagi biaya + PPN','Raba kuɗi + VAT','Partager les frais + TVA'],
  ['Add / remove 15%','إضافة / إزالة 15%','15% شامل / منہا کریں','Tambah / hapus 15%','Ƙara / cire 15%','Ajouter / retirer 15 %'],
  ['Live SAR · USD · EUR · Pi','مباشر: ريال · دولار · يورو · Pi','لائیو SAR · USD · EUR · Pi','Langsung SAR · USD · EUR · Pi','Kai tsaye SAR · USD · EUR · Pi','En direct SAR · USD · EUR · Pi'],
  ['Weather · Makkah','الطقس · مكة','موسم · مکہ','Cuaca · Makkah','Yanayi · Makka','Météo · La Mecque']
  ];
  // the page translator looks words up without their icons and arrows ("🕌 Religious" → "Religious"), so store both forms
  function core(s){ const m = s.match(TR_SPLIT); return m ? m : null; }
  R.forEach(function(r){
    const m = core(r[0]);
    LANG_ORDER.slice(1).forEach(function(l, i){
      if(!I18N[l]) return; let v = r[i + 1];
      if(!I18N[l][r[0]]) I18N[l][r[0]] = v;
      if(m && m[2] !== r[0]){ if(m[1] && v.indexOf(m[1]) === 0) v = v.slice(m[1].length); if(m[3] && v.slice(-m[3].length) === m[3]) v = v.slice(0, -m[3].length); if(!I18N[l][m[2]]) I18N[l][m[2]] = v.trim(); }
    });
  });
})();
(function(){
  const R = [
    ['No stories in this section right now.','لا أخبار في هذا القسم الآن.','اس حصے میں ابھی کوئی خبر نہیں۔','Belum ada berita di bagian ini.','Babu labari a wannan sashe yanzu.','Aucun article dans cette rubrique pour le moment.'],
    ['No news right now.','لا أخبار الآن.','ابھی کوئی خبر نہیں۔','Belum ada berita.','Babu labarai yanzu.','Pas d’actualités pour le moment.'],
    ['All matches','كل المباريات','تمام میچ','Semua pertandingan','Duk wasanni','Tous les matchs'],
    ['Weather data:','بيانات الطقس:','موسم کا ڈیٹا:','Data cuaca:','Bayanan yanayi:','Données météo :'],
    ['PI · live price','PI · سعر مباشر','PI · لائیو قیمت','PI · harga langsung','PI · farashi kai tsaye','PI · cours en direct'],
    ['Championship','الدرجة الأولى الإنجليزية','چیمپئن شپ','Championship','Championship','Championship'],
    ['World Cup','كأس العالم','ورلڈ کپ','Piala Dunia','Kofin Duniya','Coupe du monde'],
    ['Euros','بطولة أوروبا','یورو','Piala Eropa','Gasar Turai','Euro']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l] && !I18N[l][r[0]]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* ==========================================================================
   v6.4 — fixes from real-phone testing
   1. Quran "Play all" stopped after two verses
   2. Qibla stayed on "Locating…"
   3. Pi requests: a clear way to open your own Pi Wallet to send or receive
   4. Map: crowded pins grouped into numbered circles
   ========================================================================== */

/* 1 · Quran: one audio player for the whole surah.
   Phones (and the Pi Browser) only let a player start after a tap. The old code made a new
   player for every verse, so after the first verse or two the phone blocked it.
   Now the player you tapped keeps playing verse after verse. */
let dsQ = { el:null, list:[], i:0, cont:false, k:0, srcs:[] };
function dsQEl(){
  if(dsQ.el) return dsQ.el;
  const a = new Audio(); a.preload = 'auto';
  a.addEventListener('ended', function(){ dsQOnEnd(); });
  a.addEventListener('error', function(){ dsQTryNext(); });
  dsQ.el = a; return a;
}
function dsQMark(i){
  document.querySelectorAll('.ayah.playing').forEach(function(x){ x.classList.remove('playing'); });
  const el = $('ay' + i); if(el){ el.classList.add('playing'); el.scrollIntoView({ behavior:'smooth', block:'center' }); }
  const b = $('qPlayAll'); if(b) b.textContent = dsQ.cont ? '⏸ ' + t('Pause') : '▶ ' + t('Play all');
}
function dsQStart(i){
  const s = window._surah; if(!s || !s.ayahs[i]) return dsQStop();
  dsQ.i = i; dsQ.k = 0; dsQ.srcs = ayahSources(s, i);
  dsQMark(i);
  const a = dsQEl(); a.src = dsQ.srcs[0];
  const pr = a.play(); if(pr && pr.catch) pr.catch(function(e){ if(e && e.name === 'NotAllowedError'){ toast(t('Tap ▶ again to play')); dsQ.cont = false; dsQMark(-1); } else if(!(e && e.name === 'AbortError')) dsQTryNext(); });
  // warm the next verse in the phone's cache so there is no pause between verses
  if(dsQ.cont && s.ayahs[i + 1]){ try{ fetch(ayahSources(s, i + 1)[0], { mode:'no-cors' }).catch(function(){}); }catch(e){} }
}
function dsQTryNext(){
  dsQ.k++;
  if(dsQ.k >= dsQ.srcs.length){ toast(t('Audio could not play. Check your connection and try again.')); return dsQStop(); }
  const a = dsQEl(); a.src = dsQ.srcs[dsQ.k]; const pr = a.play(); if(pr && pr.catch) pr.catch(function(e){ if(!(e && (e.name === 'AbortError' || e.name === 'NotAllowedError'))) dsQTryNext(); });
}
function dsQOnEnd(){
  const s = window._surah;
  if(dsQ.cont && s && dsQ.i + 1 < s.ayahs.length && $('ay' + (dsQ.i + 1))) dsQStart(dsQ.i + 1);
  else dsQStop();
}
function dsQStop(){
  if(dsQ.el){ try{ dsQ.el.pause(); }catch(e){} }
  dsQ.cont = false;
  document.querySelectorAll('.ayah.playing').forEach(function(x){ x.classList.remove('playing'); });
  const b = $('qPlayAll'); if(b) b.textContent = '▶ ' + t('Play all');
}
playAyah = function(i, cont){
  // "Play all" while playing → pause
  if(cont && dsQ.cont && dsQ.el && !dsQ.el.paused){ dsQStop(); return; }
  const sur = window._surah;
  // "Play all" after a pause → carry on from the verse you stopped at
  if(cont && i === 0 && sur && dsQ.n === sur.n && dsQ.i > 0 && dsQ.el && dsQ.el.paused && dsQ.el.currentTime > 0 && dsQ.el.currentTime < (dsQ.el.duration || 1e9)){
    dsQ.cont = true; dsQMark(dsQ.i); dsQ.el.play().catch(function(){ dsQStart(dsQ.i); }); return;
  }
  dsQ.cont = !!cont; dsQ.n = sur ? sur.n : 0;
  dsQStart(i);
};
stopQuranAudio = function(){ dsQStop(); };
(function(){
  // stop when the surah is closed; keep the lock-screen title right
  const _close = closePanel;
  closePanel = function(){ if(dsQ.el && !dsQ.el.paused) dsQStop(); return _close.apply(this, arguments); };
})();

/* 2 · Qibla: never stuck on "Locating…" — a 10-second limit, a city you can pick, and the
   compass starts straight away */
function dsQiblaFrom(lat, lon){
  const r = Math.PI / 180, la = lat * r, lo = lon * r, kLa = 21.4225 * r, kLo = 39.8262 * r;
  return (Math.atan2(Math.sin(kLo - lo), Math.cos(la) * Math.tan(kLa) - Math.sin(la) * Math.cos(kLo - lo)) / r + 360) % 360;
}
function dsQiblaShow(b, label){
  qiblaBearing = b;
  if(!$('qOut')) return;
  $('qOut').textContent = Math.round(b) + '°';
  const sm = $('qOut').parentNode.querySelector('small'); if(sm) sm.textContent = t('Qibla bearing from North') + (label ? ' · ' + label : '');
  if($('qNeedle')) $('qNeedle').style.transform = 'rotate(' + b + 'deg)';
  startCompass();
}
function dsQiblaCity(c){
  store.set('qiblaCity', c);
  const k = CITY_COORDS[c]; if(!k) return;
  if(c === 'Makkah'){ qiblaBearing = null; if($('qOut')) $('qOut').textContent = t('In Makkah — face the Kaaba'); return; }
  dsQiblaShow(dsQiblaFrom(k[0], k[1]), t(c));
}
findQibla = function(){
  if(!$('qOut')) return;
  if(!navigator.geolocation){ toast(t('Location is not available on this device. Pick your city instead.')); return; }
  $('qOut').textContent = t('Locating…');
  let done = false;
  const fallback = function(msg){
    if(done) return; done = true;
    toast(t(msg));
    dsQiblaCity(store.get('qiblaCity', null) || (typeof prayerCity === 'function' ? prayerCity() : 'Makkah'));
  };
  const watchdog = setTimeout(function(){ fallback('Location is taking too long. Showing the direction from your city — you can change it below.'); }, 10000);
  navigator.geolocation.getCurrentPosition(function(p){
    if(done) return; done = true; clearTimeout(watchdog);
    dsQiblaShow(dsQiblaFrom(p.coords.latitude, p.coords.longitude), t('your location'));
  }, function(err){
    clearTimeout(watchdog);
    fallback(err && err.code === 1 ? 'Location permission is off. Showing the direction from your city — you can change it below.' : 'Could not get your location. Showing the direction from your city.');
  }, { enableHighAccuracy:false, timeout:9000, maximumAge:600000 });
};
(function(){
  const _q = PANELS.qibla; if(!_q) return;
  PANELS.qibla = function(){
    const r = _q.apply(this, arguments);
    const cur = store.get('qiblaCity', null) || (typeof prayerCity === 'function' ? prayerCity() : 'Makkah');
    const btn = document.querySelector('#pBody .btn-primary');
    if(btn) btn.insertAdjacentHTML('beforebegin', `<div class="field" style="margin-top:14px"><label>${esc(t('Or pick your city'))}</label><select id="qCity" onchange="dsQiblaCity(this.value)">${Object.keys(CITY_COORDS).map(function(c){ return `<option value="${c}" ${c === cur ? 'selected' : ''}>${esc(t(c))}</option>`; }).join('')}</select></div>`);
    dsQiblaCity(cur);
    return r;
  };
})();

/* 3 · Pi requests & history: open your own Pi Wallet from here */
function dsOpenPiWallet(){
  const inPi = typeof Pi !== 'undefined' && /PiBrowser|; wv\)/i.test(navigator.userAgent);
  if(!inPi){ toast(t('Open DigitalSaudi in the Pi Browser to use your Pi Wallet.')); return; }
  try{ location.href = 'https://wallet.pinet.com'; }catch(e){ toast(t('Open the Wallet from the Pi Browser home screen.')); }
}
(function(){
  const _wt = walletTab;
  walletTab = function(tab){
    const r = _wt.apply(this, arguments);
    const b = $('wBody'); if(!b) return r;
    const note = tab === 'send'
      ? t('Sending Pi to a person happens in your own Pi Wallet — DigitalSaudi can never move your Pi. Tap below, then use Send / Pay.')
      : tab === 'req' ? t('Share your request; the payer sends from their own Pi Wallet. To see what you received, open your Pi Wallet.') : '';
    if(note) b.insertAdjacentHTML(tab === 'send' ? 'afterbegin' : 'beforeend', `<div class="ds-wallet"><p>${esc(note)}</p><button class="btn btn-primary" onclick="dsOpenPiWallet()">${ico('pi')}${esc(t('Open my Pi Wallet'))}</button></div>`);
    return r;
  };
})();

/* 4 · Map: pins that sit on top of each other are grouped into one numbered circle; tap to zoom in */
(function(){
  if(typeof drawMarkers !== 'function') return;
  function cluster(){
    const m = mapState.map; if(!m || !window.L || !mapState.layer) return;
    mapState.layer.clearLayers();
    if(mapState.me) L.marker(mapState.me, { icon:L.divIcon({ className:'', html:'<div class="me-dot"></div>', iconSize:[18, 18], iconAnchor:[9, 9] }) }).addTo(mapState.layer);
    if(HARAM[mapCity()] && !mapState.me) L.marker([HARAM[mapCity()][0], HARAM[mapCity()][1]], { icon:pinIcon('mosques'), zIndexOffset:1000 }).bindPopup('<b>' + HARAM[mapCity()][2] + '</b>').addTo(mapState.layer);
    const cell = 46, groups = {};
    mapState.list.forEach(function(p){
      const pt = m.latLngToLayerPoint([p.lat, p.lng]), key = Math.floor(pt.x / cell) + ':' + Math.floor(pt.y / cell);
      (groups[key] = groups[key] || []).push(p);
    });
    Object.keys(groups).forEach(function(k){
      const g = groups[k];
      if(g.length === 1 || m.getZoom() >= 18){
        g.forEach(function(p){ L.marker([p.lat, p.lng], { icon:pinIcon(p.cat) }).bindPopup(`<b>${esc(p.name)}</b><br><small>${esc(placeSub(p))}</small><br><a href="#" onclick="openPlace('${p.id}');return false">${esc(t('Details'))} ›</a>`).addTo(mapState.layer); });
        return;
      }
      const lat = g.reduce(function(s, p){ return s + p.lat; }, 0) / g.length, lng = g.reduce(function(s, p){ return s + p.lng; }, 0) / g.length;
      const c = pcat(g[0].cat === 'biz' ? 'all' : g[0].cat), size = g.length < 10 ? 38 : g.length < 50 ? 44 : 50;
      L.marker([lat, lng], { icon:L.divIcon({ className:'', html:`<div class="map-cl" style="--c:${c.c};width:${size}px;height:${size}px"><b>${g.length}</b></div>`, iconSize:[size, size], iconAnchor:[size / 2, size / 2] }) })
        .on('click', function(){ m.fitBounds(L.latLngBounds(g.map(function(p){ return [p.lat, p.lng]; })), { padding:[40, 40], maxZoom:18 }); }).addTo(mapState.layer);
    });
  }
  const _draw = drawMarkers;
  drawMarkers = function(center){
    const r = _draw.apply(this, arguments);
    const m = mapState.map; if(!m) return r;
    if(!m._dsCluster){ m._dsCluster = true; m.on('zoomend', cluster); }
    cluster();
    // say where the places come from, so people know they are real
    const info = $('mapInfo'); 
    return r;
  };
})();

/* words */
(function(){
  const R = [
    ['Pause','إيقاف مؤقت','روکیں','Jeda','Dakata','Pause'],
    ['Play all','تشغيل الكل','سب چلائیں','Putar semua','Kunna duka','Tout lire'],
    ['Tap ▶ again to play','اضغط ▶ مجدداً للتشغيل','چلانے کے لیے دوبارہ ▶ دبائیں','Ketuk ▶ lagi untuk memutar','Sake taɓa ▶ don kunnawa','Touchez ▶ à nouveau pour lire'],
    ['Audio could not play. Check your connection and try again.','تعذّر تشغيل الصوت. تحقّق من الاتصال وحاول مجدداً.','آڈیو نہیں چل سکی۔ کنکشن چیک کر کے دوبارہ کوشش کریں۔','Audio tidak dapat diputar. Periksa koneksi dan coba lagi.','Sauti bai kunna ba. Duba haɗin intanet ka sake gwadawa.','Le son n’a pas pu être lu. Vérifiez votre connexion et réessayez.'],
    ['Locating…','جارٍ تحديد الموقع…','مقام معلوم کیا جا رہا ہے…','Mencari lokasi…','Ana neman wuri…','Localisation…'],
    ['your location','موقعك','آپ کا مقام','lokasi Anda','wurinka','votre position'],
    ['Or pick your city','أو اختر مدينتك','یا اپنا شہر منتخب کریں','Atau pilih kota Anda','Ko zaɓi birninka','Ou choisissez votre ville'],
    ['Location is not available on this device. Pick your city instead.','الموقع غير متاح على هذا الجهاز. اختر مدينتك بدلاً من ذلك.','اس ڈیوائس پر مقام دستیاب نہیں۔ اپنا شہر منتخب کریں۔','Lokasi tidak tersedia di perangkat ini. Pilih kota Anda.','Ba a samun wuri a wannan na’ura. Zaɓi birninka.','La localisation n’est pas disponible. Choisissez votre ville.'],
    ['Location is taking too long. Showing the direction from your city — you can change it below.','تحديد الموقع يستغرق وقتاً طويلاً. نعرض الاتجاه من مدينتك — يمكنك تغييرها بالأسفل.','مقام معلوم کرنے میں دیر ہو رہی ہے۔ آپ کے شہر سے سمت دکھائی جا رہی ہے — نیچے بدل سکتے ہیں۔','Lokasi terlalu lama. Menampilkan arah dari kota Anda — bisa diubah di bawah.','Neman wuri yana ɗaukar lokaci. Ana nuna alƙibla daga birninka — za ka iya canza shi a ƙasa.','La localisation prend trop de temps. Direction depuis votre ville — modifiable ci-dessous.'],
    ['Location permission is off. Showing the direction from your city — you can change it below.','إذن الموقع متوقف. نعرض الاتجاه من مدينتك — يمكنك تغييرها بالأسفل.','مقام کی اجازت بند ہے۔ آپ کے شہر سے سمت دکھائی جا رہی ہے — نیچے بدل سکتے ہیں۔','Izin lokasi mati. Menampilkan arah dari kota Anda — bisa diubah di bawah.','An kashe izinin wuri. Ana nuna alƙibla daga birninka — za ka iya canza shi a ƙasa.','La localisation est désactivée. Direction depuis votre ville — modifiable ci-dessous.'],
    ['Could not get your location. Showing the direction from your city.','تعذّر تحديد موقعك. نعرض الاتجاه من مدينتك.','آپ کا مقام معلوم نہیں ہو سکا۔ آپ کے شہر سے سمت دکھائی جا رہی ہے۔','Lokasi tidak didapat. Menampilkan arah dari kota Anda.','An kasa samun wurinka. Ana nuna alƙibla daga birninka.','Position introuvable. Direction depuis votre ville.'],
    ['Open DigitalSaudi in the Pi Browser to use your Pi Wallet.','افتح DigitalSaudi في متصفح Pi لاستخدام محفظة Pi.','Pi Wallet استعمال کرنے کے لیے DigitalSaudi کو Pi Browser میں کھولیں۔','Buka DigitalSaudi di Pi Browser untuk memakai Pi Wallet.','Buɗe DigitalSaudi a Pi Browser don amfani da Pi Wallet.','Ouvrez DigitalSaudi dans le Pi Browser pour utiliser votre Pi Wallet.'],
    ['Open the Wallet from the Pi Browser home screen.','افتح المحفظة من الشاشة الرئيسية لمتصفح Pi.','Pi Browser کی ہوم اسکرین سے والٹ کھولیں۔','Buka Wallet dari layar utama Pi Browser.','Buɗe Wallet daga babban shafin Pi Browser.','Ouvrez le Wallet depuis l’accueil du Pi Browser.'],
    ['Sending Pi to a person happens in your own Pi Wallet — DigitalSaudi can never move your Pi. Tap below, then use Send / Pay.','إرسال Pi لشخص يتم من محفظتك الخاصة — لا يستطيع DigitalSaudi تحريك عملاتك أبداً. اضغط بالأسفل ثم استخدم إرسال / دفع.','کسی کو Pi بھیجنا آپ کے اپنے Pi Wallet میں ہوتا ہے — DigitalSaudi کبھی آپ کا Pi منتقل نہیں کر سکتا۔ نیچے دبائیں، پھر Send / Pay استعمال کریں۔','Mengirim Pi ke orang lain dilakukan di Pi Wallet Anda sendiri — DigitalSaudi tidak pernah bisa memindahkan Pi Anda. Ketuk di bawah, lalu gunakan Send / Pay.','Aika Pi ga mutum yana faruwa a Pi Wallet ɗinka — DigitalSaudi ba za ta taɓa motsa Pi ɗinka ba. Taɓa ƙasa, sannan yi amfani da Send / Pay.','L’envoi de Pi à une personne se fait dans votre propre Pi Wallet — DigitalSaudi ne peut jamais déplacer vos Pi. Touchez ci-dessous puis Send / Pay.'],
    ['Share your request; the payer sends from their own Pi Wallet. To see what you received, open your Pi Wallet.','شارك طلبك؛ يرسل الدافع من محفظته. لرؤية ما استلمته افتح محفظة Pi.','اپنی درخواست شیئر کریں؛ ادا کرنے والا اپنے Pi Wallet سے بھیجتا ہے۔ موصول رقم دیکھنے کے لیے اپنا Pi Wallet کھولیں۔','Bagikan permintaan Anda; pembayar mengirim dari Pi Wallet miliknya. Untuk melihat yang Anda terima, buka Pi Wallet.','Raba buƙatarka; mai biya zai aika daga Pi Wallet ɗinsa. Don ganin abin da ka karɓa, buɗe Pi Wallet ɗinka.','Partagez votre demande ; le payeur envoie depuis son Pi Wallet. Pour voir ce que vous avez reçu, ouvrez votre Pi Wallet.'],
    ['Open my Pi Wallet','افتح محفظة Pi','میرا Pi Wallet کھولیں','Buka Pi Wallet saya','Buɗe Pi Wallet ɗina','Ouvrir mon Pi Wallet'],
    ['Details','التفاصيل','تفصیلات','Detail','Bayani','Détails'],
    ['real places from OpenStreetMap','أماكن حقيقية من OpenStreetMap','OpenStreetMap سے حقیقی مقامات','tempat nyata dari OpenStreetMap','wurare na gaske daga OpenStreetMap','lieux réels d’OpenStreetMap']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* ==========================================================================
   v6.5 — Send and Request inside DigitalSaudi; the money moves in the Pi Wallet.
   Pi rules: an app can never hold, see or send someone's Pi. So DigitalSaudi prepares
   everything (who, how much, what for), checks it, copies it, and opens the Pi Wallet,
   where the person confirms with their own passphrase or fingerprint.
   ========================================================================== */
const DSW = {
  inPi: function(){ return typeof Pi !== 'undefined' && /PiBrowser|; wv\)/i.test(navigator.userAgent); },
  isAddr: function(s){ return /^G[A-Z2-7]{55}$/.test(s); },
  isUser: function(s){ return /^[A-Za-z0-9_.-]{2,40}$/.test(s); },
  contacts: function(){ return store.get('w_contacts_' + userKey(), []); },
  sent: function(){ return store.get('w_sent_' + userKey(), []); }
};
function dsCopy(text, done){
  const ok = function(){ if(done) done(true); };
  const fallback = function(){
    try{ const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('readonly', ''); ta.style.cssText = 'position:fixed;top:-100px;opacity:0'; document.body.appendChild(ta); ta.select(); const r = document.execCommand('copy'); ta.remove(); if(done) done(r); }catch(e){ if(done) done(false); }
  };
  try{ if(navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok).catch(fallback); else fallback(); }catch(e){ fallback(); }
}
/* read a scanned or pasted request: pay link, "Pay 2 π to @name — memo", @name or a G… address */
function dswParse(raw){
  raw = String(raw || '').trim(); const o = {};
  try{ const u = new URL(raw); if(/pay\.html$/.test(u.pathname) || u.searchParams.get('to')){ o.to = (u.searchParams.get('to') || '').replace(/^@/, ''); o.amt = u.searchParams.get('a') || ''; o.memo = u.searchParams.get('m') || u.searchParams.get('n') || ''; return o; } }catch(e){}
  let m = raw.match(/Pay\s+([\d.]+)\s*π\s+to\s+@?([A-Za-z0-9_.-]+|G[A-Z2-7]{55})(?:\s+—\s+(.+))?/i);
  if(m){ o.amt = m[1]; o.to = m[2]; o.memo = m[3] || ''; return o; }
  m = raw.match(/G[A-Z2-7]{55}/); if(m){ o.to = m[0]; return o; }
  m = raw.match(/^@?([A-Za-z0-9_.-]{2,40})$/); if(m){ o.to = m[1]; return o; }
  return null;
}

function dswSendHTML(pre){
  pre = pre || {};
  const cs = DSW.contacts().slice(0, 6), sent = DSW.sent().slice(0, 5);
  return `<div class="dsw">
    <div class="dsw-h"><b>${esc(t('Send Pi'))}</b><button class="btn btn-ghost btn-sm" onclick="dswScan()">${ico('image')}${esc(t('Scan QR'))}</button></div>
    <div class="field"><label>${esc(t('To — Pi username or wallet address'))}</label><input id="wsTo" value="${esc(pre.to || '')}" placeholder="@username or G…" autocomplete="off" autocapitalize="off" spellcheck="false" oninput="dswCheck()"></div>
    ${cs.length ? `<div class="chips dsw-cs">${cs.map(function(c){ return `<button onclick="$('wsTo').value='${esc(c)}';dswCheck()">${esc(DSW.isAddr(c) ? c.slice(0, 5) + '…' + c.slice(-4) : '@' + c)}</button>`; }).join('')}</div>` : ''}
    <div class="two"><div class="field"><label>${esc(t('Amount (π)'))}</label><input id="wsAmt" type="number" inputmode="decimal" step="0.0000001" min="0" value="${esc(pre.amt || '')}" placeholder="0.00" oninput="dswCheck()"></div>
      <div class="field"><label>${esc(t('For (memo)'))}</label><input id="wsMemo" maxlength="28" value="${esc(pre.memo || '')}" placeholder="${esc(t('e.g. Coffee'))}"></div></div>
    <div class="small" id="wsInfo" style="margin:-4px 0 10px"></div>
    <button class="btn btn-primary dsw-go" id="wsGo" onclick="dswSend()" disabled>${ico('pi')}${esc(t('Continue in Pi Wallet'))}</button>
    <p class="small dsw-safe">🔒 ${esc(t('DigitalSaudi never holds or moves your Pi. You confirm the transfer in your own Pi Wallet, and Pi transfers can’t be reversed.'))}</p>
  </div>
  ${sent.length ? `<h4>${esc(t('Recently prepared'))}</h4><div class="card hist">${sent.map(function(s){ return `<button class="h" onclick="walletTab('send');setTimeout(function(){ $('wsTo').value='${esc(s.to)}'; $('wsAmt').value='${esc(String(s.amt))}'; $('wsMemo').value='${esc(s.memo || '')}'; dswCheck(); },50)"><div><b>${esc(s.amt + ' π → ' + (DSW.isAddr(s.to) ? s.to.slice(0, 5) + '…' + s.to.slice(-4) : '@' + s.to))}</b><div class="small">${esc(s.memo || '')}${s.memo ? ' · ' : ''}${new Date(s.at).toLocaleString('en-GB', { day:'numeric', month:'short', hour:'2-digit', minute:'2-digit' })} · ${esc(t('confirm it in your Pi Wallet'))}</div></div><span class="chev">↻</span></button>`; }).join('')}</div>` : ''}`;
}
function dswCheck(){
  const to = ($('wsTo').value || '').trim().replace(/^@/, ''), amt = parseFloat($('wsAmt').value), info = $('wsInfo'), go = $('wsGo');
  let msg = '', ok = false;
  if(to && !DSW.isAddr(to) && !DSW.isUser(to)) msg = t(to[0] === 'G' && to.length > 20 ? 'A wallet address has 56 characters and starts with G.' : 'Check the username or address.');
  else if(to && !(amt > 0)) msg = t('Enter the amount to send.');
  else if(to && amt > 0){ ok = true; const s = convert(amt, 'PI', 'SAR'); msg = s ? '≈ ' + fmt(s, 2) + ' SAR' : ''; }
  info.textContent = msg; info.style.color = ok || !to ? '' : 'var(--danger)';
  go.disabled = !ok;
}
function dswSend(){
  const to = $('wsTo').value.trim().replace(/^@/, ''), amt = parseFloat($('wsAmt').value), memo = $('wsMemo').value.trim();
  if(!(to && amt > 0)) return;
  const c = DSW.contacts().filter(function(x){ return x !== to; }); c.unshift(to); store.set('w_contacts_' + userKey(), c.slice(0, 8));
  const s = DSW.sent(); s.unshift({ to:to, amt:amt, memo:memo, at:Date.now() }); store.set('w_sent_' + userKey(), s.slice(0, 20));
  dsCopy(to, function(){});
  const who = DSW.isAddr(to) ? to.slice(0, 6) + '…' + to.slice(-6) : '@' + to;
  const d = document.createElement('div'); d.className = 'ds-confirm'; d.setAttribute('role', 'dialog');
  d.innerHTML = `<div class="box dsw-sheet">
    <h4>${esc(t('Ready to send'))}</h4>
    <div class="dsw-sum"><div><small>${esc(t('To'))}</small><b class="notr">${esc(who)}</b><button onclick="dsCopy('${esc(to)}',function(o){toast(o?t('Copied'):'${esc(to)}')})">${esc(t('Copy'))}</button></div>
      <div><small>${esc(t('Amount'))}</small><b>${fmt(amt, 7).replace(/\.?0+$/, '')} π</b><button onclick="dsCopy('${amt}',function(o){toast(o?t('Copied'):'${amt}')})">${esc(t('Copy'))}</button></div>
      ${memo ? `<div><small>${esc(t('Memo'))}</small><b>${esc(memo)}</b><button onclick="dsCopy('${esc(memo).replace(/'/g, '&#39;')}',function(o){toast(o?t('Copied'):'')})">${esc(t('Copy'))}</button></div>` : ''}</div>
    <ol class="dsw-steps"><li>${esc(t('Tap “Open Pi Wallet” and unlock it.'))}</li><li>${esc(t('Tap Send / Pay and paste the receiver — we copied it for you.'))}</li><li>${esc(t('Enter the amount, check everything, then confirm.'))}</li></ol>
    <div class="row2"><button class="no">${esc(t('Close'))}</button><button class="yes dsw-open" onclick="dsOpenPiWallet()">${esc(t('Open Pi Wallet'))}</button></div></div>`;
  document.body.appendChild(d); requestAnimationFrame(function(){ d.classList.add('open'); });
  const close = function(){ d.classList.remove('open'); setTimeout(function(){ d.remove(); }, 220); };
  d.addEventListener('click', function(e){ if(e.target === d) close(); });
  d.querySelector('.no').onclick = close;
  toast(t('Receiver copied'));
}

/* scan a request QR with the camera (photo), then fill the form */
function dswScan(){
  let inp = $('dswFile');
  if(!inp){ inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/*'; inp.capture = 'environment'; inp.id = 'dswFile'; inp.style.display = 'none'; document.body.appendChild(inp);
    inp.onchange = function(){ const f = inp.files && inp.files[0]; inp.value = ''; if(f) dswDecode(f); }; }
  inp.click();
}
function dswDecode(file){
  toast(t('Reading the QR code…'));
  const fill = function(text){
    const o = dswParse(text);
    if(!o || !o.to){ toast(t('No Pi request found in this picture. Try again closer to the code.')); return; }
    walletTab('send');
    setTimeout(function(){ $('wsTo').value = o.to; if(o.amt) $('wsAmt').value = o.amt; if(o.memo) $('wsMemo').value = o.memo; dswCheck(); toast(t('Request filled in — check it, then continue')); }, 60);
  };
  const viaJsQR = function(bmp){
    loadScript('https://cdnjs.cloudflare.com/ajax/libs/jsQR/1.4.0/jsQR.min.js').then(function(){
      const c = document.createElement('canvas'), sc = Math.min(1, 1200 / Math.max(bmp.width, bmp.height));
      c.width = Math.round(bmp.width * sc); c.height = Math.round(bmp.height * sc);
      const g = c.getContext('2d'); g.drawImage(bmp, 0, 0, c.width, c.height);
      const r = window.jsQR(g.getImageData(0, 0, c.width, c.height).data, c.width, c.height);
      if(r && r.data) fill(r.data); else toast(t('No Pi request found in this picture. Try again closer to the code.'));
    }).catch(function(){ toast(t('The QR reader could not load. Check your connection.')); });
  };
  const img = new Image(); img.onload = function(){
    if('BarcodeDetector' in window){ try{ new BarcodeDetector({ formats:['qr_code'] }).detect(img).then(function(c){ if(c && c[0]) fill(c[0].rawValue); else viaJsQR(img); }).catch(function(){ viaJsQR(img); }); return; }catch(e){} }
    viaJsQR(img);
  };
  img.src = URL.createObjectURL(file);
}

/* the tabs: Send is now a real form; Request makes a link + QR anyone can open */
(function(){
  const _wt = walletTab;
  walletTab = function(tab){
    if(tab !== 'send') return _wt.apply(this, arguments);
    ['Req','Send','Hist'].forEach(function(k){ const b = $('wTab' + k); if(b) b.classList.toggle('on', k.toLowerCase() === 'send'); });
    const b = $('wBody'); if(!b) return;
    b.innerHTML = dswSendHTML(); dswCheck();
  };
  // Request: the QR now opens a payment page with the amount (cameras and the Pi Browser can open it)
  const _mr = makeRequest;
  makeRequest = function(){
    const r = _mr.apply(this, arguments);
    const to = ($('wrTo').value || '').trim().replace(/^@/, ''), amt = parseFloat($('wrAmt').value), memo = ($('wrMemo').value || '').trim();
    if(!to || !(amt > 0)) return r;
    const link = location.origin + '/pay.html?to=' + encodeURIComponent(to) + '&a=' + encodeURIComponent(amt) + (memo ? '&n=' + encodeURIComponent(memo) : '');
    const wait = setInterval(function(){
      const q = $('wrQR'); if(!q) return; if(!q.querySelector('img,canvas')) return; clearInterval(wait);
      if(!DSW.isAddr(to) && window.QRCode){ q.innerHTML = ''; new QRCode(q, { text:link, width:210, height:210, correctLevel:QRCode.CorrectLevel.M }); }
      const acts = q.parentNode.querySelector('.p-actions');
      if(acts && !acts.querySelector('.dsw-link')) acts.insertAdjacentHTML('beforeend', `<button class="btn btn-ghost btn-sm dsw-link" onclick="dsCopy('${esc(link)}',function(o){toast(o?t('Link copied'):'${esc(link)}')})">🔗 ${esc(t('Copy link'))}</button>`);
    }, 150);
    setTimeout(function(){ clearInterval(wait); }, 8000);
    return r;
  };
})();

(function(){
  const R = [
    ['Send Pi','إرسال Pi','Pi بھیجیں','Kirim Pi','Aika Pi','Envoyer des Pi'],
    ['Scan QR','مسح QR','QR اسکین کریں','Pindai QR','Duba QR','Scanner un QR'],
    ['To — Pi username or wallet address','إلى — اسم مستخدم Pi أو عنوان المحفظة','وصول کنندہ — Pi یوزرنیم یا والٹ ایڈریس','Ke — nama pengguna Pi atau alamat dompet','Zuwa — sunan Pi ko adireshin walat','À — nom Pi ou adresse de portefeuille'],
    ['Continue in Pi Wallet','المتابعة في محفظة Pi','Pi Wallet میں جاری رکھیں','Lanjutkan di Pi Wallet','Ci gaba a Pi Wallet','Continuer dans le Pi Wallet'],
    ['DigitalSaudi never holds or moves your Pi. You confirm the transfer in your own Pi Wallet, and Pi transfers can’t be reversed.','لا يحتفظ DigitalSaudi بعملات Pi ولا ينقلها أبداً. تؤكد التحويل في محفظتك، ولا يمكن استرجاع تحويلات Pi.','DigitalSaudi کبھی آپ کا Pi نہیں رکھتا نہ منتقل کرتا ہے۔ آپ اپنے Pi Wallet میں تصدیق کرتے ہیں، اور Pi کی منتقلی واپس نہیں ہوتی۔','DigitalSaudi tidak pernah menyimpan atau memindahkan Pi Anda. Anda mengonfirmasi di Pi Wallet sendiri, dan transfer Pi tidak bisa dibatalkan.','DigitalSaudi ba ta taɓa riƙe ko motsa Pi ɗinka ba. Kai ne ke tabbatarwa a Pi Wallet ɗinka, kuma ba a iya dawo da tura Pi.','DigitalSaudi ne détient ni ne déplace jamais vos Pi. Vous confirmez dans votre propre Pi Wallet, et les transferts Pi sont irréversibles.'],
    ['Recently prepared','أُعدّت مؤخراً','حال ہی میں تیار کردہ','Baru disiapkan','Waɗanda aka shirya kwanan nan','Préparés récemment'],
    ['confirm it in your Pi Wallet','أكّده في محفظة Pi','اپنے Pi Wallet میں تصدیق کریں','konfirmasi di Pi Wallet Anda','tabbatar a Pi Wallet ɗinka','à confirmer dans votre Pi Wallet'],
    ['A wallet address has 56 characters and starts with G.','عنوان المحفظة 56 حرفاً ويبدأ بحرف G.','والٹ ایڈریس 56 حروف کا ہوتا ہے اور G سے شروع ہوتا ہے۔','Alamat dompet terdiri dari 56 karakter dan diawali G.','Adireshin walat yana da haruffa 56 kuma yana farawa da G.','Une adresse compte 56 caractères et commence par G.'],
    ['Check the username or address.','تحقّق من اسم المستخدم أو العنوان.','یوزرنیم یا ایڈریس چیک کریں۔','Periksa nama pengguna atau alamat.','Duba sunan ko adireshin.','Vérifiez le nom ou l’adresse.'],
    ['Enter the amount to send.','أدخل المبلغ المراد إرساله.','بھیجنے کی رقم درج کریں۔','Masukkan jumlah yang dikirim.','Shigar da adadin da za a aika.','Saisissez le montant à envoyer.'],
    ['Ready to send','جاهز للإرسال','بھیجنے کے لیے تیار','Siap dikirim','A shirye don aikawa','Prêt à envoyer'],
    ['To','إلى','کو','Ke','Zuwa','À'], ['Amount','المبلغ','رقم','Jumlah','Adadi','Montant'], ['Memo','ملاحظة','میمو','Memo','Bayani','Mémo'],
    ['Copy','نسخ','کاپی','Salin','Kwafi','Copier'], ['Copied','تم النسخ','کاپی ہو گیا','Disalin','An kwafa','Copié'], ['Close','إغلاق','بند کریں','Tutup','Rufe','Fermer'],
    ['Tap “Open Pi Wallet” and unlock it.','اضغط «افتح محفظة Pi» وافتح القفل.','«Pi Wallet کھولیں» دبائیں اور اسے کھولیں۔','Ketuk “Buka Pi Wallet” lalu buka kuncinya.','Taɓa “Buɗe Pi Wallet” ka buɗe ta.','Touchez « Ouvrir le Pi Wallet » et déverrouillez-le.'],
    ['Tap Send / Pay and paste the receiver — we copied it for you.','اضغط إرسال / دفع والصق المستلم — نسخناه لك.','Send / Pay دبائیں اور وصول کنندہ پیسٹ کریں — ہم نے کاپی کر دیا ہے۔','Ketuk Send / Pay dan tempel penerima — sudah kami salin.','Taɓa Send / Pay ka liƙa mai karɓa — mun kwafa maka.','Touchez Send / Pay et collez le destinataire — nous l’avons copié.'],
    ['Enter the amount, check everything, then confirm.','أدخل المبلغ وتحقّق من كل شيء ثم أكّد.','رقم درج کریں، سب کچھ چیک کریں، پھر تصدیق کریں۔','Masukkan jumlah, periksa semuanya, lalu konfirmasi.','Shigar da adadi, duba komai, sannan ka tabbatar.','Saisissez le montant, vérifiez tout, puis confirmez.'],
    ['Open Pi Wallet','افتح محفظة Pi','Pi Wallet کھولیں','Buka Pi Wallet','Buɗe Pi Wallet','Ouvrir le Pi Wallet'],
    ['Receiver copied','تم نسخ المستلم','وصول کنندہ کاپی ہو گیا','Penerima disalin','An kwafa mai karɓa','Destinataire copié'],
    ['Reading the QR code…','جارٍ قراءة رمز QR…','QR کوڈ پڑھا جا رہا ہے…','Membaca kode QR…','Ana karanta lambar QR…','Lecture du QR code…'],
    ['No Pi request found in this picture. Try again closer to the code.','لم يُعثر على طلب Pi في الصورة. حاول مجدداً بالاقتراب من الرمز.','اس تصویر میں Pi درخواست نہیں ملی۔ کوڈ کے قریب سے دوبارہ کوشش کریں۔','Tidak ada permintaan Pi di gambar ini. Coba lagi lebih dekat ke kode.','Ba a sami buƙatar Pi a wannan hoton ba. Sake gwadawa kusa da lambar.','Aucune demande Pi trouvée. Réessayez plus près du code.'],
    ['Request filled in — check it, then continue','تمت تعبئة الطلب — تحقّق منه ثم تابع','درخواست بھر دی گئی — چیک کر کے جاری رکھیں','Permintaan terisi — periksa, lalu lanjutkan','An cike buƙatar — duba ta, sannan ci gaba','Demande remplie — vérifiez puis continuez'],
    ['The QR reader could not load. Check your connection.','تعذّر تحميل قارئ QR. تحقّق من الاتصال.','QR ریڈر لوڈ نہیں ہو سکا۔ کنکشن چیک کریں۔','Pembaca QR gagal dimuat. Periksa koneksi.','Mai karanta QR bai lodu ba. Duba haɗin intanet.','Le lecteur QR n’a pas pu se charger. Vérifiez votre connexion.'],
    ['Link copied','تم نسخ الرابط','لنک کاپی ہو گیا','Tautan disalin','An kwafa hanyar','Lien copié'],
    ['Copy link','نسخ الرابط','لنک کاپی کریں','Salin tautan','Kwafi hanyar','Copier le lien'],
    ['e.g. Coffee','مثلاً: قهوة','مثلاً: کافی','mis. Kopi','misali: Kofi','ex. Café']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* ==========================================================================
   v6.6 — App structure: every tab has one clear job and the most-used things first.
     Home     → Today: prayer, Pi price, quick actions, what's on, news
     Live     → News, scores, markets, weather, events (unchanged)
     Explore  → Places, cities, experiences, Saudi knowledge (shorter, swipe rows)
     Services → one group at a time: Islamic · Pi & money · Travel · Work · Government · Safety · Green
     Profile  → you, wallet & Premium, your saved things, settings (badges folded)
   Existing sections are moved, not rebuilt, so every feature keeps working.
   ========================================================================== */
const SVC_GROUPS = [
  ['islamic', 'Islamic', 'mosque', 'Prayer times, Quran, duas, Qibla, Hajj & Umrah'],
  ['money', 'Pi & money', 'coins', 'Pi wallet, currency, VAT, salary, Zakat'],
  ['travel', 'Travel & papers', 'luggage', 'Visas, documents, transport, good to know'],
  ['work', 'Work & life', 'briefcase', 'Jobs, CV, banking, housing, healthcare'],
  ['gov', 'Government', 'landmark', 'Absher, Nafath, Tawakkalna, Qiwa, Nusuk'],
  ['safety', 'Safety', 'shield', 'Emergency numbers, what to do, scams'],
  ['green', 'Green', 'leaf', 'Save water and power, recycling, climate']
];
function dsSvcShow(id, scroll){
  store.set('svcGroup', id);
  document.querySelectorAll('#svcChips button').forEach(function(b){ const on = b.dataset.g === id; b.classList.toggle('on', on); b.setAttribute('aria-selected', on ? 'true' : 'false'); if(on && scroll !== false) try{ b.scrollIntoView({ inline:'center', block:'nearest', behavior:'smooth' }); }catch(e){} });
  document.querySelectorAll('#tab-tools .svc-pane').forEach(function(p){ p.hidden = p.dataset.g !== id; });
  const g = SVC_GROUPS.find(function(x){ return x[0] === id; }), d = $('svcDesc'); if(d && g) d.textContent = t(g[3]);
  if(scroll !== false){ const tb = $('svcChips'); if(tb){ const top = tb.getBoundingClientRect().top; if(top < 0) tb.scrollIntoView({ block:'start' }); } }
}
function dsBadgesAll(){ const g = $('badgeGrid'); if(!g) return; const all = g.classList.toggle('all'); const b = $('bdgMore'); if(b) b.textContent = all ? t('Show fewer') : t('See all badges') + ' (' + (typeof BADGES !== 'undefined' ? BADGES.length : '') + ')'; }

(function(){
  let done = false;
  function move(el, into){ if(el && into) into.appendChild(el); }
  function headOf(el){ const h = el && el.previousElementSibling; return h && (h.tagName === 'H2' || h.classList.contains('sub')) ? h : null; }
  function sec(title, extra){ const h = document.createElement('h2'); h.className = 'sec ds-sec'; h.innerHTML = esc(t(title)) + (extra || ''); return h; }

  function home(){
    const T = $('tab-home'); if(!T) return;
    // find each block and its own heading by position (works in every language)
    const pair = function(el){ return el ? [headOf(el), el] : []; };
    const strip = T.querySelector(':scope > .now-strip'), prem = T.querySelector(':scope > button.row');
    const stripHead = headOf(strip);
    const order = [].concat([T.querySelector(':scope > .hero'), $('homeAlerts'), $('homeTrip'), $('jumpBack')],
      pair($('quickActions')), pair(strip), pair($('homeEvents')), pair($('homeNews')), [$('whyPromo')],
      pair($('dailyAyah')), pair($('forYou')), pair(prem));
    order.forEach(function(el){ if(el) T.appendChild(el); });
    if(stripHead){ const tn = [].slice.call(stripHead.childNodes).find(function(n){ return n.nodeType === 3 && n.nodeValue.trim(); }); if(tn) tn.nodeValue = t('Today'); }
    T.classList.add('ds-home');
  }

  function explore(){
    const T = $('tab-explore'); if(!T) return;
    ['trvCities', 'knowGrid'].forEach(function(id){ const g = $(id); if(g) g.classList.add('ds-swipe'); });
    // Businesses & Pi before the long reading lists
    const biz = $('expBiz'), bizH = headOf(biz), cities = $('trvCities'), citiesH = headOf(cities);
    if(biz && bizH && citiesH){ T.insertBefore(bizH, citiesH); T.insertBefore(biz, citiesH); }
    T.classList.add('ds-explore');
  }

  function services(){
    const T = $('tab-tools'); if(!T || $('svcChips')) return;
    const panes = {}; SVC_GROUPS.forEach(function(g){ const p = document.createElement('div'); p.className = 'svc-pane'; p.dataset.g = g[0]; p.hidden = true; panes[g[0]] = p; });
    const kids = [].slice.call(T.children);
    const hero = kids[0], times = kids[1];
    const take = function(id, pane, withHead){ const el = $(id); if(!el) return; const h = headOf(el); if(h) h.remove(); move(el, panes[pane]); };
    // Islamic
    move(hero, panes.islamic); move(times, panes.islamic);
    take('deenGrid', 'islamic'); take('deenEvents', 'islamic');
    // Pi & money
    const piRows = document.createElement('div'); piRows.className = 'ds-rows';
    piRows.innerHTML = [['piWallet', 'wallet'], ['business', 'briefcase'], ['piHub', 'pi'], ['merchantQR', 'image'], ['directory', 'store']].map(function(r){ const m = META[r[0]]; return m ? `<button class="row" onclick="openItem('${r[0]}')"><div class="ic">${ico(r[1])}</div><div class="tx"><b>${esc(t(m.t))}</b><small>${esc(t(m.s || ''))}</small></div><span class="chev">›</span></button>` : ''; }).join('');
    panes.money.appendChild(piRows);
    take('finGrid', 'money');
    // Travel & papers
    take('svcDocs', 'travel'); take('toolGrid', 'travel');
    const tips = $('trvTips'); if(tips){ const h = headOf(tips); if(h) h.remove(); panes.travel.appendChild(sec('Good to know')); move(tips, panes.travel); }
    // Work & life
    take('svcLife', 'work'); take('careerRows', 'work');
    // Government (keep the independence note)
    const gov = $('svcGov'); if(gov){ const note = gov.previousElementSibling, sub = note && note.previousElementSibling; if(sub && sub.classList.contains('sub')) sub.remove(); if(note && note.classList.contains('note')) move(note, panes.gov); move(gov, panes.gov); }
    // Safety & green
    take('safetyRows', 'safety'); take('svcGreen', 'green');
    const tip = $('greenTip'); if(tip) panes.green.insertBefore(tip, panes.green.firstChild);
    // leftovers: empty headings and sub-labels
    [].slice.call(T.children).forEach(function(el){ if((el.tagName === 'H2' || el.classList.contains('sub')) && !el.closest('.svc-pane')) el.remove(); });
    const lastNote = [].slice.call(T.children).filter(function(el){ return el.classList.contains('note'); }).pop();
    // header + chips
    const head = document.createElement('div'); head.className = 'svc-head';
    head.innerHTML = `<h1>${esc(t('Services'))}</h1><p id="svcDesc"></p>`;
    const chips = document.createElement('div'); chips.id = 'svcChips'; chips.className = 'svc-chips'; chips.setAttribute('role', 'tablist');
    chips.innerHTML = SVC_GROUPS.map(function(g){ return `<button role="tab" data-g="${g[0]}" onclick="dsSvcShow('${g[0]}')">${ico(g[2])}<span>${esc(t(g[1]))}</span></button>`; }).join('');
    T.insertBefore(chips, T.firstChild); T.insertBefore(head, chips);
    SVC_GROUPS.forEach(function(g){ T.insertBefore(panes[g[0]], lastNote || null); });
    if(lastNote) T.appendChild(lastNote);
    dsSvcShow(store.get('svcGroup', 'islamic'), false);
    T.classList.add('ds-svc');
  }

  function profile(){
    const T = $('tab-profile'); if(!T) return;
    const g = $('badgeGrid'); if(g && !$('bdgMore')){
      g.insertAdjacentHTML('afterend', `<button class="btn btn-ghost btn-sm" id="bdgMore" style="margin:10px auto 0" onclick="dsBadgesAll()">${esc(t('See all badges'))} (${typeof BADGES !== 'undefined' ? BADGES.length : ''})</button>`);
      // badges go after your saved things, just before the app settings
      const h = headOf(g), my = [].slice.call(T.querySelectorAll(':scope > h2.sec')).find(function(x){ return /^App$/.test(x.textContent.trim()) || x.textContent.trim() === t('App'); });
      if(h && my){ const btn = $('bdgMore'); T.insertBefore(h, my); T.insertBefore(g, my); T.insertBefore(btn, my); }
    }
    T.classList.add('ds-profile');
  }

  function run(){
    if(done) return; done = true;
    try{ home(); }catch(e){ log && log('home layout', e); }
    try{ explore(); }catch(e){}
    try{ services(); }catch(e){}
    try{ profile(); }catch(e){}
    try{ if(typeof trWalk === 'function' && LANG !== 'en') trWalk(document.getElementById('app')); }catch(e){}
  }
  const _enter = enterApp;
  enterApp = function(){ const r = _enter.apply(this, arguments); setTimeout(run, 0); return r; };
  // the bottom tab now says Services; the prayer box on Home opens the Islamic group
  try{ const nb = document.querySelector('[data-tab="tools"]'); if(nb){ const tn = [].slice.call(nb.childNodes).filter(function(n){ return n.nodeType === 3 && n.nodeValue.trim(); }).pop(); if(tn) tn.nodeValue = 'Services'; nb.setAttribute('aria-label', 'Services'); } }catch(e){}
  try{ const np = document.querySelector('.hp-np'); if(np) np.setAttribute('onclick', "event.stopPropagation();switchTab('tools');dsSvcShow('islamic',false)"); }catch(e){}
})();

(function(){
  const R = [
    ['Services','الخدمات','خدمات','Layanan','Ayyuka','Services'],
    ['Islamic','إسلامي','اسلامی','Islami','Musulunci','Islam'],
    ['Pi & money','Pi والمال','Pi اور رقم','Pi & uang','Pi da kuɗi','Pi et argent'],
    ['Travel & papers','السفر والوثائق','سفر اور دستاویزات','Perjalanan & dokumen','Tafiya da takardu','Voyage et papiers'],
    ['Work & life','العمل والحياة','کام اور زندگی','Kerja & kehidupan','Aiki da rayuwa','Travail et vie'],
    ['Government','الخدمات الحكومية','سرکاری خدمات','Pemerintah','Gwamnati','Administration'],
    ['Safety','السلامة','حفاظت','Keamanan','Tsaro','Sécurité'],
    ['Green','البيئة','ماحول','Hijau','Muhalli','Écologie'],
    ['Prayer times, Quran, duas, Qibla, Hajj & Umrah','أوقات الصلاة والقرآن والأدعية والقبلة والحج والعمرة','نماز کے اوقات، قرآن، دعائیں، قبلہ، حج و عمرہ','Waktu salat, Al-Qur’an, doa, kiblat, Haji & Umrah','Lokutan sallah, Alƙur’ani, addu’o’i, Alƙibla, Hajji da Umrah','Heures de prière, Coran, invocations, qibla, Hajj et Omra'],
    ['Pi wallet, currency, VAT, salary, Zakat','محفظة Pi والعملات والضريبة والراتب والزكاة','Pi والٹ، کرنسی، VAT، تنخواہ، زکوٰۃ','Dompet Pi, mata uang, PPN, gaji, zakat','Walat Pi, kuɗaɗe, VAT, albashi, Zakka','Portefeuille Pi, devises, TVA, salaire, zakat'],
    ['Visas, documents, transport, good to know','التأشيرات والوثائق والمواصلات ومعلومات مفيدة','ویزے، دستاویزات، ٹرانسپورٹ، مفید معلومات','Visa, dokumen, transportasi, info penting','Biza, takardu, sufuri, abubuwan sani','Visas, documents, transports, bon à savoir'],
    ['Jobs, CV, banking, housing, healthcare','الوظائف والسيرة الذاتية والبنوك والسكن والصحة','ملازمتیں، سی وی، بینکاری، رہائش، صحت','Kerja, CV, perbankan, perumahan, kesehatan','Aiki, CV, banki, gidaje, lafiya','Emploi, CV, banque, logement, santé'],
    ['Absher, Nafath, Tawakkalna, Qiwa, Nusuk','أبشر ونفاذ وتوكلنا وقوى ونسك','ابشر، نفاذ، توکلنا، قوی، نُسک','Absher, Nafath, Tawakkalna, Qiwa, Nusuk','Absher, Nafath, Tawakkalna, Qiwa, Nusuk','Absher, Nafath, Tawakkalna, Qiwa, Nusuk'],
    ['Emergency numbers, what to do, scams','أرقام الطوارئ وماذا تفعل والاحتيال','ایمرجنسی نمبر، کیا کریں، فراڈ','Nomor darurat, apa yang dilakukan, penipuan','Lambobin gaggawa, abin da za a yi, zamba','Numéros d’urgence, que faire, arnaques'],
    ['Save water and power, recycling, climate','وفّر الماء والكهرباء، إعادة التدوير، المناخ','پانی اور بجلی بچائیں، ری سائیکلنگ، موسمیات','Hemat air dan listrik, daur ulang, iklim','Tanadin ruwa da wuta, sake amfani, yanayi','Économiser eau et énergie, recyclage, climat'],
    ['Today','اليوم','آج','Hari ini','Yau','Aujourd’hui'],
    ['Good to know','معلومات مفيدة','جاننا مفید ہے','Perlu diketahui','Abin sani','Bon à savoir'],
    ['See all badges','عرض كل الشارات','تمام بیج دیکھیں','Lihat semua lencana','Duba duk lambobi','Voir tous les badges'],
    ['Show fewer','عرض أقل','کم دکھائیں','Tampilkan lebih sedikit','Nuna kaɗan','Afficher moins']
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(I18N[l] && !I18N[l][r[0]]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* ==========================================================================
   v6.9 — one share sheet for the whole app: WhatsApp, Telegram, Facebook, X,
   SMS, Email, Copy link and the phone's own share menu (with the image when the
   phone supports it). Pi Browser has no share menu of its own, so this always works.
   ========================================================================== */
(function(){
  const R = [
    ["Share","مشاركة","شیئر کریں","Bagikan","Raba","Partager"],
    ["Share image","مشاركة الصورة","تصویر شیئر کریں","Bagikan gambar","Raba hoto","Partager l’image"],
    ["Copy link","نسخ الرابط","لنک کاپی کریں","Salin tautan","Kwafi mahaɗa","Copier le lien"],
    ["Copy text","نسخ النص","متن کاپی کریں","Salin teks","Kwafi rubutu","Copier le texte"],
    ["More apps","تطبيقات أخرى","مزید ایپس","Aplikasi lain","Wasu manhajoji","Autres applis"],
    ["Save image","حفظ الصورة","تصویر محفوظ کریں","Simpan gambar","Ajiye hoto","Enregistrer l’image"],
    ["Email","البريد","ای میل","Email","Imel","E-mail"],
    ["Share receipt","مشاركة الإيصال","رسید شیئر کریں","Bagikan struk","Raba rasit","Partager le reçu"],
    ["Share to","مشاركة عبر","شیئر کریں بذریعہ","Bagikan ke","Raba ta","Partager via"],
    ["Copied","تم النسخ","کاپی ہو گیا","Disalin","An kwafa","Copié"],
    ["Close","إغلاق","بند کریں","Tutup","Rufe","Fermer"],
    ["accepts Pi","يقبل Pi","Pi قبول کرتا ہے","menerima Pi","yana karɓar Pi","accepte Pi"],
    ["Scan the code or open:","امسح الرمز أو افتح:","کوڈ اسکین کریں یا کھولیں:","Pindai kode atau buka:","Duba lambar ko buɗe:","Scannez le code ou ouvrez :"],
    ["Pay with Pi","ادفع بـ Pi","Pi سے ادائیگی کریں","Bayar dengan Pi","Biya da Pi","Payer en Pi"]
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1]) I18N[l][r[0]] = r[i + 1]; }); });
})();

const DSS_IC = {
  wa:'<path d="M12 3.2a8.7 8.7 0 0 0-7.5 13.1L3.3 20.8l4.6-1.2A8.7 8.7 0 1 0 12 3.2z" fill="none" stroke="#fff" stroke-width="1.7"/><path d="M9.1 7.9c.2-.4.4-.4.7-.4h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.4.8 1.6 2 2.6 2.4.2.1.4.1.5-.1l.6-.7c.2-.2.3-.2.6-.1l1.6.8c.2.1.4.2.4.4 0 .4-.1 1.1-.6 1.5-.5.4-1.4.7-2.6.3-1.6-.6-3.6-2.3-4.4-3.9-.7-1.3-.6-2.4-.6-2.6z" fill="#fff"/>',
  tg:'<path d="M19.6 5.2 3.9 11.3c-.7.3-.7 1.1 0 1.3l3.9 1.2 1.5 4.6c.2.6.9.7 1.3.3l2.2-2 3.9 2.9c.5.4 1.2.1 1.3-.5l2.6-12.8c.2-.8-.5-1.4-1.1-1.1z" fill="#fff"/><path d="m8 13.6 8.6-5.5-6.6 6.6-.3 3" fill="none" stroke="#229ED9" stroke-width="1.2"/>',
  fb:'<path d="M13.4 20v-6.6h2.3l.4-2.7h-2.7V9c0-.8.3-1.3 1.4-1.3h1.4V5.3c-.3 0-1.1-.1-2.1-.1-2.1 0-3.4 1.3-3.4 3.6v1.9H8.4v2.7h2.3V20z" fill="#fff"/>',
  x:'<path d="M5 5h3.6l3.6 4.9L16.4 5h2.2l-5.4 6.2L19.2 19h-3.6l-3.9-5.3L7 19H4.8l5.8-6.6z" fill="#fff"/>',
  sms:'<path d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v8A1.5 1.5 0 0 1 19 16.5H10l-4.5 3.2v-3.2H5A1.5 1.5 0 0 1 3.5 15V7A1.5 1.5 0 0 1 5 5.5z" fill="#fff"/><circle cx="8.5" cy="11" r="1" fill="#34C759"/><circle cx="12" cy="11" r="1" fill="#34C759"/><circle cx="15.5" cy="11" r="1" fill="#34C759"/>',
  mail:'<rect x="3.5" y="6" width="17" height="12" rx="2" fill="#fff"/><path d="m4.5 7.5 7.5 5.5 7.5-5.5" fill="none" stroke="#5F6B66" stroke-width="1.6"/>',
  copy:'<rect x="8.5" y="8.5" width="11" height="11" rx="2" fill="none" stroke="#fff" stroke-width="1.8"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5" fill="none" stroke="#fff" stroke-width="1.8"/>',
  more:'<circle cx="6" cy="12" r="1.8" fill="#fff"/><circle cx="12" cy="12" r="1.8" fill="#fff"/><circle cx="18" cy="12" r="1.8" fill="#fff"/>',
  img:'<rect x="4" y="5" width="16" height="14" rx="2.5" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="9" cy="10" r="1.6" fill="#fff"/><path d="m5 17 4.5-4.5 3 3 2.5-2.5L19 17" fill="none" stroke="#fff" stroke-width="1.8" stroke-linejoin="round"/>',
  save:'<path d="M12 4.5v10M7.5 10.5 12 15l4.5-4.5M5 19.5h14" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>'
};
function dsOpenExt(url){
  if(/^(sms|mailto):/.test(url)){ const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.rel = 'noopener'; a.style.display = 'none'; document.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 500); return; }
  try{ if(window.Pi && typeof window.Pi.openUrlInSystemBrowser === 'function'){ window.Pi.openUrlInSystemBrowser(url); return; } }catch(e){}
  window.open(url, '_blank', 'noopener');
}
function dsCloseShare(){
  const el = $('dss'); if(!el) return;
  el.classList.remove('open'); setTimeout(function(){ if(el.parentNode && !el.classList.contains('open')) el.remove(); }, 220);
}
/* o = { title, text, url, file?, onSave? } */
function dsShareSheet(o){
  dsCloseShare(); const old = $('dss'); if(old) old.remove();
  const url = o.url || '', text = o.text || o.title || '';
  const msg = url && text.indexOf(url) < 0 ? text + '\n' + url : text;
  const E = encodeURIComponent;
  const canFile = !!(o.file && navigator.canShare && (function(){ try{ return navigator.canShare({ files:[o.file] }); }catch(e){ return false; } })());
  const opts = [];
  if(canFile) opts.push(['img', t('Share image'), '#0A7A4B', function(){ navigator.share({ files:[o.file], title:o.title || '', text:msg }).catch(function(){}); }]);
  opts.push(['wa', 'WhatsApp', '#25D366', function(){ dsOpenExt('https://wa.me/?text=' + E(msg)); }]);
  opts.push(['tg', 'Telegram', '#229ED9', function(){ dsOpenExt('https://t.me/share/url?url=' + E(url || location.origin) + '&text=' + E(url ? text : msg)); }]);
  if(url) opts.push(['fb', 'Facebook', '#1877F2', function(){ dsOpenExt('https://www.facebook.com/sharer/sharer.php?u=' + E(url)); }]);
  opts.push(['x', 'X', '#111111', function(){ dsOpenExt('https://twitter.com/intent/tweet?text=' + E(url ? text : msg) + (url ? '&url=' + E(url) : '')); }]);
  opts.push(['sms', 'SMS', '#34C759', function(){ dsOpenExt('sms:?&body=' + E(msg)); }]);
  opts.push(['mail', t('Email'), '#5F6B66', function(){ dsOpenExt('mailto:?subject=' + E(o.title || 'DigitalSaudi') + '&body=' + E(msg)); }]);
  opts.push(['copy', t(url ? 'Copy link' : 'Copy text'), '#0F5434', function(){ const v = url || msg; if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(v).then(function(){ toast(t('Copied')); }, function(){ toast(v); }); else toast(v); }]);
  if(o.onSave) opts.push(['save', t('Save image'), '#946C0A', o.onSave]);
  if(navigator.share && !canFile) opts.push(['more', t('More apps'), '#6B7A72', function(){ navigator.share({ title:o.title || '', text:text, url:url || undefined }).catch(function(){}); }]);
  document.body.insertAdjacentHTML('beforeend', `<div class="dss" id="dss" role="dialog" aria-modal="true" aria-label="${esc(t('Share'))}">
    <div class="dss-box"><div class="dss-grab"></div>
      <div class="dss-h"><b>${esc(t('Share to'))}</b><button class="dss-x" onclick="dsCloseShare()" aria-label="${esc(t('Close'))}">✕</button></div>
      ${o.title ? `<p class="dss-t notr">${esc(o.title)}</p>` : ''}
      <div class="dss-g">${opts.map(function(x, i){ return `<button data-i="${i}"><span style="background:${x[2]}"><svg viewBox="0 0 24 24" aria-hidden="true">${DSS_IC[x[0]]}</svg></span><small>${esc(x[1])}</small></button>`; }).join('')}</div>
    </div></div>`);
  const el = $('dss');
  el.addEventListener('click', function(e){
    if(e.target === el) return dsCloseShare();
    const b = e.target.closest('button[data-i]'); if(!b) return;
    const f = opts[+b.dataset.i]; dsCloseShare(); if(f) f[3]();
  });
  requestAnimationFrame(function(){ el.classList.add('open'); });
}
document.addEventListener('keydown', function(e){ if(e.key === 'Escape' && $('dss')) dsCloseShare(); });

/* every Share button in the app now opens the sheet */
shareText = function(title, text, url){ dsShareSheet({ title:title, text:text, url:url }); };

/* poster: the sheet shares the image itself where the phone allows it, and always offers the pay link */
posterShare = function(){
  if(!POSTER_LAST) return;
  const text = POSTER_LAST.d.name + ' ' + t('accepts Pi') + ' — ' + t('Scan the code or open:');
  posterFile().then(function(blob){
    const f = blob && typeof File !== 'undefined' ? new File([blob], posterFileName(), { type:'image/png' }) : null;
    dsShareSheet({ title:POSTER_LAST.d.name + ' · ' + t('Pay with Pi'), text:text, url:POSTER_LAST.link, file:f, onSave:posterDownload });
  });
};

/* ==========================================================================
   v6.9 — Green Saudi: practical, checked knowledge (October 2026)
   Safety outdoors (floods, dust, heat) · rules & fines (NCVC) · camping ·
   your electricity bill · Saudi Green Initiative · how to report.
   Every figure below comes from the official or press source linked in the guide.
   ========================================================================== */
if(typeof EMOJI_ICON !== 'undefined'){ Object.assign(EMOJI_ICON, { '🌧️':'drop', '🌪️':'weather', '🌡️':'sun', '⚖️':'shield', '⛺':'dunes', '🧾':'receipt', '🌳':'leaf' }); }
const GR_CHECKED = 'October 2026';
function grSrc(list){
  return `<div class="g-src2"><b>${esc(t('Official sources'))}</b>${list.map(function(s){ return `<a href="${s[1]}" target="_blank" rel="noopener">${esc(s[0])} ↗</a>`; }).join('')}<small>${esc(t('Checked'))} ${GR_CHECKED} · ${esc(t('Rules and amounts can change — follow official instructions.'))}</small></div>`;
}
function grFine(rows){
  return `<div class="g-fines">${rows.map(function(r){ return `<div><span>${r[0]}</span><b class="notr" dir="ltr">${r[1]}</b></div>`; }).join('')}</div>`;
}
function grCall(list){
  return `<div class="g-calls">${list.map(function(c){ return `<a href="tel:${c[0]}"><b class="notr" dir="ltr">${c[0]}</b><small>${esc(t(c[1]))}</small></a>`; }).join('')}</div>`;
}
const GR_NUM = [['911','Emergency (Riyadh, Makkah, Eastern Province)'],['998','Civil Defence'],['997','Ambulance (Red Crescent)']];

const GR_GUIDES = {
  floodSafe:{ t:'Flash floods & heavy rain', ic:'🌧️', s:'Wadis, driving, what to do', body:function(){ return `
    <div class="g-alert">⚠️ <b>Never drive or walk into a flowing wadi.</b> Thirty centimetres of moving water can carry a car away.</div>
    <h4>Before the rain</h4><ul>
      <li>Watch the National Center for Meteorology (NCM) warnings and Civil Defence alerts, and turn on emergency alerts on your phone.</li>
      <li>Avoid camping or parking in valley beds (wadis) and low ground, even if the sky above you is clear. Rain far away can still flood the wadi.</li>
      <li>Clear roof drains and move valuables and cars off low ground.</li></ul>
    <h4>On the road</h4><ul>
      <li>If water covers the road, <b>turn around</b> and take another route or wait. Do not follow other cars through it.</li>
      <li>Slow down and leave a bigger gap after rain: roads are slippery and visibility drops.</li>
      <li>If your car stalls in rising water, leave it and move to higher ground.</li></ul>
    <h4>The law</h4>
    ${grFine([['Crossing valleys or flooded areas during rain (traffic violation)', 'up to SAR 10,000']])}
    <h4>In an emergency</h4>${grCall(GR_NUM)}
    ${grSrc([['Civil Defence safety instructions (Gulf News, Sep 2026)', 'https://gulfnews.com/world/gulf/saudi/saudi-arabia-issues-safety-alert-as-thunderstorms-threaten-most-regions-through-friday-1.500690095'], ['SAR 10,000 fine for crossing flooded valleys (Gulf News)', 'https://gulfnews.com/world/gulf/saudi/saudi-arabia-7-people-trapped-in-cars-during-rains-rescued-they-now-face-sr10000-fine-each-1.95387903'], ['National Center for Meteorology', 'https://ncm.gov.sa']])}`; } },

  dustSafe:{ t:'Dust & sandstorms', ic:'🌪️', s:'Driving, home and breathing', body:function(){ return `
    <div class="g-alert">🚗 <b>If you can hardly see, leave the road.</b> Signal, pull fully off the carriageway, stop and wait.</div>
    <h4>Driving</h4><ul>
      <li>Slow down early and double your following distance.</li>
      <li>Switch on dipped headlights. Don't use high beam, because it reflects off the dust.</li>
      <li>Don't overtake or change lanes suddenly.</li>
      <li>Clean the windscreen and lights before speeding up again.</li></ul>
    <h4>At home and outside</h4><ul>
      <li>Close windows and doors and set the AC to recirculate.</li>
      <li>Avoid outdoor exercise during the storm. Children, older people and anyone with asthma or breathing problems should stay inside.</li>
      <li>Outside, cover your nose and mouth with a mask or a damp cloth and protect your eyes.</li>
      <li>Follow NCM visibility warnings, which often come a day ahead.</li></ul>
    ${grSrc([['NCM visibility warnings (Gulf News, Jul 2025)', 'https://gulfnews.com/world/gulf/saudi/saudi-arabia-braces-for-week-long-dust-storms-ncm-issues-visibility-warning-1.500183592'], ['National Center for Meteorology', 'https://ncm.gov.sa']])}`; } },

  heatSafe:{ t:'Summer heat safety', ic:'🌡️', s:'Signs of heat illness & first aid', body:function(){ return `
    <div class="g-alert">☀️ <b>Avoid direct sun from 10 am to 4 pm</b> in summer, and drink water regularly even when you don't feel thirsty.</div>
    <h4>Prevent it</h4><ul>
      <li>Wear light, loose, light-coloured clothes and use an umbrella or hat.</li>
      <li>Don't walk on hot surfaces barefoot. Plan outdoor work and walks for early morning or after sunset.</li>
      <li><b>Never leave children or pets in a parked car</b>, not even for a few minutes.</li></ul>
    <h4>Heat exhaustion: warning signs</h4>
    <p>Heavy sweating, pale and cool skin, headache, dizziness or fainting, nausea or vomiting, muscle cramps, weakness and a weak pulse.</p>
    <h4>What to do</h4><ol>
      <li>Move the person to a cool, shaded place.</li>
      <li>Loosen their clothes.</li>
      <li>Put cold compresses on the neck and armpits and spray the body with water.</li>
      <li>Give cool water to drink if they are awake.</li></ol>
    <p><b>Get medical help</b> if they vomit, symptoms get worse or last more than an hour. If the person is confused, collapses or stops sweating with hot skin, call an ambulance straight away.</p>
    ${grCall([['997','Ambulance (Red Crescent)'],['911','Emergency (Riyadh, Makkah, Eastern Province)'],['937','Ministry of Health advice line']])}
    ${grSrc([['Ministry of Health — heat exhaustion first aid', 'https://www.moh.gov.sa/en/HealthAwareness/EducationalContent/Firstaid/Pages/012.aspx'], ['Ministry of Health — heat precautions (Jun 2025)', 'https://www.moh.gov.sa/en/ministry/mediacenter/news/pages/news-2025-06-3-001.aspx']])}`; } },

  envFines:{ t:'Environment rules & fines', ic:'⚖️', s:'Trees, firewood, parks, camping', body:function(){ return `
    <p>Saudi Arabia protects its trees, rangelands and national parks with strict fines. The amounts below are for a <b>first offence</b>; repeat offences cost more, and fines double for rare trees.</p>
    <h4>Trees and plants</h4>
    ${grFine([['Cutting, uprooting or selling a tree from vegetation land', 'SAR 10,000 per tree'], ['The same inside a protected reserve', 'SAR 20,000 per tree'], ['Cutting a shrub', 'SAR 3,000 per shrub'], ['Burning a tree or pouring diesel on it', 'SAR 10,000 per tree']])}
    <h4>Firewood and charcoal</h4>
    ${grFine([['Collecting, transporting, storing or selling local firewood or charcoal', 'SAR 5,000 per m³'], ['Using local firewood in a restaurant, kitchen or bakery', 'SAR 10,000 per m³']])}
    <p class="small">Buy licensed or imported charcoal and firewood instead.</p>
    <h4>Forests and national parks</h4>
    ${grFine([['Lighting a fire outside the designated areas', 'SAR 1,000'], ['Leaving, burying or burning rubbish', 'SAR 500'], ['Camping without a licence', 'SAR 500 per camp'], ['Damaging facilities, signs or fences', 'SAR 1,000'], ['Driving into protected meadows or floodplains', 'SAR 500 per vehicle']])}
    <p>Serious cases (harming trees in protected areas) can go to court, with up to <b>10 years in prison or a fine of up to SAR 30 million</b>.</p>
    <h4>Report a violation</h4>${grCall([['911','Riyadh, Makkah, Eastern Province'],['999','Other regions'],['996','Other regions']])}
    ${grSrc([['National Center for Vegetation Cover (NCVC) — violations and penalties', 'https://ncvc.gov.sa/en/digitalKnowledge/Violation/Pages/default.aspx'], ['How to report environmental violations (Arab News, Apr 2025)', 'https://www.arabnews.com/saudi-arabia/saudi-arabia-cracks-down-on-environmental-violators-2595835']])}`; } },

  campSafe:{ t:'Camping & desert trips', ic:'⛺', s:'Plan safely, leave no trace', body:function(){ return `
    <h4>Before you go</h4><ul>
      <li>Tell someone where you are going and when you'll be back.</li>
      <li>Take more water than you think you need (several litres per person per day), a full tank of fuel, a spare tyre, a charged power bank and an offline map.</li>
      <li>Check the weather. Don't set up camp in a wadi bed, because rain far away can flood it.</li>
      <li>Camping inside a forest or national park needs a licence. Use the official campsites.</li></ul>
    <h4>At the camp</h4><ul>
      <li>Light fires only where allowed, and only with licensed or imported charcoal or firewood. Collecting local wood or cutting trees is a serious offence.</li>
      <li>Put fires out completely with water and sand before you sleep or leave.</li>
      <li>Keep vehicles on existing tracks, not across meadows or plants.</li></ul>
    <h4>When you leave</h4><ul>
      <li>Take all your rubbish home or to a bin. Don't bury or burn it.</li>
      <li>Leave the place as you found it, or cleaner.</li></ul>
    ${grFine([['Camping in a forest or national park without a licence', 'SAR 500 per camp'], ['Fire outside designated areas', 'SAR 1,000'], ['Leaving or burning rubbish', 'SAR 500'], ['Local firewood', 'SAR 5,000 per m³']])}
    <p class="small">Amounts are for a first offence; see “Environment rules & fines” for more.</p>
    <h4>In an emergency</h4>${grCall(GR_NUM)}
    ${grSrc([['National Center for Vegetation Cover (NCVC) — violations and penalties', 'https://ncvc.gov.sa/en/digitalKnowledge/Violation/Pages/default.aspx']])}`; } },

  billGuide:{ t:'Your electricity bill explained', ic:'🧾', s:'Tariffs and how to pay less', body:function(){ return `
    <h4>What you pay (homes)</h4>
    ${grFine([['First 6,000 kWh in a month', '18 halalas per kWh'], ['Every kWh above 6,000', '30 halalas per kWh'], ['VAT on the bill', '15%']])}
    <p>So the last kWh of a very high summer bill costs about <b>67% more</b> than the first ones. Cutting the peak months saves the most.</p>
    <h4>Where the power goes</h4>
    <p>In Saudi homes, air conditioning is usually the largest part of the bill, especially from May to September.</p>
    <h4>Pay less</h4><ol>
      <li>Set the AC to 24°C and use the fan with it. Every degree lower makes the AC work harder.</li>
      <li>Clean AC filters every month in summer.</li>
      <li>Close curtains on sunny windows and seal gaps around doors and windows.</li>
      <li>Turn off the AC in empty rooms, and use a timer at night.</li>
      <li>When buying an AC or appliance, choose more stars on the Saudi energy label.</li>
      <li>Read your meter or bill in the SEC app each month, so a high bill is never a surprise.</li></ol>
    <button class="btn btn-primary" style="width:100%;margin-top:6px" onclick="openItem('energyCalc')">⚡ ${esc(t('Estimate my bill'))}</button>
    ${grSrc([['Residential tariffs unchanged (Saudi Gazette, Jun 2025)', 'https://saudigazette.com.sa/article/652853'], ['Saudi Electricity Company', 'https://www.se.com.sa']])}`; } },

  sgiGuide:{ t:'Saudi Green Initiative', ic:'🌳', s:'The national goals, in brief', body:function(){ return `
    <p>The Saudi Green Initiative (SGI) is the Kingdom's national plan for a greener future. Its main goals:</p>
    <div class="g-goals">
      <div><b>10 billion</b><span>trees planted across Saudi Arabia</span></div>
      <div><b>30%+</b><span>of land and sea protected</span></div>
      <div><b>50%</b><span>of electricity from renewables by 2030</span></div>
      <div><b>278 Mt</b><span>CO₂ cut each year by 2030</span></div>
      <div><b>2060</b><span>net-zero target</span></div></div>
    <h4>How you can take part</h4><ul>
      <li>Protect trees and plants: never cut or burn them, and use licensed charcoal.</li>
      <li>Save electricity and water at home; it lowers your bills too.</li>
      <li>Keep parks, beaches and the desert clean.</li>
      <li>Join volunteer planting and clean-up days in your city.</li></ul>
    ${grSrc([['Saudi Green Initiative — official fact sheet', 'https://sgi.gov.sa/media/v4pllu0w/about_saudi_green_initiative_factsheet_en.pdf'], ['Saudi Green Initiative', 'https://www.sgi.gov.sa']])}`; } }
};

Object.keys(GR_GUIDES).forEach(function(id){
  const g = GR_GUIDES[id];
  META[id] = { t:g.t, ic:g.ic, s:g.s };
  PANELS[id] = function(){ showPanel(g.t, g.body(), { id:id }); try{ greenUse(id); }catch(e){} };
});

/* the Green list, grouped so it reads at a glance */
greenRowsHTML = function(){
  const G = [
    ['Stay safe outdoors', ['floodSafe', 'dustSafe', 'heatSafe']],
    ['Rules & fines', ['envFines', 'campSafe']],
    ['Save at home', ['billGuide', 'energyCalc', 'waterCalc', 'recycle']],
    ['Learn', ['sgiGuide', 'carbonCalc', 'climateEdu', 'greenLiving', 'greenTech']]
  ];
  return G.map(function(g){ return `<div class="g-head">${esc(t(g[0]))}</div>` + g[1].map(rowHTML).join(''); }).join('');
};
try{ if($('svcGreen')) $('svcGreen').innerHTML = greenRowsHTML(); }catch(e){}
(function(){ const _al = applyLang; applyLang = function(){ const r = _al.apply(this, arguments); try{ if($('svcGreen')) $('svcGreen').innerHTML = greenRowsHTML(); }catch(e){} return r; }; })();

/* words in every language: titles, sections and short labels (long guide text is translated on first view) */
(function(){
  const R = [
    ["Stay safe outdoors","ابقَ آمناً في الخارج","باہر محفوظ رہیں","Tetap aman di luar","Ka kasance lafiya a waje","Restez en sécurité dehors"],
    ["Rules & fines","الأنظمة والغرامات","قوانین اور جرمانے","Aturan & denda","Dokoki & tara","Règles et amendes"],
    ["Save at home","وفّر في المنزل","گھر میں بچت کریں","Hemat di rumah","Yi tanadi a gida","Économiser à la maison"],
    ["Learn","تعلّم","سیکھیں","Belajar","Koyo","Apprendre"],
    ["Flash floods & heavy rain","السيول والأمطار الغزيرة","اچانک سیلاب اور تیز بارش","Banjir bandang & hujan lebat","Ambaliyar ruwa & ruwan sama mai yawa","Crues soudaines et fortes pluies"],
    ["Wadis, driving, what to do","الأودية، القيادة، وماذا تفعل","وادیاں، ڈرائیونگ، کیا کریں","Wadi, berkendara, apa yang harus dilakukan","Kwaruruka, tuƙi, abin da za a yi","Oueds, conduite, que faire"],
    ["Dust & sandstorms","الغبار والعواصف الرملية","گرد اور ریت کے طوفان","Debu & badai pasir","Ƙura & guguwar yashi","Poussière et tempêtes de sable"],
    ["Driving, home and breathing","القيادة والمنزل والتنفس","ڈرائیونگ، گھر اور سانس","Berkendara, rumah, dan pernapasan","Tuƙi, gida da numfashi","Conduite, maison et respiration"],
    ["Summer heat safety","السلامة من حرارة الصيف","گرمی سے حفاظت","Aman dari panas musim panas","Kariya daga zafin bazara","Se protéger de la chaleur"],
    ["Signs of heat illness & first aid","علامات الإجهاد الحراري والإسعافات الأولية","گرمی کی بیماری کی علامات اور ابتدائی طبی امداد","Tanda sakit akibat panas & P3K","Alamomin cutar zafi & taimakon farko","Signes du coup de chaleur et premiers secours"],
    ["Environment rules & fines","أنظمة البيئة والغرامات","ماحولیاتی قوانین اور جرمانے","Aturan & denda lingkungan","Dokokin muhalli & tara","Règles environnementales et amendes"],
    ["Trees, firewood, parks, camping","الأشجار والحطب والمتنزهات والتخييم","درخت، لکڑی، پارکس، کیمپنگ","Pohon, kayu bakar, taman, berkemah","Bishiyoyi, itacen wuta, wuraren shakatawa, sansani","Arbres, bois, parcs, camping"],
    ["Camping & desert trips","التخييم والرحلات البرية","کیمپنگ اور صحرائی سفر","Berkemah & perjalanan gurun","Sansani & tafiye-tafiyen hamada","Camping et sorties dans le désert"],
    ["Plan safely, leave no trace","خطط بأمان ولا تترك أثراً","محفوظ منصوبہ بندی، کوئی نشان نہ چھوڑیں","Rencanakan dengan aman, jangan tinggalkan jejak","Shirya lafiya, kar ka bar alama","Prévoir en sécurité, ne laisser aucune trace"],
    ["Your electricity bill explained","فاتورة الكهرباء ببساطة","آپ کا بجلی کا بل آسان الفاظ میں","Penjelasan tagihan listrik Anda","Bayanin kuɗin wutar lantarkinka","Votre facture d’électricité expliquée"],
    ["Tariffs and how to pay less","التعرفة وكيف تدفع أقل","نرخ اور کم ادائیگی کیسے کریں","Tarif dan cara membayar lebih sedikit","Farashi da yadda za ka biya ƙasa","Tarifs et comment payer moins"],
    ["Saudi Green Initiative","مبادرة السعودية الخضراء","سعودی گرین انیشی ایٹو","Inisiatif Hijau Saudi","Shirin Saudiyya Kore","Initiative verte saoudienne"],
    ["The national goals, in brief","الأهداف الوطنية باختصار","قومی اہداف، مختصراً","Tujuan nasional, singkatnya","Manufofin ƙasa, a taƙaice","Les objectifs nationaux, en bref"],
    ["Official sources","المصادر الرسمية","سرکاری ذرائع","Sumber resmi","Majiyoyin hukuma","Sources officielles"],
    ["Checked","تمت المراجعة","جانچا گیا","Diperiksa","An duba","Vérifié"],
    ["Rules and amounts can change — follow official instructions.","قد تتغير الأنظمة والمبالغ — اتبع التعليمات الرسمية.","قوانین اور رقوم بدل سکتی ہیں — سرکاری ہدایات پر عمل کریں۔","Aturan dan jumlah dapat berubah — ikuti petunjuk resmi.","Dokoki da adadi na iya canzawa — bi umarnin hukuma.","Les règles et montants peuvent changer — suivez les consignes officielles."],
    ["Estimate my bill","احسب فاتورتي","میرا بل اندازہ کریں","Perkirakan tagihan saya","Ƙididdige kuɗina","Estimer ma facture"],
    ["Emergency (Riyadh, Makkah, Eastern Province)","الطوارئ (الرياض، مكة، الشرقية)","ایمرجنسی (ریاض، مکہ، مشرقی صوبہ)","Darurat (Riyadh, Makkah, Provinsi Timur)","Gaggawa (Riyadh, Makkah, Lardin Gabas)","Urgences (Riyad, La Mecque, Province orientale)"],
    ["Civil Defence","الدفاع المدني","سول ڈیفنس","Pertahanan Sipil","Tsaron Farar Hula","Protection civile"],
    ["Ambulance (Red Crescent)","الإسعاف (الهلال الأحمر)","ایمبولینس (ہلال احمر)","Ambulans (Bulan Sabit Merah)","Motar asibiti (Red Crescent)","Ambulance (Croissant-Rouge)"],
    ["Ministry of Health advice line","خط استشارات وزارة الصحة","وزارت صحت ہیلپ لائن","Layanan konsultasi Kemenkes","Layin shawarar Ma’aikatar Lafiya","Ligne conseil du ministère de la Santé"],
    ["Riyadh, Makkah, Eastern Province","الرياض، مكة، الشرقية","ریاض، مکہ، مشرقی صوبہ","Riyadh, Makkah, Provinsi Timur","Riyadh, Makkah, Lardin Gabas","Riyad, La Mecque, Province orientale"],
    ["Other regions","المناطق الأخرى","دیگر علاقے","Wilayah lain","Sauran yankuna","Autres régions"]
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* ==========================================================================
   v7.0 — reasons to come back every day
   • "Your day" card on Home: streak + next milestone, Arabic phrase of the day
     (with audio) and a Saudi tip of the day — new every day.
   • Streak details screen (tap the streak in the header).
   • Invite friends: personal link, shared through the share sheet; friends who
     join and sign in with Pi are counted on the server (/referral), once each.
   ========================================================================== */
const DS_TIPS = [
  'The Saudi weekend is Friday and Saturday.',
  'Most government services for residents are in the Absher app: renew your iqama, check fines and book appointments.',
  'Umrah and the Rawdah visit in Madinah need a booking in the Nusuk app.',
  'VAT in Saudi Arabia is 15%.',
  'Saher speed cameras are everywhere. Traffic fines show up in Absher.',
  'Emergency in Riyadh, Makkah or the Eastern Province? Call 911.',
  'The Haramain high-speed train links Makkah, Jeddah (including the airport) and Madinah.',
  'Riyadh has a metro with six lines.',
  'Keep your iqama or passport with you; you may be asked for ID.',
  'In mosques and government offices, dress modestly: shoulders and knees covered is a safe rule.',
  'In summer, plan time outdoors before 10 am or after 4 pm.',
  'Mada is the national debit card network, and tap-to-pay works almost everywhere.',
  'Tipping isn’t required, but rounding up for good service is appreciated.',
  'Greet with “As-salamu alaykum”; the reply is “Wa alaykum as-salam”.',
  'During Ramadan daylight hours, avoid eating or drinking in public out of respect.',
  'The Tawakkalna app keeps your digital ID and documents on your phone.',
  'In summer keep water in the car and check your tyres: hot roads cause blowouts.',
  'The Saudi Riyal is fixed at 3.75 to the US dollar.',
  'A tourist eVisa lets you perform Umrah outside the Hajj season. Hajj itself needs a Hajj permit.',
  'Download offline maps before a desert trip: the phone signal can drop.',
  'When heavy rain is forecast, stay away from wadis, even if the sky above you is clear.',
  'Carry a refillable bottle: the Haramain have Zamzam water points.',
  'Always check the amount before you pay with Pi. Pi transfers can’t be reversed.',
  'Never share your Pi passphrase with anyone, not even someone who says they are support.',
  'Many shops stay open late in the evening, and evenings are the busiest time.',
  'Learn the Arabic numerals ٠١٢٣٤٥٦٧٨٩. They help with prices, buses and signs.',
  'Set the AC to 24°C and clean the filters monthly: lower bills in summer.',
  'Local firewood is protected. Buy licensed or imported charcoal for camping.'
];
const DS_MILESTONES = [3, 7, 14, 30, 60, 100];

function dsDayIndex(){ const d = ksaDate(); return Math.floor(Date.parse(d + 'T00:00:00Z') / 86400000); }
function dsPick(list, salt){ if(!list || !list.length) return null; return list[(dsDayIndex() * 7 + (salt || 0)) % list.length]; }
function dsStreak(){ return store.get('streak', { last:null, n:0, best:0 }); }
function dsNextMilestone(n){ for(let i = 0; i < DS_MILESTONES.length; i++) if(n < DS_MILESTONES[i]) return DS_MILESTONES[i]; return null; }

/* new streak badges (3, 7 and 30 already exist) */
[['streak14', '⭐', '14-day streak'], ['streak60', '💎', '60-day streak'], ['streak100', '👑', '100-day streak'],
 ['invite1', '🤝', 'First friend invited'], ['invite3', '🌟', '3 friends joined'], ['invite10', '🏆', '10 friends joined']].forEach(function(b){
  if(!BADGES.some(function(x){ return x.id === b[0]; })) BADGES.push({ id:b[0], ic:b[1], t:b[2] });
});
Object.assign(BADGE_HOW, {
  streak14:['Open the app 14 days in a row', null], streak60:['Open the app 60 days in a row', null], streak100:['Open the app 100 days in a row', null],
  invite1:['A friend joins with your invite link and signs in with Pi', "openItem('invite')"],
  invite3:['3 friends join with your invite link', "openItem('invite')"], invite10:['10 friends join with your invite link', "openItem('invite')"]
});
(function(){ const _u = updateStreak; updateStreak = function(){ const r = _u.apply(this, arguments); const s = dsStreak(); if(s.n >= 14) award('streak14'); if(s.n >= 60) award('streak60'); if(s.n >= 100) award('streak100'); try{ if($('dsDaily')) dsRenderDaily(); }catch(e){} return r; }; })();

/* ---------- "Your day" card ---------- */
function dsDailyHTML(){
  const s = dsStreak(), n = s.n || 1, next = dsNextMilestone(n), prev = DS_MILESTONES.filter(function(m){ return m <= n; }).pop() || 0;
  const pct = next ? Math.round((n - prev) / (next - prev) * 100) : 100;
  const ph = dsPick(typeof PHRASES !== 'undefined' ? PHRASES.filter(function(p){ return p && p[1] && p[0] && p[0].length < 40; }) : [], 3);
  const tip = dsPick(DS_TIPS, 0);
  const left = next ? next - n : 0;
  return `<button class="dd-streak" onclick="openItem('streakInfo')" aria-label="${esc(t('Your streak'))}">
      <span class="dd-fl">🔥</span><span class="dd-st"><b>${esc(t('{n}-day streak').replace('{n}', n))}</b>
      <small>${next ? esc(t('{n} more to the {m}-day badge').replace('{n}', left).replace('{m}', next)) : esc(t('Every milestone reached. Amazing!'))}</small>
      <i class="dd-bar"><i style="width:${pct}%"></i></i></span><span class="chev">›</span></button>
    ${ph ? `<div class="dd-row dd-ar"><div class="dd-lb">${esc(t('Arabic of the day'))}</div>
      <div class="dd-arw"><div><b class="notr" dir="rtl" lang="ar">${esc(ph[1])}</b><small class="notr">${esc(ph[2] || '')}</small><span>${esc(t(ph[0]))}</span></div>
      <button class="dd-play" onclick="playAr('${esc(ph[1]).replace(/'/g, '&#39;')}', this)" aria-label="${esc(t('Listen'))}">🔊</button></div></div>` : ''}
    <div class="dd-row"><div class="dd-lb">${esc(t('Tip of the day'))}</div><p>${esc(t(tip))}</p></div>
    <div class="dd-foot"><span>${esc(t('New word and tip tomorrow'))}</span><button onclick="openItem('invite')">🤝 ${esc(t('Invite friends'))}</button></div>`;
}
function dsRenderDaily(){
  let box = $('dsDaily');
  if(!box){
    const T = $('tab-home'), qa = $('quickActions'); if(!qa) return;
    if(T && !T.classList.contains('ds-home')){ setTimeout(dsRenderDaily, 200); return; }   // wait until Home is arranged
    qa.insertAdjacentHTML('afterend', `<h2 class="sec ds-sec" id="dsDailyH">${esc(t('Your day'))}</h2><div class="card dd" id="dsDaily"></div>`);
    box = $('dsDaily');
  } else { const h = $('dsDailyH'); if(h) h.textContent = t('Your day'); }
  box.innerHTML = dsDailyHTML();
}

/* ---------- streak details ---------- */
META.streakInfo = { t:'Your streak', ic:'🔥', s:'Open the app every day' };
PANELS.streakInfo = function(){
  const s = dsStreak(), n = s.n || 1;
  showPanel('Your streak', `<div class="dd-big"><div class="dd-fl2">🔥</div><b class="notr">${n}</b><span>${esc(t(n === 1 ? 'day in a row' : 'days in a row'))}</span><small>${esc(t('Best'))}: <span class="notr">${Math.max(s.best || 0, n)}</span></small></div>
    <h4>${esc(t('Milestones'))}</h4>
    <div class="dd-ms">${DS_MILESTONES.map(function(m){ const b = BADGES.find(function(x){ return x.id === 'streak' + m; }); const got = n >= m || (store.get(badgeKey(), []).indexOf('streak' + m) >= 0); return `<div class="${got ? 'on' : ''}"><span>${b ? b.ic : '🔥'}</span><b class="notr">${m}</b><small>${esc(t(got ? 'Done' : 'days'))}</small></div>`; }).join('')}</div>
    <h4>${esc(t('How it works'))}</h4>
    <ul><li>${esc(t('Open DigitalSaudi once a day to keep your streak.'))}</li><li>${esc(t('Miss a day and it starts again from 1.'))}</li><li>${esc(t('Each milestone unlocks a badge in your profile.'))}</li></ul>
    <button class="btn btn-primary" style="width:100%;margin-top:8px" onclick="openItem('invite')">🤝 ${esc(t('Invite friends to join you'))}</button>`, { id:'streakInfo', share:false });
};

/* ---------- invite friends ---------- */
function dsInviteLink(){ return location.origin + '/' + (piUser && piUser.username ? '?ref=' + encodeURIComponent(piUser.username) : ''); }
function dsInviteText(){ return t('Join me on DigitalSaudi: prayer times, Umrah guides, Saudi news, rates, places and Pi payments in one app. Open it in the Pi Browser:'); }
function dsInviteShare(){ dsShareSheet({ title:t('Invite friends'), text:dsInviteText(), url:dsInviteLink() }); }
META.invite = { t:'Invite friends', ic:'🤝', s:'Share DigitalSaudi, unlock badges' };
PANELS.invite = function(){
  const signed = !!(piUser && piUser.accessToken);
  showPanel('Invite friends', `<div class="dd-inv"><div class="dd-fl2">🤝</div><h3>${esc(t('Share DigitalSaudi with friends'))}</h3>
      <p>${esc(t('Friends who open your link and sign in with Pi are counted here.'))}</p><p class="dd-fun">${esc(t('Unlock badges at 1, 3 and 10 friends. Badges are just for fun: there are no Pi, cash or prize rewards.'))}</p></div>
    <div class="dd-cnt"><div><b id="invCount" class="notr">${signed ? '…' : '—'}</b><small>${esc(t('friends joined'))}</small></div><div id="invRecent" class="notr"></div></div>
    <div class="dd-link notr" dir="ltr">${esc(dsInviteLink())}</div>
    <button class="btn btn-primary" style="width:100%;margin-top:10px" onclick="dsInviteShare()">📤 ${esc(t('Share invite'))}</button>
    ${signed ? '' : `<p class="small" style="margin-top:12px;text-align:center">${esc(t('Sign in with Pi to get your personal link, so your friends are counted.'))}</p><button class="btn btn-ghost" style="width:100%;margin-top:6px" onclick="closePanel();piLogin()">π ${esc(t('Sign in with Pi'))}</button>`}
    <div class="dd-badges">${['invite1', 'invite3', 'invite10'].map(function(id){ const b = BADGES.find(function(x){ return x.id === id; }); const got = store.get(badgeKey(), []).indexOf(id) >= 0; return b ? `<div class="${got ? 'on' : ''}"><span>${b.ic}</span><small>${esc(t(b.t))}</small></div>` : ''; }).join('')}</div>`, { id:'invite', share:false });
  if(signed) dsInviteLoad();
};
function dsInviteLoad(){
  if(!(piUser && piUser.accessToken)) return;
  fetch('/referral', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ accessToken:piUser.accessToken, action:'mine' }) })
    .then(function(r){ return r.json(); })
    .then(function(d){
      if(!d || !d.ok) throw 0;
      store.set('inviteCount', d.count);
      if(d.count >= 1) award('invite1'); if(d.count >= 3) award('invite3'); if(d.count >= 10) award('invite10');
      if($('invCount')) $('invCount').textContent = d.count;
      if($('invRecent')) $('invRecent').textContent = (d.recent || []).map(function(u){ return '@' + u; }).join(' · ');
    })
    .catch(function(){ if($('invCount')) $('invCount').textContent = store.get('inviteCount', '—'); });
}
/* someone arrived through an invite link: credit the friend once they sign in with Pi */
(function(){
  try{
    const ref = new URLSearchParams(location.search).get('ref');
    if(ref && /^[A-Za-z0-9_.-]{2,40}$/.test(ref) && !store.get('lastUser', null) && !store.get('refDone', false)) store.set('refPending', ref);
    if(ref && history.replaceState) history.replaceState(null, '', location.pathname + location.hash);
  }catch(e){}
  const tryClaim = function(){
    const ref = store.get('refPending', null); if(!ref || !(piUser && piUser.accessToken)) return;
    if(piUser.username && piUser.username.toLowerCase() === String(ref).toLowerCase()){ store.set('refPending', null); return; }
    fetch('/referral', { method:'POST', headers:{ 'Content-Type':'application/json' }, body:JSON.stringify({ accessToken:piUser.accessToken, action:'claim', ref:ref }) })
      .then(function(r){ return r.json(); })
      .then(function(d){ if(d && d.ok){ store.set('refPending', null); store.set('refDone', true); if(d.counted) toast(t('Welcome! Your friend @{u} invited you.').replace('{u}', ref)); } })
      .catch(function(){});
  };
  let tries = 0; const iv = setInterval(function(){ tries++; tryClaim(); if(!store.get('refPending', null) || tries > 240) clearInterval(iv); }, 1500);
  // signed-in users: refresh the friend count (and badges) once a day
  setTimeout(function(){ if(piUser && piUser.accessToken && store.get('inviteChecked', '') !== ksaDate()){ store.set('inviteChecked', ksaDate()); dsInviteLoad(); } }, 8000);
})();

/* Home: draw the card once the Home layout is in place; the header streak opens the details */
(function(){
  const _e = enterApp;
  enterApp = function(){ const r = _e.apply(this, arguments); setTimeout(function(){ try{ dsRenderDaily(); }catch(e){} try{ const g = $('bdgMore'); if(g && !$('invRow')) g.insertAdjacentHTML('afterend', '<div id="invRow" style="margin-top:12px">' + rowHTML('invite') + '</div>'); }catch(e){} }, 60); return r; };
  const st = $('streakPill') && $('streakPill').closest('.hp-st');
  if(st){ st.setAttribute('role', 'button'); st.setAttribute('tabindex', '0'); st.classList.add('hp-stb'); st.addEventListener('click', function(e){ e.stopPropagation(); openItem('streakInfo'); }); }
  const _al = applyLang; applyLang = function(){ const r = _al.apply(this, arguments); try{ if($('dsDaily')) dsRenderDaily(); }catch(e){} return r; };
  // the profile gets an "Invite friends" row next to the badges
  const _rp = renderProfile; renderProfile = function(){ const r = _rp.apply(this, arguments); try{ const g = $('bdgMore'); if(g && !$('invRow')){ g.insertAdjacentHTML('afterend', '<div id="invRow" style="margin-top:12px">' + rowHTML('invite') + '</div>'); } }catch(e){} return r; };
})();

/* after making a poster: the free business listing is the natural next step */
(function(){
  const _mp = makePoster;
  makePoster = function(){ const r = _mp.apply(this, arguments);
    let n = 0; const iv = setInterval(function(){ n++; const row = document.querySelector('#poOut .row'); if(row){ row.classList.add('dd-cta'); clearInterval(iv); } if(n > 40) clearInterval(iv); }, 150);
    return r; };
})();

/* pop-ups with numbers or names in them, translated piece by piece */
(function(){
  const _t = toast;
  toast = function(msg){
    let m = String(msg), x;
    if(LANG !== 'en'){
      if((x = /^🏅 Badge unlocked: (.+)$/.exec(m))) m = '🏅 ' + t('Badge unlocked') + ': ' + t(x[1]);
      else if((x = /^🔥 (\d+)-day streak — welcome back!$/.exec(m))) m = '🔥 ' + t('{n}-day streak — welcome back!').replace('{n}', x[1]);
    }
    return _t(m);
  };
})();

/* words in every language */
(function(){
  const R = [
    ["Badge unlocked","حصلت على شارة","بیج حاصل ہوا","Lencana terbuka","An buɗe lamba","Badge débloqué"],
    ["{n}-day streak — welcome back!","{n} أيام متتالية — أهلاً بعودتك!","{n} دن کا تسلسل — خوش آمدید!","{n} hari berturut-turut — selamat datang kembali!","Kwana {n} a jere — barka da dawowa!","{n} jours d’affilée — bon retour !"],
    ["Your day","يومك","آپ کا دن","Hari Anda","Ranarka","Votre journée"],
    ["{n}-day streak","{n} أيام متتالية","{n} دن کا تسلسل","{n} hari berturut-turut","Kwana {n} a jere","{n} jours d’affilée"],
    ["{n} more to the {m}-day badge","بقي {n} للوصول إلى شارة {m} يوماً","{m} دن کے بیج تک مزید {n}","{n} lagi menuju lencana {m} hari","Saura {n} zuwa lambar kwanaki {m}","Encore {n} pour le badge {m} jours"],
    ["Every milestone reached. Amazing!","حققت كل المراحل. رائع!","تمام سنگ میل مکمل۔ زبردست!","Semua pencapaian tercapai. Luar biasa!","An kai duk matakai. Abin mamaki!","Toutes les étapes atteintes. Bravo !"],
    ["Arabic of the day","عبارة اليوم","آج کا عربی جملہ","Bahasa Arab hari ini","Larabcin yau","L’arabe du jour"],
    ["Tip of the day","نصيحة اليوم","آج کا مشورہ","Tips hari ini","Shawarar yau","Conseil du jour"],
    ["New word and tip tomorrow","عبارة ونصيحة جديدة غداً","کل نیا لفظ اور مشورہ","Kata dan tips baru besok","Sabuwar kalma da shawara gobe","Nouveau mot et conseil demain"],
    ["Invite friends","ادعُ أصدقاءك","دوستوں کو مدعو کریں","Undang teman","Gayyaci abokai","Inviter des amis"],
    ["Share DigitalSaudi, earn badges","شارك DigitalSaudi واربح الشارات","DigitalSaudi شیئر کریں، بیج حاصل کریں","Bagikan DigitalSaudi, dapatkan lencana","Raba DigitalSaudi, sami lambobi","Partagez DigitalSaudi, gagnez des badges"],
    ["Your streak","أيامك المتتالية","آپ کا تسلسل","Rangkaian Anda","Jerinka","Votre série"],
    ["Open the app every day","افتح التطبيق كل يوم","روزانہ ایپ کھولیں","Buka aplikasi setiap hari","Buɗe manhajar kowace rana","Ouvrez l’appli chaque jour"],
    ["day in a row","يوم متتالٍ","دن مسلسل","hari berturut-turut","rana a jere","jour d’affilée"],
    ["days in a row","أيام متتالية","دن مسلسل","hari berturut-turut","kwanaki a jere","jours d’affilée"],
    ["Milestones","المراحل","سنگ میل","Pencapaian","Matakai","Étapes"],
    ["How it works","كيف يعمل","یہ کیسے کام کرتا ہے","Cara kerjanya","Yadda yake aiki","Comment ça marche"],
    ["Open DigitalSaudi once a day to keep your streak.","افتح DigitalSaudi مرة يومياً للحفاظ على أيامك المتتالية.","اپنا تسلسل برقرار رکھنے کے لیے روزانہ ایک بار DigitalSaudi کھولیں۔","Buka DigitalSaudi sekali sehari untuk menjaga rangkaian Anda.","Buɗe DigitalSaudi sau ɗaya a rana don kiyaye jerinka.","Ouvrez DigitalSaudi une fois par jour pour garder votre série."],
    ["Miss a day and it starts again from 1.","إذا فاتك يوم تبدأ من جديد من 1.","ایک دن چھوٹ گیا تو دوبارہ 1 سے شروع ہوگا۔","Lewatkan sehari dan mulai lagi dari 1.","Idan ka rasa rana ɗaya, za ta fara daga 1.","Un jour manqué et elle repart de 1."],
    ["Each milestone unlocks a badge in your profile.","كل مرحلة تفتح شارة في ملفك.","ہر سنگ میل آپ کی پروفائل میں ایک بیج کھولتا ہے۔","Setiap pencapaian membuka lencana di profil Anda.","Kowane mataki yana buɗe lamba a bayananka.","Chaque étape débloque un badge dans votre profil."],
    ["Days follow Saudi time (midnight in Makkah).","الأيام بتوقيت السعودية (منتصف الليل في مكة).","دن سعودی وقت کے مطابق ہیں (مکہ میں آدھی رات)۔","Hari mengikuti waktu Saudi (tengah malam di Makkah).","Kwanaki suna bin lokacin Saudiyya (tsakar dare a Makkah).","Les jours suivent l’heure saoudienne (minuit à La Mecque)."],
    ["Invite friends to join you","ادعُ أصدقاءك للانضمام","دوستوں کو ساتھ شامل ہونے کی دعوت دیں","Undang teman untuk bergabung","Gayyaci abokai su shiga","Invitez vos amis à vous rejoindre"],
    ["Share DigitalSaudi with friends","شارك DigitalSaudi مع أصدقائك","DigitalSaudi دوستوں کے ساتھ شیئر کریں","Bagikan DigitalSaudi dengan teman","Raba DigitalSaudi da abokai","Partagez DigitalSaudi avec vos amis"],
    ["Friends who open your link and sign in with Pi are counted here.","يُحتسب هنا الأصدقاء الذين يفتحون رابطك ويسجلون الدخول عبر Pi.","جو دوست آپ کا لنک کھول کر Pi سے سائن اِن کریں وہ یہاں شمار ہوتے ہیں۔","Teman yang membuka tautan Anda dan masuk dengan Pi dihitung di sini.","Abokan da suka buɗe mahaɗarka suka shiga da Pi ana ƙirga su a nan.","Les amis qui ouvrent votre lien et se connectent avec Pi sont comptés ici."],
    ["_unused_","يُحتسب هنا الأصدقاء الذين يفتحون رابطك ويسجلون الدخول عبر Pi. اربح شارات عند 1 و3 و10 أصدقاء.","جو دوست آپ کا لنک کھول کر Pi سے سائن اِن کریں وہ یہاں شمار ہوتے ہیں۔ 1، 3 اور 10 دوستوں پر بیج حاصل کریں۔","Teman yang membuka tautan Anda dan masuk dengan Pi dihitung di sini. Dapatkan lencana di 1, 3, dan 10 teman.","Abokan da suka buɗe mahaɗarka suka shiga da Pi ana ƙirga su a nan. Sami lambobi a abokai 1, 3 da 10.","Les amis qui ouvrent votre lien et se connectent avec Pi sont comptés ici. Badges à 1, 3 et 10 amis."],
    ["friends joined","أصدقاء انضموا","دوست شامل ہوئے","teman bergabung","abokan da suka shiga","amis inscrits"],
    ["Share invite","شارك الدعوة","دعوت شیئر کریں","Bagikan undangan","Raba gayyata","Partager l’invitation"],
    ["Sign in with Pi to get your personal link, so your friends are counted.","سجّل الدخول عبر Pi لتحصل على رابطك الخاص ويُحتسب أصدقاؤك.","اپنا ذاتی لنک حاصل کرنے کے لیے Pi سے سائن اِن کریں تاکہ آپ کے دوست شمار ہوں۔","Masuk dengan Pi untuk mendapatkan tautan pribadi agar teman Anda dihitung.","Shiga da Pi don samun mahaɗarka ta kanka, don a ƙirga abokanka.","Connectez-vous avec Pi pour obtenir votre lien personnel et faire compter vos amis."],
    ["Join me on DigitalSaudi: prayer times, Umrah guides, Saudi news, rates, places and Pi payments in one app. Open it in the Pi Browser:","انضم إليّ في DigitalSaudi: مواقيت الصلاة وأدلة العمرة وأخبار السعودية والأسعار والأماكن ومدفوعات Pi في تطبيق واحد. افتحه في متصفح Pi:","DigitalSaudi پر میرے ساتھ شامل ہوں: نماز کے اوقات، عمرہ گائیڈز، سعودی خبریں، ریٹس، مقامات اور Pi ادائیگیاں ایک ایپ میں۔ اسے Pi Browser میں کھولیں:","Bergabunglah dengan saya di DigitalSaudi: jadwal salat, panduan Umrah, berita Saudi, kurs, tempat, dan pembayaran Pi dalam satu aplikasi. Buka di Pi Browser:","Ka biyo ni a DigitalSaudi: lokutan sallah, jagororin Umrah, labaran Saudiyya, farashi, wurare da biyan Pi a manhaja ɗaya. Buɗe ta a Pi Browser:","Rejoignez-moi sur DigitalSaudi : heures de prière, guides Omra, actualités saoudiennes, taux, lieux et paiements Pi dans une seule appli. Ouvrez-la dans le Pi Browser :"],
    ["Welcome! Your friend @{u} invited you.","أهلاً بك! دعاك صديقك ‎@{u}‎.","خوش آمدید! آپ کے دوست @{u} نے آپ کو مدعو کیا۔","Selamat datang! Teman Anda @{u} mengundang Anda.","Barka da zuwa! Abokinka @{u} ne ya gayyace ka.","Bienvenue ! Votre ami @{u} vous a invité."],
    ["Listen","استمع","سنیں","Dengarkan","Saurara","Écouter"],
    ["Done","تم","مکمل","Selesai","An gama","Fait"],
    ["14-day streak","14 يوماً متتالية","14 دن مسلسل","14 hari berturut-turut","Kwana 14 a jere","14 jours d’affilée"],
    ["60-day streak","60 يوماً متتالية","60 دن مسلسل","60 hari berturut-turut","Kwana 60 a jere","60 jours d’affilée"],
    ["100-day streak","100 يوم متتالٍ","100 دن مسلسل","100 hari berturut-turut","Kwana 100 a jere","100 jours d’affilée"],
    ["First friend invited","أول صديق مدعو","پہلا دوست مدعو","Teman pertama diundang","Aboki na farko da aka gayyata","Premier ami invité"],
    ["3 friends joined","انضم 3 أصدقاء","3 دوست شامل","3 teman bergabung","Abokai 3 sun shiga","3 amis inscrits"],
    ["10 friends joined","انضم 10 أصدقاء","10 دوست شامل","10 teman bergabung","Abokai 10 sun shiga","10 amis inscrits"]
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* ==========================================================================
   v7.1 — automatic price alerts
   • Pi price above / below a target (USD or SAR)
   • Pi big move in 24 h (3%, 5% or 10%)
   • Currency targets: 1 SAR in USD, EUR, PKR, INR, EGP… above / below a value
   • Daily price summary (once a day, after 8 am Saudi time)
   Checked automatically every 2 minutes while DigitalSaudi is open and every
   time it is opened again. Alerts go to the 🔔 inbox, as a pop-up and — when
   the phone allows it — as a phone notification. Information only, not advice.
   ========================================================================== */
const PA_CURS = ['USD', 'EUR', 'GBP', 'AED', 'EGP', 'PKR', 'INR', 'IDR', 'BDT', 'PHP', 'GHS', 'XOF'];
function paCfg(){ return Object.assign({ move:5, daily:true, list:[] }, store.get('priceAlerts', {})); }
function paSave(c){ store.set('priceAlerts', c); }
function paPi(){ return store.get('pi', null); }
function paFx(){ return store.get('fx', null); }
function paNow(a){
  if(a.k === 'pi'){ const p = paPi(); if(!p || !p.usd) return null; return a.u === 'SAR' ? (p.sar || p.usd * 3.75) : p.usd; }
  const fx = paFx(); return fx && fx.rates && fx.rates[a.c] ? fx.rates[a.c] : null;
}
function paLabel(a){
  const v = a.k === 'pi' ? (a.u === 'SAR' ? fmt(a.v, 4) + ' SAR' : '$' + fmt(a.v, 4)) : fmt(a.v, a.v < 10 ? 4 : 2) + ' ' + a.c;
  return (a.k === 'pi' ? t('Pi price') : '1 SAR → ' + a.c) + ' ' + t(a.d === 'up' ? 'rises above' : 'falls below') + ' ' + v;
}

/* the 5% rule already built into the inbox now follows the chosen setting */
(function(){
  const _n = notify;
  notify = function(type, key){ if(type === 'pi' && /^pi_\d{4}-/.test(String(key))) return; return _n.apply(this, arguments); };
})();

function paCheck(){
  const c = paCfg(), p = paPi(), fx = paFx(), today = ksaDate();
  let changed = false;
  // targets
  c.list.forEach(function(a){
    if(a.done) return;
    const now = paNow(a); if(now == null) return;
    if((a.d === 'up' && now >= a.v) || (a.d === 'down' && now <= a.v)){
      a.done = Date.now(); changed = true;
      const nowTxt = a.k === 'pi' ? (a.u === 'SAR' ? fmt(now, 4) + ' SAR' : '$' + fmt(now, 4)) : fmt(now, now < 10 ? 4 : 2) + ' ' + a.c;
      notify('pi', 'pa_' + a.id + '_' + a.done, a.k === 'pi' ? 'π' : '💱', t('Price alert') + ': ' + paLabel(a), t('Now') + ' ' + nowTxt + ' · ' + t('Tap to see the markets.'), 'live:markets');
    }
  });
  // big move
  if(c.move && p && p.change != null && Math.abs(p.change) >= c.move){
    const up = p.change > 0;
    notify('pi', 'pamove_' + today + '_' + c.move + '_' + (up ? 'u' : 'd'), up ? '📈' : '📉',
      t(up ? 'Pi is up {p}% in 24 hours' : 'Pi is down {p}% in 24 hours').replace('{p}', Math.abs(p.change).toFixed(1)),
      '$' + fmt(p.usd, 4) + ' · ≈ ' + fmt(p.sar || p.usd * 3.75, 4) + ' SAR', 'live:markets');
  }
  // daily summary (after 8 am Saudi time)
  const hr = +new Intl.DateTimeFormat('en-GB', { timeZone:'Asia/Riyadh', hour:'2-digit', hour12:false }).format(new Date());
  if(c.daily && hr >= 8 && p && p.usd){
    const home = store.get('homeCur', 'USD'), r = fx && fx.rates && fx.rates[home];
    const ch = p.change != null ? ' (' + (p.change >= 0 ? '+' : '') + (+p.change).toFixed(1) + '%)' : '';
    notify('pi', 'padaily_' + today, '☀️', t('Today’s prices'), 'Pi $' + fmt(p.usd, 4) + ch + (r ? ' · 1 SAR = ' + fmt(r, r < 10 ? 4 : 2) + ' ' + home : ''), 'live:markets');
  }
  if(changed) paSave(c);
}
function paTick(){
  if(document.visibilityState === 'hidden') return;
  Promise.all([loadPi(), loadFx()]).then(paCheck, paCheck);
}
setInterval(paTick, 120000);
document.addEventListener('visibilitychange', function(){ if(document.visibilityState === 'visible') setTimeout(paTick, 1500); });
setTimeout(paTick, 6000);

/* ---------- the Price alerts screen ---------- */
META.priceAlerts = { t:'Price alerts', ic:'🔔', s:'Pi and currency rates, automatically' };
PANELS.priceAlerts = function(){
  const c = paCfg(), p = paPi(), fx = paFx(), home = store.get('homeCur', 'USD');
  const perm = 'Notification' in window ? Notification.permission : 'unsupported';
  const piNow = p && p.usd ? '$' + fmt(p.usd, 4) + ' · ≈ ' + fmt(p.sar || p.usd * 3.75, 4) + ' SAR' : t('Price unavailable right now');
  const list = c.list.length ? c.list.map(function(a){ const now = paNow(a);
      return `<div class="pa-it ${a.done ? 'done' : ''}"><span>${a.k === 'pi' ? 'π' : '💱'}</span><div><b>${esc(paLabel(a))}</b><small>${a.done ? esc(t('Alert sent')) + ' · <button onclick="paRearm(\'' + a.id + '\')">' + esc(t('Turn on again')) + '</button>' : esc(t('Now')) + ' ' + (now == null ? '—' : fmt(now, now < 10 ? 4 : 2))}</small></div><button class="pa-del" onclick="paDel('${a.id}')" aria-label="${esc(t('Delete'))}">✕</button></div>`; }).join('')
    : `<p class="small" style="text-align:center;padding:8px 0">${esc(t('No alerts yet. Add your first one below.'))}</p>`;
  showPanel('Price alerts', `
    <div class="pa-now"><div><small>${esc(t('Pi now'))}</small><b class="notr" dir="ltr">${piNow}</b></div>${fx && fx.rates && fx.rates[home] ? `<div><small>1 SAR</small><b class="notr" dir="ltr">${fmt(fx.rates[home], fx.rates[home] < 10 ? 4 : 2)} ${home}</b></div>` : ''}</div>
    <h4>${esc(t('Your alerts'))}</h4><div class="pa-list">${list}</div>
    <h4>${esc(t('Add an alert'))}</h4>
    <div class="pa-form">
      <div class="seg pa-seg" role="tablist"><button class="on" data-k="pi" onclick="paKind('pi',this)">π Pi</button><button data-k="fx" onclick="paKind('fx',this)">💱 ${esc(t('Currency'))}</button></div>
      <div class="pa-row"><select id="paDir" aria-label="${esc(t('When'))}"><option value="up">${esc(t('Rises above'))}</option><option value="down">${esc(t('Falls below'))}</option></select>
        <input id="paVal" type="number" inputmode="decimal" step="any" min="0" placeholder="${p && p.usd ? fmt(p.usd, 4) : '0.25'}" aria-label="${esc(t('Price'))}">
        <select id="paUnit" aria-label="${esc(t('Unit'))}"><option value="USD">USD</option><option value="SAR">SAR</option></select>
        <select id="paCur" aria-label="${esc(t('Currency'))}" style="display:none">${PA_CURS.map(function(x){ return `<option value="${x}" ${x === home ? 'selected' : ''}>1 SAR → ${x}</option>`; }).join('')}</select></div>
      <button class="btn btn-primary" style="width:100%" onclick="paAdd()">＋ ${esc(t('Add alert'))}</button>
    </div>
    <h4>${esc(t('Automatic alerts'))}</h4>
    <div class="setting"><div><b>${esc(t('Big Pi price move'))}</b><div class="small">${esc(t('When Pi moves this much in 24 hours'))}</div></div>
      <select id="paMove" onchange="paSetMove(this.value)">${[[0, t('Off')], [3, '3%'], [5, '5%'], [10, '10%']].map(function(o){ return `<option value="${o[0]}" ${+c.move === o[0] ? 'selected' : ''}>${esc(o[1])}</option>`; }).join('')}</select></div>
    <div class="setting"><div><b>${esc(t('Daily price summary'))}</b><div class="small">${esc(t('Pi and your currency, once a day after 8 am'))}</div></div><button class="toggle ${c.daily ? 'on' : ''}" onclick="paSetDaily(this)"></button></div>
    <div class="setting"><div><b>${esc(t('My currency'))}</b><div class="small">${esc(t('Used in the daily summary'))}</div></div><select onchange="store.set('homeCur',this.value);openItem('priceAlerts')">${PA_CURS.map(function(x){ return `<option ${x === home ? 'selected' : ''}>${x}</option>`; }).join('')}</select></div>
    <div class="pa-phone"><b>${esc(t('Phone notifications'))}</b><p>${esc(t(perm === 'granted' ? 'On. Alerts also appear in your phone’s notification bar while DigitalSaudi is open.' : perm === 'denied' ? 'Blocked in this browser’s settings. Alerts still appear in the app and in your inbox.' : perm === 'unsupported' ? 'This browser can’t show phone notifications. Alerts still appear in the app and in your inbox.' : 'Allow them to see alerts in your phone’s notification bar.'))}</p>
      ${perm === 'default' ? `<button class="btn btn-ghost btn-sm" onclick="Notification.requestPermission().then(function(){openItem('priceAlerts')})">🔔 ${esc(t('Allow notifications'))}</button>` : ''}</div>
    <p class="small pa-note">${esc(t('Prices are checked every 2 minutes while the app is open, and again each time you open it. Information only, not financial advice.'))}</p>`, { id:'priceAlerts', share:false });
};
function paKind(k, b){
  document.querySelectorAll('.pa-seg button').forEach(function(x){ x.classList.toggle('on', x === b); });
  $('paUnit').style.display = k === 'pi' ? '' : 'none'; $('paCur').style.display = k === 'pi' ? 'none' : '';
  const p = paPi(), fx = paFx(), cur = $('paCur').value;
  $('paVal').placeholder = k === 'pi' ? (p && p.usd ? fmt(p.usd, 4) : '0.25') : (fx && fx.rates && fx.rates[cur] ? fmt(fx.rates[cur], 2) : '');
  $('paVal').dataset.k = k;
}
function paAdd(){
  const k = $('paVal').dataset.k || 'pi', v = parseFloat(String($('paVal').value).replace(',', '.'));
  if(!(v > 0)) return toast(t('Enter a price above 0'));
  const c = paCfg(); if(c.list.length >= 12) return toast(t('You can have up to 12 alerts'));
  const a = { id:Date.now().toString(36), k:k, d:$('paDir').value, v:v };
  if(k === 'pi') a.u = $('paUnit').value; else a.c = $('paCur').value;
  const now = paNow(a);
  if(now != null && ((a.d === 'up' && now >= v) || (a.d === 'down' && now <= v))) return toast(t('The price is already there. Choose a different value.'));
  c.list.push(a); paSave(c); toast('🔔 ' + t('Alert added'));
  openItem('priceAlerts');
}
function paDel(id){ const c = paCfg(); c.list = c.list.filter(function(a){ return a.id !== id; }); paSave(c); openItem('priceAlerts'); }
function paRearm(id){ const c = paCfg(); c.list.forEach(function(a){ if(a.id === id) delete a.done; }); paSave(c); openItem('priceAlerts'); }
function paSetMove(v){ const c = paCfg(); c.move = +v; paSave(c); }
function paSetDaily(b){ const c = paCfg(); c.daily = !c.daily; paSave(c); b.classList.toggle('on', c.daily); }

/* entry points: Live › Markets, notification settings and the money services */
(function(){
  const addBtn = function(){
    const rl = $('rateList'); if(rl && !$('paLive')) rl.insertAdjacentHTML('afterend', `<button class="row" id="paLive" style="margin-top:10px" onclick="openItem('priceAlerts')"><div class="ic">🔔</div><div class="tx"><b>${esc(t('Price alerts'))}</b><small>${esc(t('Pi and currency rates, automatically'))}</small></div><span class="chev">›</span></button>`);
  };
  addBtn();
  const _al = applyLang; applyLang = function(){ const r = _al.apply(this, arguments); const b = $('paLive'); if(b){ b.remove(); addBtn(); } return r; };
  const _ns = notifSettingsPanel;
  notifSettingsPanel = function(){ const r = _ns.apply(this, arguments); const b = $('pBody'); if(b) b.insertAdjacentHTML('afterbegin', '<div style="margin-bottom:12px">' + rowHTML('priceAlerts') + '</div>'); return r; };
  PANELS.notifSettings = notifSettingsPanel;
  // Services › Pi & money: first row
  const _e = enterApp;
  enterApp = function(){ const r = _e.apply(this, arguments); setTimeout(function(){ const pane = document.querySelector('.svc-pane[data-g="money"]'); if(pane && !$('paSvc')){ pane.insertAdjacentHTML('afterbegin', '<div id="paSvc">' + rowHTML('priceAlerts') + '</div>'); } }, 80); return r; };
})();

/* words in every language */
(function(){
  const R = [
    ["Price alerts","تنبيهات الأسعار","قیمت کے الرٹس","Peringatan harga","Faɗakarwar farashi","Alertes de prix"],
    ["Pi and currency rates, automatically","أسعار Pi والعملات تلقائياً","Pi اور کرنسی ریٹس، خودکار","Harga Pi dan kurs, otomatis","Farashin Pi da kuɗaɗe, kai tsaye","Pi et devises, automatiquement"],
    ["Pi price","سعر Pi","Pi کی قیمت","Harga Pi","Farashin Pi","Prix du Pi"],
    ["rises above","يرتفع فوق","اوپر جائے","naik di atas","ya haura","dépasse"],
    ["falls below","ينخفض تحت","نیچے جائے","turun di bawah","ya faɗi ƙasa da","passe sous"],
    ["Rises above","يرتفع فوق","اس سے اوپر جائے","Naik di atas","Ya haura","Dépasse"],
    ["Falls below","ينخفض تحت","اس سے نیچے جائے","Turun di bawah","Ya faɗi ƙasa da","Passe sous"],
    ["Price alert","تنبيه سعر","قیمت الرٹ","Peringatan harga","Faɗakarwar farashi","Alerte de prix"],
    ["Now","الآن","ابھی","Sekarang","Yanzu","Maintenant"],
    ["Tap to see the markets.","اضغط لرؤية الأسواق.","مارکیٹس دیکھنے کے لیے ٹیپ کریں۔","Ketuk untuk melihat pasar.","Taɓa don ganin kasuwanni.","Touchez pour voir les marchés."],
    ["Pi is up {p}% in 24 hours","ارتفع Pi بنسبة {p}% خلال 24 ساعة","Pi 24 گھنٹوں میں {p}% بڑھا","Pi naik {p}% dalam 24 jam","Pi ya haura da {p}% cikin awa 24","Le Pi a pris {p} % en 24 h"],
    ["Pi is down {p}% in 24 hours","انخفض Pi بنسبة {p}% خلال 24 ساعة","Pi 24 گھنٹوں میں {p}% گرا","Pi turun {p}% dalam 24 jam","Pi ya faɗi da {p}% cikin awa 24","Le Pi a perdu {p} % en 24 h"],
    ["Today’s prices","أسعار اليوم","آج کی قیمتیں","Harga hari ini","Farashin yau","Les prix du jour"],
    ["Price unavailable right now","السعر غير متاح الآن","قیمت ابھی دستیاب نہیں","Harga belum tersedia","Babu farashi yanzu","Prix indisponible pour le moment"],
    ["Alert sent","تم إرسال التنبيه","الرٹ بھیج دیا گیا","Peringatan terkirim","An aika faɗakarwa","Alerte envoyée"],
    ["Turn on again","فعّله مجدداً","دوبارہ آن کریں","Aktifkan lagi","Sake kunnawa","Réactiver"],
    ["Delete","حذف","حذف کریں","Hapus","Goge","Supprimer"],
    ["No alerts yet. Add your first one below.","لا توجد تنبيهات بعد. أضف أول تنبيه بالأسفل.","ابھی کوئی الرٹ نہیں۔ نیچے پہلا شامل کریں۔","Belum ada peringatan. Tambahkan di bawah.","Babu faɗakarwa tukuna. Ƙara ta farko a ƙasa.","Aucune alerte. Ajoutez-en une ci-dessous."],
    ["Pi now","Pi الآن","Pi ابھی","Pi sekarang","Pi yanzu","Pi maintenant"],
    ["Your alerts","تنبيهاتك","آپ کے الرٹس","Peringatan Anda","Faɗakarwarka","Vos alertes"],
    ["Add an alert","أضف تنبيهاً","الرٹ شامل کریں","Tambah peringatan","Ƙara faɗakarwa","Ajouter une alerte"],
    ["Currency","العملة","کرنسی","Mata uang","Kuɗi","Devise"],
    ["Add alert","أضف التنبيه","الرٹ شامل کریں","Tambah","Ƙara","Ajouter"],
    ["Automatic alerts","تنبيهات تلقائية","خودکار الرٹس","Peringatan otomatis","Faɗakarwa ta atomatik","Alertes automatiques"],
    ["Big Pi price move","تحرك كبير في سعر Pi","Pi کی قیمت میں بڑی تبدیلی","Pergerakan besar harga Pi","Babban sauyin farashin Pi","Forte variation du Pi"],
    ["When Pi moves this much in 24 hours","عندما يتحرك Pi بهذا القدر خلال 24 ساعة","جب Pi 24 گھنٹوں میں اتنا بدلے","Saat Pi bergerak sebesar ini dalam 24 jam","Idan Pi ya motsa haka cikin awa 24","Quand le Pi varie autant en 24 h"],
    ["Off","إيقاف","بند","Mati","A kashe","Désactivé"],
    ["Daily price summary","ملخص الأسعار اليومي","روزانہ قیمتوں کا خلاصہ","Ringkasan harga harian","Taƙaitaccen farashi na kullum","Résumé quotidien des prix"],
    ["Pi and your currency, once a day after 8 am","Pi وعملتك، مرة يومياً بعد 8 صباحاً","Pi اور آپ کی کرنسی، روزانہ صبح 8 کے بعد","Pi dan mata uang Anda, sekali sehari setelah pukul 8","Pi da kuɗinka, sau ɗaya a rana bayan ƙarfe 8","Pi et votre devise, une fois par jour après 8 h"],
    ["My currency","عملتي","میری کرنسی","Mata uang saya","Kuɗina","Ma devise"],
    ["Used in the daily summary","تُستخدم في الملخص اليومي","روزانہ خلاصے میں استعمال","Dipakai di ringkasan harian","Ana amfani da shi a taƙaitaccen kullum","Utilisée dans le résumé"],
    ["Phone notifications","إشعارات الهاتف","فون نوٹیفکیشنز","Notifikasi ponsel","Sanarwar waya","Notifications du téléphone"],
    ["On. Alerts also appear in your phone’s notification bar while DigitalSaudi is open.","مفعّلة. تظهر التنبيهات أيضاً في شريط إشعارات هاتفك أثناء فتح DigitalSaudi.","آن ہیں۔ DigitalSaudi کھلا ہو تو الرٹس فون کی نوٹیفکیشن بار میں بھی آتے ہیں۔","Aktif. Peringatan juga muncul di bilah notifikasi saat DigitalSaudi terbuka.","A kunne. Faɗakarwa na bayyana a sandar sanarwar waya yayin da DigitalSaudi ke buɗe.","Activées. Les alertes s’affichent aussi dans la barre de notifications quand DigitalSaudi est ouvert."],
    ["Blocked in this browser’s settings. Alerts still appear in the app and in your inbox.","محظورة في إعدادات المتصفح. تظل التنبيهات تظهر في التطبيق وصندوقك.","براؤزر کی سیٹنگز میں بلاک ہیں۔ الرٹس پھر بھی ایپ اور ان باکس میں آتے ہیں۔","Diblokir di pengaturan browser. Peringatan tetap muncul di aplikasi dan kotak masuk.","An toshe a saitunan burauza. Faɗakarwa na bayyana a manhaja da akwatinka.","Bloquées dans le navigateur. Les alertes restent visibles dans l’appli et la boîte de réception."],
    ["This browser can’t show phone notifications. Alerts still appear in the app and in your inbox.","هذا المتصفح لا يعرض إشعارات الهاتف. تظل التنبيهات تظهر في التطبيق وصندوقك.","یہ براؤزر فون نوٹیفکیشن نہیں دکھا سکتا۔ الرٹس پھر بھی ایپ اور ان باکس میں آتے ہیں۔","Browser ini tidak bisa menampilkan notifikasi ponsel. Peringatan tetap muncul di aplikasi dan kotak masuk.","Wannan burauza ba ta nuna sanarwar waya. Faɗakarwa na bayyana a manhaja da akwatinka.","Ce navigateur ne peut pas afficher de notifications. Les alertes restent dans l’appli et la boîte de réception."],
    ["Allow them to see alerts in your phone’s notification bar.","اسمح بها لرؤية التنبيهات في شريط إشعارات هاتفك.","فون کی نوٹیفکیشن بار میں الرٹس دیکھنے کے لیے اجازت دیں۔","Izinkan untuk melihat peringatan di bilah notifikasi.","Ba da izini don ganin faɗakarwa a sandar sanarwar waya.","Autorisez-les pour voir les alertes dans la barre de notifications."],
    ["Allow notifications","السماح بالإشعارات","نوٹیفکیشنز کی اجازت دیں","Izinkan notifikasi","Ba da izinin sanarwa","Autoriser les notifications"],
    ["Prices are checked every 2 minutes while the app is open, and again each time you open it. Information only, not financial advice.","تُفحص الأسعار كل دقيقتين أثناء فتح التطبيق، وعند كل فتح. للمعلومات فقط، وليست نصيحة مالية.","ایپ کھلی ہو تو قیمتیں ہر 2 منٹ میں اور ہر بار کھولنے پر جانچی جاتی ہیں۔ صرف معلومات، مالی مشورہ نہیں۔","Harga diperiksa setiap 2 menit saat aplikasi terbuka, dan setiap kali dibuka. Hanya informasi, bukan saran keuangan.","Ana duba farashi kowane minti 2 yayin da manhaja ke buɗe, da duk lokacin da ka buɗe ta. Bayani kawai, ba shawarar kuɗi ba.","Les prix sont vérifiés toutes les 2 minutes quand l’appli est ouverte, et à chaque ouverture. Information seulement, pas un conseil financier."],
    ["Enter a price above 0","أدخل سعراً أكبر من 0","0 سے زیادہ قیمت درج کریں","Masukkan harga di atas 0","Shigar da farashi sama da 0","Entrez un prix supérieur à 0"],
    ["You can have up to 12 alerts","يمكنك إضافة حتى 12 تنبيهاً","آپ 12 تک الرٹس رکھ سکتے ہیں","Maksimal 12 peringatan","Za ka iya samun faɗakarwa har 12","12 alertes maximum"],
    ["The price is already there. Choose a different value.","السعر وصل بالفعل لهذا الحد. اختر قيمة أخرى.","قیمت پہلے ہی وہاں ہے۔ کوئی اور قدر منتخب کریں۔","Harga sudah di sana. Pilih nilai lain.","Farashin ya riga ya kai can. Zaɓi wani adadi.","Le prix y est déjà. Choisissez une autre valeur."],
    ["Alert added","تمت إضافة التنبيه","الرٹ شامل ہو گیا","Peringatan ditambahkan","An ƙara faɗakarwa","Alerte ajoutée"],
    ["When","متى","کب","Kapan","Yaushe","Quand"],
    ["Price","السعر","قیمت","Harga","Farashi","Prix"],
    ["Unit","الوحدة","اکائی","Satuan","Ma’auni","Unité"],
    ["Unlock badges at 1, 3 and 10 friends. Badges are just for fun: there are no Pi, cash or prize rewards.","افتح شارات عند 1 و3 و10 أصدقاء. الشارات للمتعة فقط: لا توجد مكافآت Pi أو نقود أو جوائز.","1، 3 اور 10 دوستوں پر بیج کھولیں۔ بیج صرف تفریح کے لیے ہیں: کوئی Pi، نقد یا انعام نہیں۔","Buka lencana di 1, 3, dan 10 teman. Lencana hanya untuk kesenangan: tidak ada hadiah Pi, uang, atau barang.","Buɗe lambobi a abokai 1, 3 da 10. Lambobi don nishaɗi ne kawai: babu ladan Pi, kuɗi ko kyauta.","Débloquez des badges à 1, 3 et 10 amis. Les badges sont juste pour le plaisir : aucune récompense en Pi, argent ou cadeau."],
    ["Share DigitalSaudi, unlock badges","شارك DigitalSaudi وافتح الشارات","DigitalSaudi شیئر کریں، بیج کھولیں","Bagikan DigitalSaudi, buka lencana","Raba DigitalSaudi, buɗe lambobi","Partagez DigitalSaudi, débloquez des badges"]
  ];
  R.forEach(function(r){ LANG_ORDER.slice(1).forEach(function(l, i){ if(r[i + 1]) I18N[l][r[0]] = r[i + 1]; }); });
})();

/* v7.2 — the same app runs as the Pi testnet app at testnet.digitalsaudi.pages.dev.
   There a clear label shows that payments use test Pi only. */
const DS_TESTNET = /(^|[.-])testnet[.-]/i.test(location.hostname);
if(DS_TESTNET){
  document.documentElement.classList.add('ds-testnet');
  document.title = '[Testnet] ' + document.title;
  document.body.insertAdjacentHTML('beforeend', '<div class="ds-tn" role="note" aria-label="Testnet: test Pi only">TESTNET</div>');
}

