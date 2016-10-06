
CREATE TABLE IF NOT EXISTS `buyer_type` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL COMMENT '{"order":"asc","unique":true}',
  `name_ar` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `name_fr` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `slug` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug_ar` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `slug_fr` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `is_published` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"News","pstn":3,"rls":["ADM"]}' AUTO_INCREMENT=1 ;


ALTER TABLE `buyer_type`
  ADD CONSTRAINT `buyer_type_fk1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `buyer_type_fk2` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);


CREATE TABLE IF NOT EXISTS `buyer` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `buyer_type_id` smallint(5) unsigned DEFAULT NULL,
  `name` varchar(320) COLLATE utf8_unicode_ci NOT NULL COMMENT '{"unique":true}',
  `description` varchar(1024) COLLATE utf8_unicode_ci DEFAULT NULL,
  `reference_number` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '{"unique":true}',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '{"unique":true}',
  `first_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `job` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `picture` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `address` varchar(500) COLLATE utf8_unicode_ci DEFAULT NULL,
  `zip_code` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `city` varchar(10) COLLATE utf8_unicode_ci DEFAULT NULL,
  `company_name` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `country_id` smallint(3) unsigned DEFAULT NULL,
  `language_id` smallint(5) unsigned DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `buyer_type_id` (`buyer_type_id`),
  KEY `country_id` (`country_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`),
  KEY `language_id` (`language_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Access","pstn":0,"rls":["ADM"]}' AUTO_INCREMENT=2 ;


ALTER TABLE `buyer`
  ADD CONSTRAINT `buyer_fk1` FOREIGN KEY (`buyer_type_id`) REFERENCES `buyer_type` (`id`),
  ADD CONSTRAINT `buyer_fk2` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`),
  ADD CONSTRAINT `buyer_fk3` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`),
  ADD CONSTRAINT `buyer_fk4` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `buyer_fk5` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

ALTER TABLE `tender` ADD `buyer_id` INT UNSIGNED NOT NULL AFTER `id` ,
ADD INDEX ( `buyer_id` ) ;
ALTER TABLE `tender` ADD CONSTRAINT `tender_fk0` FOREIGN KEY ( `buyer_id` ) REFERENCES `ubid_electricity`.`buyer` (
`id`
) ON DELETE RESTRICT ON UPDATE RESTRICT ;

ALTER TABLE `user` CHANGE `type` `type` ENUM( 'Guest', 'Subscriber', 'Administrator' ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT 'Guest';
