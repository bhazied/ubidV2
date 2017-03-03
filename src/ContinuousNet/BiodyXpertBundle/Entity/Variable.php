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
 * Variable Entity
 * 
 * Storing Variables data to the database using Doctrine
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
 * @see        Variable
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`variable`", indexes={@ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @UniqueEntity("name")
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Variable 
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
     * @ORM\Column(name="`name`", type="string", length=320, nullable=false, unique=true)
     * 
     * @Expose
     * 
     */
    private $name;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`unit`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $unit;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`color`", type="string", length=7, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $color;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`min_limit`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $minLimit;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`max_limit`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $maxLimit;

    /**
     * @var float
     * @access private
     *
     * @ORM\Column(name="`multiplier`", type="float", precision=10, scale=0, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $multiplier;

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
     * Set name
     *
     * @access public
     * @param string $name
     * @return Variable
     */
    public function setName($name)
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
     * Set unit
     *
     * @access public
     * @param string $unit
     * @return Variable
     */
    public function setUnit($unit = null)
    {
        $this->unit = $unit;
        return $this;
    }

    /**
     * Get unit
     *
     * @access public
     * @return string 
     */
    public function getUnit()
    {
        return $this->unit;
    }

    /**
     * Set color
     *
     * @access public
     * @param string $color
     * @return Variable
     */
    public function setColor($color = null)
    {
        $this->color = $color;
        return $this;
    }

    /**
     * Get color
     *
     * @access public
     * @return string 
     */
    public function getColor()
    {
        return $this->color;
    }

    /**
     * Set minLimit
     *
     * @access public
     * @param float $minLimit
     * @return Variable
     */
    public function setMinLimit($minLimit = null)
    {
        $this->minLimit = $minLimit;
        return $this;
    }

    /**
     * Get minLimit
     *
     * @access public
     * @return float 
     */
    public function getMinLimit()
    {
        return $this->minLimit;
    }

    /**
     * Set maxLimit
     *
     * @access public
     * @param float $maxLimit
     * @return Variable
     */
    public function setMaxLimit($maxLimit = null)
    {
        $this->maxLimit = $maxLimit;
        return $this;
    }

    /**
     * Get maxLimit
     *
     * @access public
     * @return float 
     */
    public function getMaxLimit()
    {
        return $this->maxLimit;
    }

    /**
     * Set multiplier
     *
     * @access public
     * @param float $multiplier
     * @return Variable
     */
    public function setMultiplier($multiplier = null)
    {
        $this->multiplier = $multiplier;
        return $this;
    }

    /**
     * Get multiplier
     *
     * @access public
     * @return float 
     */
    public function getMultiplier()
    {
        return $this->multiplier;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Variable
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
     * @return Variable
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
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\BiodyXpertBundle\Entity\User $creatorUser
     * @return Variable
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
     * @return Variable
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
