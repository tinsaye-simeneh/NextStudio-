const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const nodemailer = require('nodemailer');
const { promisify } = require('util');


const transporter = nodemailer.createTransport({
    host: 'mail.nextcommunicationeth.com',
    port: 465,
    secure: true,
    auth: {
      user: 'info@nextcommunicationeth.com',
      pass: '2909@info$2024',
    },
  });
  

exports.sendMails = async (req, res) => {
  const { name, email, messages } = req.body;


  const mailOptions = {
    from: 'info@nextcommunicationeth.com',
    to: 'christian@nextcommunicationeth.com',
    subject: 'New Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${messages}`,
  };


  try {
    await transporter.sendMail(mailOptions);
    res.status(201).json({
        success: true,
        messages: "Email Send Successfuly"
    });
  } catch (err) {
    res.status(404).json({
        status: 'fail',
        messages: err.message
    })
  }
}

exports.MMEsendMails = async (req, res) => {
  const { name, email, phoneNumber, answer, reason} = req.body;

  const email_address = [
    "samuelm@marathonmotor-hyundai.com",
    "christian@nextcommunicationeth.com",
  ];

  const mailOptions = {
    from: 'info@nextcommunicationeth.com',
    to: email_address,
    subject: 'New RSVP Submission',
    text: ` Dear Samuel, \n\n A user has just submitted the RSVP form on our website. Here are the details:\n\n   Name: ${name}\n   Email: ${email}\n   Phone Number: ${phoneNumber}\n   Answer: ${answer === "No" ? 'NO. SORRY TO MISS IT.' :'YES! WOULDN`T MISS IT.'}\n\n ${answer === "No" ? `the user has chosen not to attend, they have provided the following reason:\n   Reason: ${reason}`  : '' } `,
  };


  try {
    await transporter.sendMail(mailOptions);
    res.status(201).json({
        success: true,
        messages: "Email Send Successfuly"
    });
  } catch (err) {
    res.status(404).json({
        status: 'fail',
        messages: err.message
    })
  }
}

exports.sendApplicationEmail = async (req, res) => {
    try {
      const { name, email, phonenumber, messages } = req.body;
      const base64Data = req.body.file;
  
      // Validate file type (allow only PDF and Word)
      if (!isValidFileType(base64Data)) {
        return res.status(400).json({
          status: 'fail',
          message: 'Invalid file type. Allowed types are PDF and Word.',
        });
      }
  
      const { buffer, isPdf } = convertBase64ToBuffer(base64Data);
  
      const attachmentBuffer = isPdf
        ? await convertPdfBuffer(buffer)
        : await convertWordBuffer(buffer);
  
      const mailOptions = {
        from: 'info@nextcommunicationeth.com',
        to: 'apply@nextcommunicationeth.com',
        subject: 'New Apply Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${messages}\nPhone-Number: ${phonenumber}`,
        attachments: [
          {
            filename: isPdf ? 'document.pdf' : 'document.docx',
            content: attachmentBuffer,
          },
        ],
      };
  
      await transporter.sendMail(mailOptions);
      res.status(201).json({
        success: true,
        message: 'Email sent successfully',
      });
    } catch (err) {
      console.error('Error sending email:', err);
      res.status(500).json({
        status: 'fail',
        message: err.message,
      });
    }
  };
  
  const isValidFileType = (base64Data) => {
    return base64Data.includes('application/pdf') || base64Data.includes('application/msword');
  };
  
  const convertBase64ToBuffer = (base64Data) => {
    const buffer = Buffer.from(base64Data.split(';base64,').pop(), 'base64');
    const isPdf = base64Data.includes('application/pdf');
    return { buffer, isPdf };
  };
  
  const convertPdfBuffer = async (buffer) => {
    const pdfContent = await pdfParse(buffer);
    return Buffer.from(pdfContent.text);
  };
  
  const convertWordBuffer = async (buffer) => {
    const { value } = await promisify(mammoth.extractRawText)({ arrayBuffer: buffer });
    return Buffer.from(value, 'utf-8');
  };