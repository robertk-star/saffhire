CREATE TABLE `intake_responses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`sessionId` varchar(128) NOT NULL,
	`email` varchar(320),
	`responses` text NOT NULL,
	`claudeAnalysis` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `intake_responses_id` PRIMARY KEY(`id`)
);
