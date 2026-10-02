import { jsPDF } from 'jspdf';

function line(doc: jsPDF, text: string, y: number, size = 10) {
  doc.setFontSize(size);
  const lines = doc.splitTextToSize(text, 180);
  if (y + lines.length * (size * 0.45) + 2 > 275) {
    doc.addPage();
    y = 16;
  }
  doc.text(lines, 15, y);
  return y + lines.length * (size * 0.45) + 2;
}

const englishBody = [
  'In connection with my application for employment, continued employment, or other permissible purpose, I understand that Driver Pipeline may obtain my motor vehicle record (MVR) and conduct a criminal background screening through its designated agents or consumer reporting agencies, including Saffhire, from state Departments of Motor Vehicles (DMV), law enforcement agencies, courts, or other authorized sources.',
  'The MVR may include my driving history, license status, traffic violations, accidents, and related information. The criminal background screening may include my criminal history, such as arrests, convictions, and other records from federal, state, or local agencies or courts.',
  'I agree that this information will be used for employment-related purposes, including evaluating my eligibility to operate a company or personal vehicle for company business and for employment, retention, promotion, or reassignment with Driver Pipeline.',
  'I authorize Driver Pipeline, Saffhire, and their agents to obtain and review my MVR and criminal background information now and, if employed, during my employment for retention, promotion, or reassignment, as permitted by law. I authorize any law enforcement agency, state or federal agency, institution, school, university, information service bureau, employer, or insurance company to provide requested background information to Driver Pipeline or Saffhire.',
  'This authorization remains in effect during my employment unless revoked in writing.',
  'Acknowledgment of Rights: I acknowledge receipt of the documents entitled "FCRA Disclosure Regarding Background Investigation" and "A Summary of Your Rights Under the Fair Credit Reporting Act" and certify that I have read and understand my rights. I also agree to sign this authorization electronically.',
];

const spanishBody = [
  'En relacion con mi solicitud de empleo, empleo continuo u otro proposito permitido, entiendo que Driver Pipeline puede obtener mi reporte de vehiculo de motor (MVR) y realizar una verificacion de antecedentes penales por medio de sus agentes designados o agencias de informes del consumidor, incluyendo Saffhire, de los Departamentos de Vehiculos de Motor estatales (DMV), agencias del orden publico, tribunales u otras fuentes autorizadas.',
  'El MVR puede incluir mi historial de manejo, el estado de la licencia, infracciones de transito, accidentes e informacion relacionada. La verificacion de antecedentes penales puede incluir mi historial penal, como arrestos, condenas y otros registros de agencias o tribunales federales, estatales o locales.',
  'Acepto que esta informacion se usara para fines relacionados con el empleo, incluyendo evaluar mi elegibilidad para operar un vehiculo de la empresa o un vehiculo personal para negocios de la empresa, y para empleo, retencion, promocion o reasignacion con Driver Pipeline.',
  'Autorizo a Driver Pipeline, Saffhire y sus agentes a obtener y revisar mi MVR y mi informacion de antecedentes penales ahora y, si soy empleado, durante mi empleo para retencion, promocion o reasignacion, segun lo permita la ley. Autorizo a cualquier agencia del orden publico, agencia estatal o federal, institucion, escuela, universidad, oficina de servicios de informacion, empleador o compania de seguros a proporcionar la informacion de antecedentes solicitada a Driver Pipeline o Saffhire.',
  'Esta autorizacion permanece vigente durante mi empleo, a menos que la revoque por escrito.',
  'Confirmacion de derechos: Confirmo que recibi los documentos titulados "Divulgacion de la FCRA sobre la investigacion de antecedentes" y "Resumen de sus derechos bajo la Ley de Informes de Credito Justos", y certifico que he leido y entiendo mis derechos. Tambien acepto firmar esta autorizacion de forma electronica.',
];

