
--
-- Table structure for table `banner`
--

CREATE TABLE IF NOT EXISTS `banner` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `banner_type_id` smallint(5) unsigned NOT NULL,
  `name` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `picture` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `closable` tinyint(1) unsigned DEFAULT NULL,
  `count_down` smallint(5) unsigned DEFAULT NULL,
  `iphone_action` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `android_action` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `web_action` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `gender` enum('All','Male','Female') COLLATE utf8_unicode_ci DEFAULT NULL,
  `min_age` smallint(6) DEFAULT NULL,
  `max_age` smallint(6) DEFAULT NULL,
  `priority` smallint(6) DEFAULT NULL,
  `web_url` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `phone_number_to_call` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sms_mobile_number` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sms_body` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email_adress` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email_subject` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email_body` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `android_app_url` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `iphone_app_url` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `youtube_url` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `map_latitude` float DEFAULT NULL,
  `map_longitude` float DEFAULT NULL,
  `screen` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `screen_parameters` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `total_hits` smallint(6) DEFAULT NULL,
  `today_hits` smallint(6) DEFAULT NULL,
  `total_clicks` smallint(6) DEFAULT NULL,
  `today_clicks` smallint(6) DEFAULT NULL,
  `template` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `ad_text` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `text_color` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `background_color` varchar(320) COLLATE utf8_unicode_ci DEFAULT NULL,
  `auto_publishing` tinyint(1) NOT NULL,
  `start_publishing` datetime DEFAULT NULL,
  `end_publishing` datetime DEFAULT NULL,
  `start_publishing_time` smallint(6) DEFAULT NULL,
  `end_publishing_time` smallint(6) DEFAULT NULL,
  `max_clicks_per_day` smallint(6) DEFAULT NULL,
  `max_total_clicks` smallint(6) DEFAULT NULL,
  `max_hits_per_day` smallint(6) DEFAULT NULL,
  `max_total_hits` smallint(6) DEFAULT NULL,
  `status` enum('Draft','Online','Deactivated','Offline','Deleted','Archived') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Draft' COMMENT '{"only":["ROLE_ADMIN_PUBLISHER"]}',
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(9) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(9) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `banner_type_id` (`banner_type_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Adserving","pstn":1,"rls":["ADM"]}';

-- --------------------------------------------------------

--
-- Table structure for table `banners_banner_positions`
--

CREATE TABLE IF NOT EXISTS `banners_banner_positions` (
  `banner_id` smallint(5) unsigned NOT NULL,
  `banner_position_id` smallint(5) unsigned NOT NULL,
  PRIMARY KEY (`banner_id`,`banner_position_id`),
  KEY `banner_id` (`banner_id`),
  KEY `banner_position_id` (`banner_position_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banner_position`
--

CREATE TABLE IF NOT EXISTS `banner_position` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `items_number` smallint(5) unsigned NOT NULL,
  `display_time` smallint(5) unsigned NOT NULL,
  `is_full_screen` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `display_one_time` tinyint(1) unsigned NOT NULL,
  `is_published` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Adserving","pstn":3,"rls":["ADM"]}';

-- --------------------------------------------------------

--
-- Table structure for table `banner_type`
--

CREATE TABLE IF NOT EXISTS `banner_type` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `slug` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `extensions` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `mime_types` varchar(320) COLLATE utf8_unicode_ci NOT NULL,
  `is_published` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Adserving","pstn":2,"rls":["ADM"]}';

-- --------------------------------------------------------

--
-- Table structure for table `click`
--

CREATE TABLE IF NOT EXISTS `click` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `visit_id` int(10) unsigned DEFAULT NULL,
  `banner_id` smallint(5) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(9) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  PRIMARY KEY (`id`),
  KEY `visit_id` (`visit_id`),
  KEY `banner_id` (`banner_id`),
  KEY `creator_user_id` (`creator_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Adserving","pstn":3,"rls":["ADM"]}';

-- --------------------------------------------------------

--
-- Table structure for table `impression`
--

CREATE TABLE IF NOT EXISTS `impression` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `visit_id` int(10) unsigned DEFAULT NULL,
  `banner_id` smallint(56) unsigned NOT NULL,
  `created_at` datetime NOT NULL,
  `creator_user_id` mediumint(9) unsigned NOT NULL COMMENT '{"prefix":"creator_"}',
  PRIMARY KEY (`id`),
  KEY `visit_id` (`visit_id`),
  KEY `banner_id` (`banner_id`),
  KEY `creator_user_id` (`creator_user_id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Adserving","pstn":4,"rls":["ADM"]}';

--
-- Constraints for dumped tables
--

--
-- Constraints for table `banner`
--
ALTER TABLE `banner`
  ADD CONSTRAINT `banner_fk1` FOREIGN KEY (`banner_type_id`) REFERENCES `banner_type` (`id`),
  ADD CONSTRAINT `banner_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `banner_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `banners_banner_positions`
--
ALTER TABLE `banners_banner_positions`
  ADD CONSTRAINT `banner_id_fk1` FOREIGN KEY (`banner_id`) REFERENCES `banner` (`id`),
  ADD CONSTRAINT `banner_position_id_fk2` FOREIGN KEY (`banner_position_id`) REFERENCES `banner_position` (`id`);

--
-- Constraints for table `banner_position`
--
ALTER TABLE `banner_position`
  ADD CONSTRAINT `banner_position_fk1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `banner_position_fk2` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `banner_type`
--
ALTER TABLE `banner_type`
  ADD CONSTRAINT `banner_type_fk1` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `banner_type_fk2` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `click`
--
ALTER TABLE `click`
  ADD CONSTRAINT `click_fk1` FOREIGN KEY (`visit_id`) REFERENCES `visit` (`id`),
  ADD CONSTRAINT `click_fk2` FOREIGN KEY (`banner_id`) REFERENCES `banner` (`id`),
  ADD CONSTRAINT `click_fk3` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`);

