ALTER TABLE `tender`
  DROP `attachment_file_1`,
  DROP `attachment_file_2`,
  DROP `attachment_file_3`,
  DROP `attachment_file_4`;

ALTER TABLE `tender` ADD `attachment_files` VARCHAR( 1000 ) NULL AFTER `phone` ;

ALTER TABLE `bid`
  DROP `attachment_file_1`,
  DROP `attachment_file_2`,
  DROP `attachment_file_3`,
  DROP `attachment_file_4`;

ALTER TABLE `bid` ADD `attachment_files` VARCHAR( 1000 ) NULL AFTER `phone` ;

ALTER TABLE `tender` ADD `validated` TINYINT( 1 ) UNSIGNED NOT NULL AFTER `source` ;