export function buildAuthorizationPdf(row: Record<string, string | boolean | null>, lang: 'en' | 'es') {
  const spanish = lang === 'es';
  const doc = new jsPDF();
  let y = 16;
  doc.setFont('helvetica', 'bold');
  y = line(doc, spanish ? 'Divulgacion y autorizacion para verificacion de antecedentes y reporte de vehiculo de motor' : 'Disclosure and Authorization for Background Screening and Motor Vehicle Report', y, 13);
  doc.setFont('helvetica', 'normal');
  const signed = new Date(String(row.signed_at)).toLocaleString(spanish ? 'es-US' : 'en-US', { timeZone: 'America/Chicago' });
  y = line(doc, spanish ? `Referencia ${row.reference_code}  |  Firmado electronicamente ${signed} hora del Centro` : `Reference ${row.reference_code}  |  Electronically signed ${signed} CT`, y, 9);
  y += 2;
  (spanish ? spanishBody : englishBody).forEach((paragraph) => {
    y = line(doc, paragraph, y);
  });
  y += 2;
  const applicant = `${row.first_name} ${row.no_middle_name ? (spanish ? '(sin segundo nombre legal)' : '(no legal middle name)') : (row.middle_name || '')} ${row.last_name}`.replace(/\s+/g, ' ');
  const fields = spanish
    ? [
        ['Solicitante', applicant],
        ['Correo electronico', row.email],
        ['Telefono', row.phone || ''],
        ['Fecha de nacimiento', row.date_of_birth],
        ['Numero de Seguro Social', row.ssn],
        ['Numero de licencia', row.dl_number],
        ['Vencimiento de la licencia', row.license_expiration || ''],
        ['Fecha de emision', row.license_issued || ''],
        ['Estado que emitio la licencia', row.issuing_state],
        ['Direccion actual', row.current_address],
        ['Fecha aproximada en que se mudo', row.dates_lived_here || ''],
        ['Otros nombres usados', row.other_names || ''],
        ['Anos conocido por otros nombres', row.years_used || ''],
        ['Firma escrita', row.signature_name],
        ['Direccion IP', row.ip_address || ''],
      ]
    : [
        ['Applicant', applicant],
        ['Email', row.email],
        ['Phone', row.phone || ''],
        ['Date of birth', row.date_of_birth],
        ['Social Security number', row.ssn],
        ['DL number', row.dl_number],
        ['License expiration', row.license_expiration || ''],
        ['Date issued', row.license_issued || ''],
        ['Issuing state', row.issuing_state],
        ['Current address', row.current_address],
        ['Approximate date moved in', row.dates_lived_here || ''],
        ['Other names used', row.other_names || ''],
        ['Years known by other names', row.years_used || ''],
        ['Typed signature', row.signature_name],
        ['IP address', row.ip_address || ''],
      ];
  fields.forEach(([label, value]) => {
    y = line(doc, `${label}: ${value || ''}`, y, 10);
  });
  y += 4;
  if (typeof row.signature_data_url === 'string' && row.signature_data_url.startsWith('data:image')) {
    doc.setFont('helvetica', 'bold');
    y = line(doc, spanish ? 'Firma dibujada' : 'Drawn signature', y, 11);
    if (y > 250) {
      doc.addPage();
      y = 16;
    }
    doc.addImage(row.signature_data_url, 'PNG', 15, y, 80, 28);
    y += 34;
  }
  doc.setFont('helvetica', 'normal');
  line(doc, spanish ? 'Preparado por SaffHire para Driver Pipeline. Este PDF es la autorizacion electronica guardada.' : 'Prepared by SaffHire for Driver Pipeline. This PDF is the stored electronic authorization.', y, 8);
  const filename = `${row.last_name}-${row.first_name}-${spanish ? 'autorizacion' : 'authorization'}.pdf`.replace(/[^a-z0-9.-]+/gi, '-');
  return { bytes: Buffer.from(doc.output('arraybuffer')), filename };
}
