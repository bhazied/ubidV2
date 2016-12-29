
CREATE TABLE IF NOT EXISTS `tender_bookmark` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `tender_id` int(10) unsigned DEFAULT NULL,
  `status` enum('Active','Inactive') COLLATE utf8_unicode_ci NOT NULL DEFAULT 'Active',
  `created_at` datetime NOT NULL COMMENT '{"order":"desc"}',
  `creator_user_id` mediumint(8) unsigned NOT NULL COMMENT '{"prefix":"creator_","fltr":["SUB"]}',
  `modified_at` datetime DEFAULT NULL,
  `modifier_user_id` mediumint(8) unsigned DEFAULT NULL COMMENT '{"prefix":"modifier_"}',
  PRIMARY KEY (`id`),
  KEY `tender_id` (`tender_id`),
  KEY `creator_user_id` (`creator_user_id`),
  KEY `modifier_user_id` (`modifier_user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='{"grp":"Access","pstn":5}' AUTO_INCREMENT=1 ;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tender_bookmark`
--
ALTER TABLE `tender_bookmark`
  ADD CONSTRAINT `tender_bookmark_fk1` FOREIGN KEY (`tender_id`) REFERENCES `tender` (`id`),
  ADD CONSTRAINT `tender_bookmark_fk2` FOREIGN KEY (`creator_user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `tender_bookmark_fk3` FOREIGN KEY (`modifier_user_id`) REFERENCES `user` (`id`);