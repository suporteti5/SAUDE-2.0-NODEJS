const express = require("express");
const app = express();
const PORT = 3001;

const cors = require("cors");

const sgMail = require("@sendgrid/mail");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cors());

sgMail.setApiKey(
/* "COLOCAR APIKEY AQUI" */
);

app.post("/enviar-email", (req, res) => {
  const { nome, email, assunto, mensagem } = req.body;

  const msg = {
    to: "contato@ammarhes.com.br",
    from: "naoresponder@ammarhes.com.br",
    subject: `Contato Via Site Ammarhes ${assunto}`,
    text: `De: ${nome}\nEmail: ${email}\nMensagem: ${mensagem}`,
  };

  sgMail
    .send(msg)
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ success: false });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
