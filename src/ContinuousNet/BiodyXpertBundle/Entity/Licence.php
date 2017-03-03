<?php

namespace ContinuousNet\BiodyXpertBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Doctrine\ORM\Events;
use Doctrine\Common\Collections\ArrayCollection as DoctrineCollection;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;;
use JMS\Serializer\Annotation\ExclusionPolicy;
use JMS\Serializer\Annotation\Exclude;
use JMS\Serializer\Annotation\Expose;
use JMS\Serializer\Annotation\MaxDepth;
use JMS\Serializer\Annotation\Groups;

/**
 * Licence Entity
 * 
 * Storing Licences data to the database using Doctrine
 * 
 * PHP version 5.4.4
 * 
 * @category   Doctrine 2 Entity
 * @package    ContinuousNet\BiodyXpertBundle\Entity
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://biodyxpert.continuousnet.com/ContinuousNet/BiodyXpertBundle/Entity
 * @see        Licence
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`licence`", indexes={@ORM\Index(name="licence_type_id", columns={"licence_type_id"}), @ORM\Index(name="used_by_user_id", columns={"used_by_user_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("licenceKey")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Licence 
{
    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="id", type="integer", nullable=false, unique=true)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     * 
     * @Expose
     * 
     */
    private $id;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`licence_key`", type="string", length=36, nullable=true, unique=true)
     * 
     * @Expose
     * 
     */
    private $licenceKey;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`current_users_number`", type="integer", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $currentUsersNumber;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`customer_name`", type="string", length=511, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $customerName;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`created_at`", type="datetime", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $createdAt;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`modified_at`", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $modifiedAt;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\LicenceType
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="LicenceType")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="licence_type_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $licenceType;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\User
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="used_by_user_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $usedByUser;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\User
     * @access private
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
    private $creatorUser;

    /**
     * @var \ContinuousNet\BiodyXpertBundle\Entity\User
     * @access private
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
    private $modifierUser;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
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
     * Set licenceKey
     *
     * @access public
     * @param string $licenceKey
     * @return Licence
     */
    public function setLicenceKey($licenceKey = null)
    {
        $this->licenceKey = $licenceKey;
        return $this;
    }

    /**
     * Get licenceKey
     *
     * @access public
     * @return string 
     */
    public function getLicenceKey()
    {
        return $this->licenceKey;
    }

    /**
     * Set currentUsersNumber
     *
     * @access public
     * @param integer $currentUsersNumber
     * @return Licence
     */
    public function setCurrentUsersNumber($currentUsersNumber)
    {
        $this->currentUsersNumber = $currentUsersNumber;
        return $this;
    }

    /**
     * Get currentUsersNumber
     *
     * @access public
     * @return integer 
     */
    public function getCurrentUsersNumber()
    {
        return $this->currentUsersNumber;
    }

    /**
     * Set customerName
     *
     * @access public
     * @param string $customerName
     * @return Licence
     */
    public function setCustomerName($customerName = null)
    {
        $this->customerName = $customerName;
        return $this;
    }

    /**
     * Get customerName
     *
     * @access public
     * @return string 
     */
    public function getCustomerName()
    {
        return $this->customerName;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Licence
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
     * @return Licence
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
     * Set licenceType
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\LicenceType $licenceType
     * @return Licence
     */
    public function setLicenceType(LicenceType $licenceType = null)
    {
        $this->licenceType = $licenceType;
        return $this;
    }

    /**
     * Get licenceType
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\LicenceType 
     */
    public function getLicenceType()
    {
        return $this->licenceType;
    }

    /**
     * Set usedByUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $usedByUser
     * @return Licence
     */
    public function setUsedByUser(User $usedByUser = null)
    {
        $this->usedByUser = $usedByUser;
        return $this;
    }

    /**
     * Get usedByUser
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\User 
     */
    public function getUsedByUser()
    {
        return $this->usedByUser;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return Licence
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
     * @return \ContinuousNet\BiodyXpertBundle\Entity\User 
     */
    public function getCreatorUser()
    {
        return $this->creatorUser;
    }

    /**
     * Set modifierUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $modifierUser
     * @return Licence
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
     * @return \ContinuousNet\BiodyXpertBundle\Entity\User 
     */
    public function getModifierUser()
    {
        return $this->modifierUser;
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
