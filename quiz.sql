SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `perguntas` (
  `id` int(11) NOT NULL,
  `pergunta` varchar(255) NOT NULL,
  `opcoes_resposta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`opcoes_resposta`)),
  `resposta_correta` varchar(255) NOT NULL,
  `pontuacao` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `perguntas` (`id`, `pergunta`, `opcoes_resposta`, `resposta_correta`, `pontuacao`) VALUES
(2, 'Os membros da UBI têm autonomia na prossecução de atividades académicas?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(3, 'Os membros da UBI têm o dever de cultivar a honestidade e a veracidade?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(4, 'Os membros da UBI devem pactuar com objetivos escondidos ou pouco claros?', '[\"Sim\", \"Não\"]', 'Não', 10),
(5, 'Os membros da UBI devem causar dano a outros?', '[\"Sim\", \"Não\"]', 'Não', 10),
(6, 'Os membros da UBI têm responsabilidades de tipo acadêmico, profissional e pessoal?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(7, 'O presente Código de Integridade da UBI tem circunscrição geográfica estrita?', '[\"Sim\", \"Não\"]', 'Não', 10),
(8, 'Os membros da UBI devem colaborar de boa-fé para a justa prossecução das atividades acadêmicas?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(9, 'Os membros da UBI devem respeitar a diversidade cultural, religiosa e identitária?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(10, 'Os membros da UBI devem recusar-se a causar dano a outros?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(11, 'Os membros da UBI têm o dever de desconhecer os princípios, valores e normas estipulados no código?', '[\"Sim\", \"Não\"]', 'Não', 10),
(12, 'Os membros da comunidade académica ubiana devem desrespeitar e tratar todos os membros da comunidade académica com urbanidade?', '[\"Sim\", \"Não\"]', 'Não', 10),
(13, 'O acesso não autorizado a documentos oficiais e material didático da UBI é permitido?', '[\"Sim\", \"Não\"]', 'Não', 10),
(14, 'Os estudantes da UBI devem contribuir para a plena integração de todos na Comunidade Académica? ', '[\"Sim\", \"Não\"]', 'Sim', 10),
(15, 'Durante o período de aula, toda e qualquer entrada ou saída da sala deve ser autorizada pelo docente?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(16, 'O estudante da UBI deve abster-se de qualquer ato ou comportamento que impeça o decorrer normal das aulas?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(17, 'O estudante da UBI deve fazer valer os seus direitos e recursos diretamente e através de seus representantes?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(18, 'O estudante da UBI deve colaborar ativamente com os seus representantes?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(19, 'Todo e qualquer comportamento que vise adulterar a avaliação e quantificação dos reais méritos e competências do estudante é tolerável? ', '[\"Sim\", \"Não\"]', 'Não', 10),
(20, 'Os trabalhos de grupo devem contar com a participação efetiva e equitativa de todos os seus signatários?', '[\"Sim\", \"Não\"]', 'Sim', 10),
(21, 'Os fenômenos de desordem ou delito grupal podem ser considerados atenuantes das responsabilidades individuais dos estudantes intervenientes?', '[\"Sim\", \"Não\"]', 'Não', 10);

CREATE TABLE `pontuacoes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `pontuacao` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `pontuacoes` (`id`, `user_id`, `pontuacao`) VALUES
(1, 2, 186),
(2, 3, 0),
(3, 20, 0);

CREATE TABLE `recompensas` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `custo` int(11) NOT NULL,
  `descricao` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `recompensas` (`id`, `nome`, `custo`, `descricao`) VALUES
(1, 'Refeições', 500, 'Válido para almoço ou jantar. Aproveite uma refeição de forma gratuita nas instalações da UBI.');

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nome` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `isAdmin` tinyint(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id`, `nome`, `email`, `senha`, `isAdmin`) VALUES
(1, 'admin', 'admin@gmail.com', '$2b$10$rgZOobtQrzoKUoTNeduVqODp3SsNqkHJSE63ooqJh46emL/Prr8DW', 1),
(2, 'Pedro', 'pedro@gmail.com', '$2b$10$pumvoL83B12FDP7O6gkji.lOAGAANws5u5wtY.kBsnqKTFOkZQfn6', 0),
(3, 'Gil', 'gil@gmail.com', '$2b$10$QBV6RWEpzKyp.Yp32el0le/PpBdkWr8pP/OmWjcugEuu2oINv4x9u', 0),
(20, 'Mark', 'mark@gmail.com', '$2b$10$/VONkQId2HB3akEnpmrzxOCgR0CY8QRKwOqMDDN4Iy4vBWhD6h5Ym', 0);

ALTER TABLE `perguntas`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `pontuacoes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pontuacoes_fk_user_id` (`user_id`);

ALTER TABLE `recompensas`
  ADD PRIMARY KEY (`id`);

ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_email` (`email`);

ALTER TABLE `perguntas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `pontuacoes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `recompensas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

ALTER TABLE `pontuacoes`
  ADD CONSTRAINT `pontuacoes_fk_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `pontuacoes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;