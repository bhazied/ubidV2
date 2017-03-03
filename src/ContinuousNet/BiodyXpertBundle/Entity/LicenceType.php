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
 * Licence Type Entity
 * 
 * Storing LicenceTypes data to the database using Doctrine
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
 * @see        LicenceType
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`licence_type`", indexes={@ORM\Index(name="default_template_id", columns={"default_template_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class LicenceType 
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
     * @ORM\Column(name="`name`", type="string", length=20, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $name;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`type`", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $type;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`max_users_number`", type="integer", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $maxUsersNumber;

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
     * @var \ContinuousNet\BiodyXpertBundle\Entity\Template
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="Template")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="default_template_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $defaultTemplate;

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
     * @var \Doctrine\Common\Collections\Collection
     * @access private
     *
     * @ORM\ManyToMany(targetEntity="IndicatorType")
     * @ORM\JoinTable(name="licence_types_indicator_types",
     *     joinColumns={
     *         @ORM\JoinColumn(name="licence_type_id", referencedColumnName="id")
     *     },
     *     inverseJoinColumns={
     *         @ORM\JoinColumn(name="indicator_type_id", referencedColumnName="id")
     *     }
     * )
     * 
     * @Expose
     * @MaxDepth(2)
     * 
     */
    private $indicatorTypes;

    /**
     * Constructor
     * 
     * @access public
     */
    public function __construct()
    {
        $this->indicatorTypes = new DoctrineCollection();
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
     * Set name
     *
     * @access public
     * @param string $name
     * @return LicenceType
     */
    public function setName($name = null)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     *
     * @access public
     * @return string 
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set type
     *
     * @access public
     * @param string $type
     * @return LicenceType
     */
    public function setType($type)
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
     * Set maxUsersNumber
     *
     * @access public
     * @param integer $maxUsersNumber
     * @return LicenceType
     */
    public function setMaxUsersNumber($maxUsersNumber)
    {
        $this->maxUsersNumber = $maxUsersNumber;
        return $this;
    }

    /**
     * Get maxUsersNumber
     *
     * @access public
     * @return integer 
     */
    public function getMaxUsersNumber()
    {
        return $this->maxUsersNumber;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return LicenceType
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
     * @return LicenceType
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
     * Set defaultTemplate
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\Template $defaultTemplate
     * @return LicenceType
     */
    public function setDefaultTemplate(Template $defaultTemplate = null)
    {
        $this->defaultTemplate = $defaultTemplate;
        return $this;
    }

    /**
     * Get defaultTemplate
     *
     * @access public
     * @return \ContinuousNet\BiodyXpertBundle\Entity\Template 
     */
    public function getDefaultTemplate()
    {
        return $this->defaultTemplate;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return LicenceType
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
     * @return LicenceType
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
     * Add indicatorType
     *
     * @access public
     * @param IndicatorType $indicatorType
     * @return LicenceType
     */
    public function addIndicatorType(IndicatorType $indicatorType)
    {
        if (!$this->indicatorTypes->contains($indicatorType))
        {
            $this->indicatorTypes->add($indicatorType);
        }
        return $this;
    }

    /**
     * Remove indicatorType
     *
     * @access public
     * @param IndicatorType $indicatorType
     * @return LicenceType
     */
    public function removeIndicatorType(IndicatorType $indicatorType)
    {
        if ($this->indicatorTypes->contains($indicatorType))
        {
            $this->indicatorTypes->removeElement($indicatorType);
        }
        return $this;
    }

    /**
     * Set indicatorType
     *
     * @access public
     * @param \Doctrine\Common\Collections\Collection
     * @return LicenceType
     */
    public function setIndicatorTypes($indicatorTypes)
    {
        $this->indicatorTypes = $indicatorTypes;
        return $this;
    }

    /**
     * Get indicatorType
     *
     * @access public
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getIndicatorTypes()
    {
        return $this->indicatorTypes;
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
