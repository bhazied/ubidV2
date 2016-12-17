<?php

namespace ContinuousNet\SportClubBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Events;
use Doctrine\Common\Collections\ArrayCollection as DoctrineCollection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Exclude;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Groups;
use FOS\UserBundle\Model\User as BaseUser;
use FOS\UserBundle\Model\GroupInterface;

/**
 * User Entity
 * 
 * Storing Users data to the database using Doctrine
 * 
 * PHP version 5.4.4
 * 
 * @category   Doctrine 2 Entity
 * @package    ContinuousNet\SportClubBundle\Entity
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://sportclub.continuousnet.com/ContinuousNet/SportClubBundle/Entity
 * @see        User
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`user`", indexes={@ORM\Index(name="company_id", columns={"company_id"}), @ORM\Index(name="country_id", columns={"country_id"}), @ORM\Index(name="city_id", columns={"city_id"}), @ORM\Index(name="language_id", columns={"language_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("username")
 * @UniqueEntity("salt")
 * @UniqueEntity("phone")
 * @UniqueEntity("email")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class User  extends BaseUser
{
    /**
     * @var integer
     * @access protected
     *
     * @ORM\Column(name="id", type="integer", nullable=false, unique=true)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * 
     * @Expose
     * 
     */
    protected $id;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="type", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $type;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="username", type="string", length=50, nullable=false, unique=true)
     * 
     * @Expose
     * 
     */
    protected $username;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="password", type="string", length=128, nullable=false, unique=false)
     * 
     * @Exclude
     * 
     */
    protected $password;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="salt", type="string", length=255, nullable=true, unique=true)
     * 
     * @Exclude
     * 
     */
    protected $salt;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="phone", type="string", length=20, nullable=true, unique=true)
     * 
     * @Expose
     * 
     */
    protected $phone;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="email", type="string", length=255, nullable=false, unique=true)
     * 
     * @Expose
     * 
     */
    protected $email;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="username_canonical", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $usernameCanonical;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="email_canonical", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $emailCanonical;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="gender", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $gender;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="first_name", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $firstName;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="last_name", type="string", length=100, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $lastName;

    /**
     * @var \DateTime
     * @access protected
     *
     * @ORM\Column(name="birth_date", type="date", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $birthDate;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="picture", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $picture;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="address", type="string", length=500, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $address;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="zip_code", type="string", length=10, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $zipCode;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="job", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $job;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="facebook_key", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $facebookKey;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="profile", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $profile;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="enable_oauth", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $enableOauth;

    /**
     * @var integer
     * @access protected
     *
     * @ORM\Column(name="session_timeout", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $sessionTimeout;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="multiple_session", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $multipleSession;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="phone_validated", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $phoneValidated;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="phone_validation_code", type="string", length=25, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $phoneValidationCode;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="email_validated", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $emailValidated;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="email_validation_code", type="string", length=500, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $emailValidationCode;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="authentication_mode", type="string", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $authenticationMode;

    /**
     * @var array
     * @access protected
     *
     * @ORM\Column(name="roles", type="array", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    protected $roles;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="enabled", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    protected $enabled;

    /**
     * @var string
     * @access protected
     *
     * @ORM\Column(name="confirmation_token", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $confirmationToken;

    /**
     * @var \DateTime
     * @access protected
     *
     * @ORM\Column(name="password_requested_at", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $passwordRequestedAt;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="locked", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    protected $locked;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="expired", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    protected $expired;

    /**
     * @var \DateTime
     * @access protected
     *
     * @ORM\Column(name="expires_at", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $expiresAt;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="credentials_expired", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    protected $credentialsExpired;

    /**
     * @var \DateTime
     * @access protected
     *
     * @ORM\Column(name="credentials_expire_at", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $credentialsExpireAt;

    /**
     * @var \DateTime
     * @access protected
     *
     * @ORM\Column(name="last_login", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $lastLogin;

    /**
     * @var \DateTime
     * @access protected
     *
     * @ORM\Column(name="last_failed_login", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $lastFailedLogin;

    /**
     * @var integer
     * @access protected
     *
     * @ORM\Column(name="login_count", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $loginCount;

    /**
     * @var integer
     * @access protected
     *
     * @ORM\Column(name="failed_login_count", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $failedLoginCount;

    /**
     * @var integer
     * @access protected
     *
     * @ORM\Column(name="last_failed_login_count", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $lastFailedLoginCount;

    /**
     * @var \DateTime
     * @access protected
     *
     * @ORM\Column(name="created_at", type="datetime", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    protected $createdAt;

    /**
     * @var \DateTime
     * @access protected
     *
     * @ORM\Column(name="modified_at", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $modifiedAt;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_match_confirmed", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushMatchConfirmed;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_30_minutes_before", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $push30MinutesBefore;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_line_ups_confirmed", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushLineUpsConfirmed;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_start_half_time_full_time", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushStartHalfTimeFullTime;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_goals", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushGoals;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_substitutions", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushSubstitutions;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_new_post", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushNewPost;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_new_video", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushNewVideo;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_new_audio", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushNewAudio;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_new_photos_gallery", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushNewPhotosGallery;

    /**
     * @var boolean
     * @access protected
     *
     * @ORM\Column(name="push_promotions", type="boolean", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    protected $pushPromotions;

    /**
     * @var \ContinuousNet\SportClubBundle\Entity\Company
     * @access protected
     *
     * @ORM\ManyToOne(targetEntity="Company")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="company_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    protected $company;

    /**
     * @var \ContinuousNet\SportClubBundle\Entity\Country
     * @access protected
     *
     * @ORM\ManyToOne(targetEntity="Country")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="country_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    protected $country;

    /**
     * @var \ContinuousNet\SportClubBundle\Entity\City
     * @access protected
     *
     * @ORM\ManyToOne(targetEntity="City")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="city_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    protected $city;

    /**
     * @var \ContinuousNet\SportClubBundle\Entity\Language
     * @access protected
     *
     * @ORM\ManyToOne(targetEntity="Language")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="language_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    protected $language;

    /**
     * @var \ContinuousNet\SportClubBundle\Entity\User
     * @access protected
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="creator_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    protected $creatorUser;

    /**
     * @var \ContinuousNet\SportClubBundle\Entity\User
     * @access protected
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="modifier_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    protected $modifierUser;

    /**
     * @var \Doctrine\Common\Collections\Collection
     * @access protected
     *
     * @ORM\ManyToMany(targetEntity="Group", inversedBy="users")
     * @ORM\JoinTable(name="users_groups",
     *     joinColumns={
     *         @ORM\JoinColumn(name="user_id", referencedColumnName="id")
     *     },
     *     inverseJoinColumns={
     *         @ORM\JoinColumn(name="group_id", referencedColumnName="id")
     *     }
     * )
     * 
     * @Expose
     * @MaxDepth(2)
     * 
     */
    protected $groups;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
        $this->groups = new DoctrineCollection();
        parent::__construct();
    }

    /**
     * Get id
     *
     * @access public
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set type
     *
     * @access public
     * @param string $type
     * @return User
     */
    public function setType($type = null)
    {
        $this->type = $type;
        return $this;
    }

    /**
     * Get type
     *
     * @access public
     * @return string 
     */
    public function getType()
    {
        return $this->type;
    }

    /**
     * Set username
     *
     * @access public
     * @param string $username
     * @return User
     */
    public function setUsername($username)
    {
        $this->username = $username;
        return $this;
    }

    /**
     * Get username
     *
     * @access public
     * @return string 
     */
    public function getUsername()
    {
        return $this->username;
    }

    /**
     * Set password
     *
     * @access public
     * @param string $password
     * @return User
     */
    public function setPassword($password)
    {
        $this->password = $password;
        return $this;
    }

    /**
     * Get password
     *
     * @access public
     * @return string 
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Set salt
     *
     * @access public
     * @param string $salt
     * @return User
     */
    public function setSalt($salt = null)
    {
        $this->salt = $salt;
        return $this;
    }

    /**
     * Get salt
     *
     * @access public
     * @return string 
     */
    public function getSalt()
    {
        return $this->salt;
    }

    /**
     * Set phone
     *
     * @access public
     * @param string $phone
     * @return User
     */
    public function setPhone($phone = null)
    {
        $this->phone = $phone;
        return $this;
    }

    /**
     * Get phone
     *
     * @access public
     * @return string 
     */
    public function getPhone()
    {
        return $this->phone;
    }

    /**
     * Set email
     *
     * @access public
     * @param string $email
     * @return User
     */
    public function setEmail($email)
    {
        $this->email = $email;
        return $this;
    }

    /**
     * Get email
     *
     * @access public
     * @return string 
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set usernameCanonical
     *
     * @access public
     * @param string $usernameCanonical
     * @return User
     */
    public function setUsernameCanonical($usernameCanonical = null)
    {
        $this->usernameCanonical = $usernameCanonical;
        return $this;
    }

    /**
     * Get usernameCanonical
     *
     * @access public
     * @return string 
     */
    public function getUsernameCanonical()
    {
        return $this->usernameCanonical;
    }

    /**
     * Set emailCanonical
     *
     * @access public
     * @param string $emailCanonical
     * @return User
     */
    public function setEmailCanonical($emailCanonical = null)
    {
        $this->emailCanonical = $emailCanonical;
        return $this;
    }

    /**
     * Get emailCanonical
     *
     * @access public
     * @return string 
     */
    public function getEmailCanonical()
    {
        return $this->emailCanonical;
    }

    /**
     * Set gender
     *
     * @access public
     * @param string $gender
     * @return User
     */
    public function setGender($gender = null)
    {
        $this->gender = $gender;
        return $this;
    }

    /**
     * Get gender
     *
     * @access public
     * @return string 
     */
    public function getGender()
    {
        return $this->gender;
    }

    /**
     * Set firstName
     *
     * @access public
     * @param string $firstName
     * @return User
     */
    public function setFirstName($firstName = null)
    {
        $this->firstName = $firstName;
        return $this;
    }

    /**
     * Get firstName
     *
     * @access public
     * @return string 
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * Set lastName
     *
     * @access public
     * @param string $lastName
     * @return User
     */
    public function setLastName($lastName = null)
    {
        $this->lastName = $lastName;
        return $this;
    }

    /**
     * Get lastName
     *
     * @access public
     * @return string 
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * Set birthDate
     *
     * @access public
     * @param \DateTime $birthDate
     * @return User
     */
    public function setBirthDate(\DateTime $birthDate = null)
    {
        $this->birthDate = $birthDate;
        return $this;
    }

    /**
     * Get birthDate
     *
     * @access public
     * @return \DateTime 
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }

    /**
     * Set picture
     *
     * @access public
     * @param string $picture
     * @return User
     */
    public function setPicture($picture = null)
    {
        $this->picture = $picture;
        return $this;
    }

    /**
     * Get picture
     *
     * @access public
     * @return string 
     */
    public function getPicture()
    {
        return $this->picture;
    }

    /**
     * Set address
     *
     * @access public
     * @param string $address
     * @return User
     */
    public function setAddress($address = null)
    {
        $this->address = $address;
        return $this;
    }

    /**
     * Get address
     *
     * @access public
     * @return string 
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * Set zipCode
     *
     * @access public
     * @param string $zipCode
     * @return User
     */
    public function setZipCode($zipCode = null)
    {
        $this->zipCode = $zipCode;
        return $this;
    }

    /**
     * Get zipCode
     *
     * @access public
     * @return string 
     */
    public function getZipCode()
    {
        return $this->zipCode;
    }

    /**
     * Set job
     *
     * @access public
     * @param string $job
     * @return User
     */
    public function setJob($job = null)
    {
        $this->job = $job;
        return $this;
    }

    /**
     * Get job
     *
     * @access public
     * @return string 
     */
    public function getJob()
    {
        return $this->job;
    }

    /**
     * Set facebookKey
     *
     * @access public
     * @param string $facebookKey
     * @return User
     */
    public function setFacebookKey($facebookKey = null)
    {
        $this->facebookKey = $facebookKey;
        return $this;
    }

    /**
     * Get facebookKey
     *
     * @access public
     * @return string 
     */
    public function getFacebookKey()
    {
        return $this->facebookKey;
    }

    /**
     * Set profile
     *
     * @access public
     * @param string $profile
     * @return User
     */
    public function setProfile($profile = null)
    {
        $this->profile = $profile;
        return $this;
    }

    /**
     * Get profile
     *
     * @access public
     * @return string 
     */
    public function getProfile()
    {
        return $this->profile;
    }

    /**
     * Set enableOauth
     *
     * @access public
     * @param boolean $enableOauth
     * @return User
     */
    public function setEnableOauth($enableOauth = null)
    {
        $this->enableOauth = $enableOauth;
        return $this;
    }

    /**
     * Get enableOauth
     *
     * @access public
     * @return boolean 
     */
    public function getEnableOauth()
    {
        return $this->enableOauth;
    }

    /**
     * Set sessionTimeout
     *
     * @access public
     * @param integer $sessionTimeout
     * @return User
     */
    public function setSessionTimeout($sessionTimeout = null)
    {
        $this->sessionTimeout = $sessionTimeout;
        return $this;
    }

    /**
     * Get sessionTimeout
     *
     * @access public
     * @return integer 
     */
    public function getSessionTimeout()
    {
        return $this->sessionTimeout;
    }

    /**
     * Set multipleSession
     *
     * @access public
     * @param boolean $multipleSession
     * @return User
     */
    public function setMultipleSession($multipleSession = null)
    {
        $this->multipleSession = $multipleSession;
        return $this;
    }

    /**
     * Get multipleSession
     *
     * @access public
     * @return boolean 
     */
    public function getMultipleSession()
    {
        return $this->multipleSession;
    }

    /**
     * Set phoneValidated
     *
     * @access public
     * @param boolean $phoneValidated
     * @return User
     */
    public function setPhoneValidated($phoneValidated = null)
    {
        $this->phoneValidated = $phoneValidated;
        return $this;
    }

    /**
     * Get phoneValidated
     *
     * @access public
     * @return boolean 
     */
    public function getPhoneValidated()
    {
        return $this->phoneValidated;
    }

    /**
     * Set phoneValidationCode
     *
     * @access public
     * @param string $phoneValidationCode
     * @return User
     */
    public function setPhoneValidationCode($phoneValidationCode = null)
    {
        $this->phoneValidationCode = $phoneValidationCode;
        return $this;
    }

    /**
     * Get phoneValidationCode
     *
     * @access public
     * @return string 
     */
    public function getPhoneValidationCode()
    {
        return $this->phoneValidationCode;
    }

    /**
     * Set emailValidated
     *
     * @access public
     * @param boolean $emailValidated
     * @return User
     */
    public function setEmailValidated($emailValidated = null)
    {
        $this->emailValidated = $emailValidated;
        return $this;
    }

    /**
     * Get emailValidated
     *
     * @access public
     * @return boolean 
     */
    public function getEmailValidated()
    {
        return $this->emailValidated;
    }

    /**
     * Set emailValidationCode
     *
     * @access public
     * @param string $emailValidationCode
     * @return User
     */
    public function setEmailValidationCode($emailValidationCode = null)
    {
        $this->emailValidationCode = $emailValidationCode;
        return $this;
    }

    /**
     * Get emailValidationCode
     *
     * @access public
     * @return string 
     */
    public function getEmailValidationCode()
    {
        return $this->emailValidationCode;
    }

    /**
     * Set authenticationMode
     *
     * @access public
     * @param string $authenticationMode
     * @return User
     */
    public function setAuthenticationMode($authenticationMode = null)
    {
        $this->authenticationMode = $authenticationMode;
        return $this;
    }

    /**
     * Get authenticationMode
     *
     * @access public
     * @return string 
     */
    public function getAuthenticationMode()
    {
        return $this->authenticationMode;
    }

    /**
     * Set roles
     *
     * @access public
     * @param array $roles
     * @return User
     */
    public function setRoles(array $roles)
    {
        $this->roles = $roles;
        return $this;
    }

    /**
     * Get roles
     *
     * @access public
     * @return array 
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * Set enabled
     *
     * @access public
     * @param boolean $enabled
     * @return User
     */
    public function setEnabled($enabled)
    {
        $this->enabled = $enabled;
        return $this;
    }

    /**
     * Get enabled
     *
     * @access public
     * @return boolean 
     */
    public function getEnabled()
    {
        return $this->enabled;
    }

    /**
     * Set confirmationToken
     *
     * @access public
     * @param string $confirmationToken
     * @return User
     */
    public function setConfirmationToken($confirmationToken = null)
    {
        $this->confirmationToken = $confirmationToken;
        return $this;
    }

    /**
     * Get confirmationToken
     *
     * @access public
     * @return string 
     */
    public function getConfirmationToken()
    {
        return $this->confirmationToken;
    }

    /**
     * Set passwordRequestedAt
     *
     * @access public
     * @param \DateTime $passwordRequestedAt
     * @return User
     */
    public function setPasswordRequestedAt(\DateTime $passwordRequestedAt = null)
    {
        $this->passwordRequestedAt = $passwordRequestedAt;
        return $this;
    }

    /**
     * Get passwordRequestedAt
     *
     * @access public
     * @return \DateTime 
     */
    public function getPasswordRequestedAt()
    {
        return $this->passwordRequestedAt;
    }

    /**
     * Set locked
     *
     * @access public
     * @param boolean $locked
     * @return User
     */
    public function setLocked($locked)
    {
        $this->locked = $locked;
        return $this;
    }

    /**
     * Get locked
     *
     * @access public
     * @return boolean 
     */
    public function getLocked()
    {
        return $this->locked;
    }

    /**
     * Set expired
     *
     * @access public
     * @param boolean $expired
     * @return User
     */
    public function setExpired($expired)
    {
        $this->expired = $expired;
        return $this;
    }

    /**
     * Get expired
     *
     * @access public
     * @return boolean 
     */
    public function getExpired()
    {
        return $this->expired;
    }

    /**
     * Set expiresAt
     *
     * @access public
     * @param \DateTime $expiresAt
     * @return User
     */
    public function setExpiresAt(\DateTime $expiresAt = null)
    {
        $this->expiresAt = $expiresAt;
        return $this;
    }

    /**
     * Get expiresAt
     *
     * @access public
     * @return \DateTime 
     */
    public function getExpiresAt()
    {
        return $this->expiresAt;
    }

    /**
     * Set credentialsExpired
     *
     * @access public
     * @param boolean $credentialsExpired
     * @return User
     */
    public function setCredentialsExpired($credentialsExpired)
    {
        $this->credentialsExpired = $credentialsExpired;
        return $this;
    }

    /**
     * Get credentialsExpired
     *
     * @access public
     * @return boolean 
     */
    public function getCredentialsExpired()
    {
        return $this->credentialsExpired;
    }

    /**
     * Set credentialsExpireAt
     *
     * @access public
     * @param \DateTime $credentialsExpireAt
     * @return User
     */
    public function setCredentialsExpireAt(\DateTime $credentialsExpireAt = null)
    {
        $this->credentialsExpireAt = $credentialsExpireAt;
        return $this;
    }

    /**
     * Get credentialsExpireAt
     *
     * @access public
     * @return \DateTime 
     */
    public function getCredentialsExpireAt()
    {
        return $this->credentialsExpireAt;
    }

    /**
     * Set lastLogin
     *
     * @access public
     * @param \DateTime $lastLogin
     * @return User
     */
    public function setLastLogin(\DateTime $lastLogin = null)
    {
        $this->lastLogin = $lastLogin;
        return $this;
    }

    /**
     * Get lastLogin
     *
     * @access public
     * @return \DateTime 
     */
    public function getLastLogin()
    {
        return $this->lastLogin;
    }

    /**
     * Set lastFailedLogin
     *
     * @access public
     * @param \DateTime $lastFailedLogin
     * @return User
     */
    public function setLastFailedLogin(\DateTime $lastFailedLogin = null)
    {
        $this->lastFailedLogin = $lastFailedLogin;
        return $this;
    }

    /**
     * Get lastFailedLogin
     *
     * @access public
     * @return \DateTime 
     */
    public function getLastFailedLogin()
    {
        return $this->lastFailedLogin;
    }

    /**
     * Set loginCount
     *
     * @access public
     * @param integer $loginCount
     * @return User
     */
    public function setLoginCount($loginCount = null)
    {
        $this->loginCount = $loginCount;
        return $this;
    }

    /**
     * Get loginCount
     *
     * @access public
     * @return integer 
     */
    public function getLoginCount()
    {
        return $this->loginCount;
    }

    /**
     * Set failedLoginCount
     *
     * @access public
     * @param integer $failedLoginCount
     * @return User
     */
    public function setFailedLoginCount($failedLoginCount = null)
    {
        $this->failedLoginCount = $failedLoginCount;
        return $this;
    }

    /**
     * Get failedLoginCount
     *
     * @access public
     * @return integer 
     */
    public function getFailedLoginCount()
    {
        return $this->failedLoginCount;
    }

    /**
     * Set lastFailedLoginCount
     *
     * @access public
     * @param integer $lastFailedLoginCount
     * @return User
     */
    public function setLastFailedLoginCount($lastFailedLoginCount = null)
    {
        $this->lastFailedLoginCount = $lastFailedLoginCount;
        return $this;
    }

    /**
     * Get lastFailedLoginCount
     *
     * @access public
     * @return integer 
     */
    public function getLastFailedLoginCount()
    {
        return $this->lastFailedLoginCount;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return User
     */
    public function setCreatedAt(\DateTime $createdAt)
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    /**
     * Get createdAt
     *
     * @access public
     * @return \DateTime 
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set modifiedAt
     *
     * @access public
     * @param \DateTime $modifiedAt
     * @return User
     */
    public function setModifiedAt(\DateTime $modifiedAt = null)
    {
        $this->modifiedAt = $modifiedAt;
        return $this;
    }

    /**
     * Get modifiedAt
     *
     * @access public
     * @return \DateTime 
     */
    public function getModifiedAt()
    {
        return $this->modifiedAt;
    }

    /**
     * Set pushMatchConfirmed
     *
     * @access public
     * @param boolean $pushMatchConfirmed
     * @return User
     */
    public function setPushMatchConfirmed($pushMatchConfirmed = null)
    {
        $this->pushMatchConfirmed = $pushMatchConfirmed;
        return $this;
    }

    /**
     * Get pushMatchConfirmed
     *
     * @access public
     * @return boolean 
     */
    public function getPushMatchConfirmed()
    {
        return $this->pushMatchConfirmed;
    }

    /**
     * Set push30MinutesBefore
     *
     * @access public
     * @param boolean $push30MinutesBefore
     * @return User
     */
    public function setPush30MinutesBefore($push30MinutesBefore = null)
    {
        $this->push30MinutesBefore = $push30MinutesBefore;
        return $this;
    }

    /**
     * Get push30MinutesBefore
     *
     * @access public
     * @return boolean 
     */
    public function getPush30MinutesBefore()
    {
        return $this->push30MinutesBefore;
    }

    /**
     * Set pushLineUpsConfirmed
     *
     * @access public
     * @param boolean $pushLineUpsConfirmed
     * @return User
     */
    public function setPushLineUpsConfirmed($pushLineUpsConfirmed = null)
    {
        $this->pushLineUpsConfirmed = $pushLineUpsConfirmed;
        return $this;
    }

    /**
     * Get pushLineUpsConfirmed
     *
     * @access public
     * @return boolean 
     */
    public function getPushLineUpsConfirmed()
    {
        return $this->pushLineUpsConfirmed;
    }

    /**
     * Set pushStartHalfTimeFullTime
     *
     * @access public
     * @param boolean $pushStartHalfTimeFullTime
     * @return User
     */
    public function setPushStartHalfTimeFullTime($pushStartHalfTimeFullTime = null)
    {
        $this->pushStartHalfTimeFullTime = $pushStartHalfTimeFullTime;
        return $this;
    }

    /**
     * Get pushStartHalfTimeFullTime
     *
     * @access public
     * @return boolean 
     */
    public function getPushStartHalfTimeFullTime()
    {
        return $this->pushStartHalfTimeFullTime;
    }

    /**
     * Set pushGoals
     *
     * @access public
     * @param boolean $pushGoals
     * @return User
     */
    public function setPushGoals($pushGoals = null)
    {
        $this->pushGoals = $pushGoals;
        return $this;
    }

    /**
     * Get pushGoals
     *
     * @access public
     * @return boolean 
     */
    public function getPushGoals()
    {
        return $this->pushGoals;
    }

    /**
     * Set pushSubstitutions
     *
     * @access public
     * @param boolean $pushSubstitutions
     * @return User
     */
    public function setPushSubstitutions($pushSubstitutions = null)
    {
        $this->pushSubstitutions = $pushSubstitutions;
        return $this;
    }

    /**
     * Get pushSubstitutions
     *
     * @access public
     * @return boolean 
     */
    public function getPushSubstitutions()
    {
        return $this->pushSubstitutions;
    }

    /**
     * Set pushNewPost
     *
     * @access public
     * @param boolean $pushNewPost
     * @return User
     */
    public function setPushNewPost($pushNewPost = null)
    {
        $this->pushNewPost = $pushNewPost;
        return $this;
    }

    /**
     * Get pushNewPost
     *
     * @access public
     * @return boolean 
     */
    public function getPushNewPost()
    {
        return $this->pushNewPost;
    }

    /**
     * Set pushNewVideo
     *
     * @access public
     * @param boolean $pushNewVideo
     * @return User
     */
    public function setPushNewVideo($pushNewVideo = null)
    {
        $this->pushNewVideo = $pushNewVideo;
        return $this;
    }

    /**
     * Get pushNewVideo
     *
     * @access public
     * @return boolean 
     */
    public function getPushNewVideo()
    {
        return $this->pushNewVideo;
    }

    /**
     * Set pushNewAudio
     *
     * @access public
     * @param boolean $pushNewAudio
     * @return User
     */
    public function setPushNewAudio($pushNewAudio = null)
    {
        $this->pushNewAudio = $pushNewAudio;
        return $this;
    }

    /**
     * Get pushNewAudio
     *
     * @access public
     * @return boolean 
     */
    public function getPushNewAudio()
    {
        return $this->pushNewAudio;
    }

    /**
     * Set pushNewPhotosGallery
     *
     * @access public
     * @param boolean $pushNewPhotosGallery
     * @return User
     */
    public function setPushNewPhotosGallery($pushNewPhotosGallery = null)
    {
        $this->pushNewPhotosGallery = $pushNewPhotosGallery;
        return $this;
    }

    /**
     * Get pushNewPhotosGallery
     *
     * @access public
     * @return boolean 
     */
    public function getPushNewPhotosGallery()
    {
        return $this->pushNewPhotosGallery;
    }

    /**
     * Set pushPromotions
     *
     * @access public
     * @param boolean $pushPromotions
     * @return User
     */
    public function setPushPromotions($pushPromotions = null)
    {
        $this->pushPromotions = $pushPromotions;
        return $this;
    }

    /**
     * Get pushPromotions
     *
     * @access public
     * @return boolean 
     */
    public function getPushPromotions()
    {
        return $this->pushPromotions;
    }

    /**
     * Set company
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\Company $company
     * @return User
     */
    public function setCompany(Company $company = null)
    {
        $this->company = $company;
        return $this;
    }

    /**
     * Get company
     *
     * @access public
     * @return \ContinuousNet\SportClubBundle\Entity\Company 
     */
    public function getCompany()
    {
        return $this->company;
    }

    /**
     * Set country
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\Country $country
     * @return User
     */
    public function setCountry(Country $country = null)
    {
        $this->country = $country;
        return $this;
    }

    /**
     * Get country
     *
     * @access public
     * @return \ContinuousNet\SportClubBundle\Entity\Country 
     */
    public function getCountry()
    {
        return $this->country;
    }

    /**
     * Set city
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\City $city
     * @return User
     */
    public function setCity(City $city = null)
    {
        $this->city = $city;
        return $this;
    }

    /**
     * Get city
     *
     * @access public
     * @return \ContinuousNet\SportClubBundle\Entity\City 
     */
    public function getCity()
    {
        return $this->city;
    }

    /**
     * Set language
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\Language $language
     * @return User
     */
    public function setLanguage(Language $language = null)
    {
        $this->language = $language;
        return $this;
    }

    /**
     * Get language
     *
     * @access public
     * @return \ContinuousNet\SportClubBundle\Entity\Language 
     */
    public function getLanguage()
    {
        return $this->language;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\User $creatorUser
     * @return User
     */
    public function setCreatorUser(User $creatorUser = null)
    {
        $this->creatorUser = $creatorUser;
        return $this;
    }

    /**
     * Get creatorUser
     *
     * @access public
     * @return \ContinuousNet\SportClubBundle\Entity\User 
     */
    public function getCreatorUser()
    {
        return $this->creatorUser;
    }

    /**
     * Set modifierUser
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\User $modifierUser
     * @return User
     */
    public function setModifierUser(User $modifierUser = null)
    {
        $this->modifierUser = $modifierUser;
        return $this;
    }

    /**
     * Get modifierUser
     *
     * @access public
     * @return \ContinuousNet\SportClubBundle\Entity\User 
     */
    public function getModifierUser()
    {
        return $this->modifierUser;
    }

    /**
     * Add group
     *
     * @access public
     * @param GroupInterface $group
     * @return User
     */
    public function addGroup(GroupInterface $group)
    {
        if (!$this->groups->contains($group))
        {
            $this->groups->add($group);
        }
        return $this;
    }

    /**
     * Remove group
     *
     * @access public
     * @param GroupInterface $group
     * @return User
     */
    public function removeGroup(GroupInterface $group)
    {
        if ($this->groups->contains($group))
        {
            $this->groups->removeElement($group);
        }
        return $this;
    }

    /**
     * Set group
     *
     * @access public
     * @param \Doctrine\Common\Collections\Collection
     * @return User
     */
    public function setGroups($groups)
    {
        $this->groups = $groups;
        return $this;
    }

    /**
     * Get group
     *
     * @access public
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getGroups()
    {
        return $this->groups;
    }

    /**
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->setModifiedAt(new \DateTime('now'));
    }

    /**
     * @ORM\PrePersist
     */
    public function prePersist()
    {
        if (is_null($this->getCreatedAt()))
        {
            $this->setCreatedAt(new \DateTime('now'));
        }
    }
}
