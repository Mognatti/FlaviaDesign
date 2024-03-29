<h2>Flavia Caparelli Design</h2> 
<p align='justify'>
Aplicação de uso restrito utilizada para realizar o gerenciamento de clientes e de procedimentos da empresa Flávia Caparelli Desing. Além disso, a aplicação ainda permite a integração com o Google Agenda para facilitar o agentamento de clientes através de um formulário inteligente.  
</p>

<h2 >Segurança </h2> 

<p align='justify'>
Somente pode-se acessar o aplicativo de forma íntegra quando se está logado com a conta google. Esse controle é feito com uma comunhão entre o Supabase e
o Google OAuth. Somente usuários autorizados por mim (através da Google Cloud API) poderão realizar o login na aplicação.</p>
<img src='https://github.com/Mognatti/FlaviaDesign/assets/103158596/d78aad6f-440d-4d0f-9d9d-9c718745d03a' alt='print_login' />

<h2>Calendário </h2> 
<p align='justify'>
Essa funcionalidade permite que a empresa cire novos agendamentos, de acordo com a sua lista de clientes (cadastrados no próprio app e armazenados 
no supabase) e a lista de procedimentos (mesmo padrão da lista de clientes). Com os dados gerados, é possível realizar os agendamentos de maneira prática,
já que o tempo de duração do atendimento já está definido, assim como seu preço. Ainda assim, caso seja necessário, pode-se editar o tempo do atendimento 
com facilidade.
</p>
<p align='justify'>
Uma vez definido a cliente, seu telefone, procedimento, data/hora de início e de final, é feita uma requisição para a API do google de forma a concretizar
o agendamento no Google Agenda. O agendamento ainda envia o telefone da cliente para que possa entrar em contato com facilidade e uma mensagem de confirmação
personalizada.
</p>
<p align='justify'>
Caso o nome da cliente não esteja registrado no banco de dados, o agendamento ainda irá acontecer, mas também irá criar um novo item na tabela de clientes
armazenada no supabase e, com os dados usados para fazer o agendamento do google, essa cliente ficará salva para futuros agendamentos.
</p>
<img src='https://github.com/Mognatti/FlaviaDesign/assets/103158596/3067744b-8c3a-4d15-8f51-1db3d92329e0' alt='print_calendario'/>

<h2>Clientes</h2> 
<p align='justify'>
Aqui a empresa poderá visualizar todos os clientes cadastrados e ainda poderá editar as informações, caso ocorra algum erro ou alguma mudança (telefone ou nome social,
por exemplo). Ainda, é possível registrar uma cliente sem necessariamente gerar um agendamento.
Pode-se utilizar a ferramenta de busca para encontrar uma cliente específica através de seu nome, facilitando a possiblildade de editar os seus dados ou simplesmente
checá-los. 
</p>
<img src='https://github.com/Mognatti/FlaviaDesign/assets/103158596/541c0938-0e40-45be-a86e-0a68e2614600' alt='print_clientes' />

<h2>Procedimentos</h2> 
<p align='justify'>
Utilizando esse componente, é possível acessar os procedimentos realizados pela empresa e editá-los (preço, tempo de duração e nome).
Assim, é possível utilizar estes procedimentos, de maneira atualizada, quando cria-se um novo agendamento com as clientes. </p>
<img src='https://github.com/Mognatti/FlaviaDesign/assets/103158596/cb141975-6da4-47b0-a6a1-790c45ba7088' alt='print_procedimentos' />

<p align='justify'>
Para demonstrar a responsividade da aplicação, afinal a contratante acessa praticamente 100% das vezes pelo seu celular, segue um print de tela em tamanho mobile: 
</p>
<div align='center'>
<img src='https://github.com/Mognatti/FlaviaDesign/assets/103158596/cd4a2706-8f6d-4c24-ba7e-1b4949b50687' alt='print_procedimentos_responsivo' />
</div>
