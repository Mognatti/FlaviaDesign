# FlaviaDesign
Aplicação utilizada para realizar o controle de clientes da empresa Flávia Desing

#Segurança
Somente pode-se acessar o aplicativo de forma íntegra quando se está logado com a conta google. Esse controle é feito com uma comunhão entre supabase e
o prórpio google OAuth. Somente usuários autorizados por mim (através do google cloud api) poderão realizar o login na aplicação.

#Calendário
Essa funcionalidade permite que a empresa cire novos agendamentos, de acordo com a sua lista de clientes (cadastrados no próprio app e armazenados 
no supabase) e a lista de procedimentos (mesmo padrão da lista de clientes). Com os dados gerados, é possível realizar os agendamentos de maneira prática,
já que o tempo de duração do atendimento já está definido, assim como seu preço. Ainda assim, caso seja necessário, pode-se editar o tempo do atendimento 
com facilidade.
Uma vez definido a cliente, seu telefone, procedimento, data/hora de início e de final, é feita uma requisição para a API do google de forma a concretizar
o agendamento no Google Agenda. O agendamento ainda envia o telefone da cliente para que possa entrar em contato com facilidade e uma mensagem de confirmação
personalizada.
Caso o nome da cliente não esteja registrado no banco de dados, o agendamento ainda irá acontecer, mas também irá criar um novo item na tabela de clientes
armazenada no supabase e, com os dados usados para fazer o agendamento do google, essa cliente ficará salva para futuros agendamentos.

#Procedimentos
Utilizando esse componente, é possível acessar os procedimentos realizados pela empresa e editá-los (preço, tempo de duração e nome).
Assim, é possível utilizar estes procedimentos, de maneira atualizada, quando cria-se um novo agendamento com as clientes.

#Clientes
Aqui a empresa poderá visualizar todos os clientes cadastrados e ainda poderá editar as informações, caso ocorra algum erro ou alguma mudança (telefone ou nome social,
por exemplo). Ainda, é possível registrar uma cliente sem necessariamente gerar um agendamento.
Pode-se utilizar a ferramenta de busca para encontrar uma cliente específica através de seu nome, facilitando a possiblildade de editar os seus dados ou simplesmente
checá-los. 

