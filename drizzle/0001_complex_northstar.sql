CREATE TABLE `referral_leads` (
	`id` int AUTO_INCREMENT NOT NULL,
	`partnerSlug` varchar(64) NOT NULL,
	`partnerName` varchar(128) NOT NULL,
	`firstName` varchar(128) NOT NULL,
	`lastName` varchar(128) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(32),
	`company` varchar(256),
	`employeeCount` varchar(64),
	`message` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `referral_leads_id` PRIMARY KEY(`id`)
);
