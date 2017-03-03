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

/**
 * Quiz Entity
 * 
 * Storing Quizzes data to the database using Doctrine
 * 
 * PHP version 5.4.4
 * 
 * @category   Doctrine 2 Entity
 * @package    ContinuousNet\SportClubBundle\Entity
 * @author     Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version    Release: 1.0
 * @link       http://sportclub.continuousnet.com/ContinuousNet/SportClubBundle/Entity
 * @see        Quiz
 * @since      Class available since Release 1.0
 * @access     public
 * 
 * @ORM\Table(name="`quiz`", indexes={@ORM\Index(name="quiz_type_id", columns={"quiz_type_id"}), @ORM\Index(name="creator_user_id", columns={"creator_user_id"}), @ORM\Index(name="modifier_user_id", columns={"modifier_user_id"})})
 * @ORM\Entity
 * @ORM\HasLifecycleCallbacks()
 * 
 * @ExclusionPolicy("none")
 * 
 */
class Quiz 
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
     * @ORM\Column(name="`title`", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $title;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`title_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $titleAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`title_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $titleFr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slug`", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $slug;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slug_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slugAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`slug_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $slugFr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`picture`", type="string", length=255, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $picture;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`description`", type="text", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $description;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`description_ar`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $descriptionAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`description_fr`", type="text", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $descriptionFr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`kind`", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $kind;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`question`", type="string", length=320, nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $question;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`question_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $questionAr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`question_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $questionFr;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_1`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice1;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_1_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice1Ar;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_1_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice1Fr;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`choice_1_is_correct`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice1IsCorrect;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_2`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice2;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_2_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice2Ar;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_2_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice2Fr;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`choice_2_is_correct`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice2IsCorrect;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_3`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice3;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_3_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice3Ar;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_3_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice3Fr;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`choice_3_is_correct`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice3IsCorrect;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_4`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice4;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_4_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice4Ar;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_4_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice4Fr;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`choice_4_is_correct`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice4IsCorrect;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_5`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice5;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_5_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice5Ar;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_5_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice5Fr;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`choice_5_is_correct`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice5IsCorrect;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_6`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice6;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_6_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice6Ar;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_6_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice6Fr;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`choice_6_is_correct`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice6IsCorrect;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_7`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice7;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_7_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice7Ar;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_7_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice7Fr;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`choice_7_is_correct`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice7IsCorrect;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_8`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice8;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_8_ar`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice8Ar;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`choice_8_fr`", type="string", length=320, nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice8Fr;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`choice_8_is_correct`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $choice8IsCorrect;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`auto_publishing`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $autoPublishing;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`start_publishing`", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $startPublishing;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`end_publishing`", type="datetime", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $endPublishing;

    /**
     * @var \DateTime
     * @access private
     *
     * @ORM\Column(name="`publish_date`", type="date", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $publishDate;

    /**
     * @var string
     * @access private
     *
     * @ORM\Column(name="`status`", type="string", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $status;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`count_answers`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $countAnswers;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`count_winners`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $countWinners;

    /**
     * @var boolean
     * @access private
     *
     * @ORM\Column(name="`is_finished`", type="boolean", nullable=false, unique=false)
     * 
     * @Expose
     * 
     */
    private $isFinished;

    /**
     * @var integer
     * @access private
     *
     * @ORM\Column(name="`ordering`", type="integer", nullable=true, unique=false)
     * 
     * @Expose
     * 
     */
    private $ordering;

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
     * @var \ContinuousNet\SportClubBundle\Entity\QuizType
     * @access private
     *
     * @ORM\ManyToOne(targetEntity="QuizType")
     * @ORM\JoinColumns({
     *        @ORM\JoinColumn(name="quiz_type_id", referencedColumnName="id")
     * })
     * 
     * @Expose
     * @MaxDepth(1)
     * 
     */
    private $quizType;

    /**
     * @var \ContinuousNet\SportClubBundle\Entity\User
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
     * @var \ContinuousNet\SportClubBundle\Entity\User
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
     * Set title
     *
     * @access public
     * @param string $title
     * @return Quiz
     */
    public function setTitle($title)
    {
        $this->title = $title;
        return $this;
    }

    /**
     * Get title
     *
     * @access public
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set titleAr
     *
     * @access public
     * @param string $titleAr
     * @return Quiz
     */
    public function setTitleAr($titleAr = null)
    {
        $this->titleAr = $titleAr;
        return $this;
    }

    /**
     * Get titleAr
     *
     * @access public
     * @return string 
     */
    public function getTitleAr()
    {
        return $this->titleAr;
    }

    /**
     * Set titleFr
     *
     * @access public
     * @param string $titleFr
     * @return Quiz
     */
    public function setTitleFr($titleFr = null)
    {
        $this->titleFr = $titleFr;
        return $this;
    }

    /**
     * Get titleFr
     *
     * @access public
     * @return string 
     */
    public function getTitleFr()
    {
        return $this->titleFr;
    }

    /**
     * Set slug
     *
     * @access public
     * @param string $slug
     * @return Quiz
     */
    public function setSlug($slug)
    {
        $this->slug = $slug;
        return $this;
    }

    /**
     * Get slug
     *
     * @access public
     * @return string 
     */
    public function getSlug()
    {
        return $this->slug;
    }

    /**
     * Set slugAr
     *
     * @access public
     * @param string $slugAr
     * @return Quiz
     */
    public function setSlugAr($slugAr = null)
    {
        $this->slugAr = $slugAr;
        return $this;
    }

    /**
     * Get slugAr
     *
     * @access public
     * @return string 
     */
    public function getSlugAr()
    {
        return $this->slugAr;
    }

    /**
     * Set slugFr
     *
     * @access public
     * @param string $slugFr
     * @return Quiz
     */
    public function setSlugFr($slugFr = null)
    {
        $this->slugFr = $slugFr;
        return $this;
    }

    /**
     * Get slugFr
     *
     * @access public
     * @return string 
     */
    public function getSlugFr()
    {
        return $this->slugFr;
    }

    /**
     * Set picture
     *
     * @access public
     * @param string $picture
     * @return Quiz
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
     * Set description
     *
     * @access public
     * @param string $description
     * @return Quiz
     */
    public function setDescription($description)
    {
        $this->description = $description;
        return $this;
    }

    /**
     * Get description
     *
     * @access public
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set descriptionAr
     *
     * @access public
     * @param string $descriptionAr
     * @return Quiz
     */
    public function setDescriptionAr($descriptionAr = null)
    {
        $this->descriptionAr = $descriptionAr;
        return $this;
    }

    /**
     * Get descriptionAr
     *
     * @access public
     * @return string 
     */
    public function getDescriptionAr()
    {
        return $this->descriptionAr;
    }

    /**
     * Set descriptionFr
     *
     * @access public
     * @param string $descriptionFr
     * @return Quiz
     */
    public function setDescriptionFr($descriptionFr = null)
    {
        $this->descriptionFr = $descriptionFr;
        return $this;
    }

    /**
     * Get descriptionFr
     *
     * @access public
     * @return string 
     */
    public function getDescriptionFr()
    {
        return $this->descriptionFr;
    }

    /**
     * Set kind
     *
     * @access public
     * @param string $kind
     * @return Quiz
     */
    public function setKind($kind)
    {
        $this->kind = $kind;
        return $this;
    }

    /**
     * Get kind
     *
     * @access public
     * @return string 
     */
    public function getKind()
    {
        return $this->kind;
    }

    /**
     * Set question
     *
     * @access public
     * @param string $question
     * @return Quiz
     */
    public function setQuestion($question)
    {
        $this->question = $question;
        return $this;
    }

    /**
     * Get question
     *
     * @access public
     * @return string 
     */
    public function getQuestion()
    {
        return $this->question;
    }

    /**
     * Set questionAr
     *
     * @access public
     * @param string $questionAr
     * @return Quiz
     */
    public function setQuestionAr($questionAr = null)
    {
        $this->questionAr = $questionAr;
        return $this;
    }

    /**
     * Get questionAr
     *
     * @access public
     * @return string 
     */
    public function getQuestionAr()
    {
        return $this->questionAr;
    }

    /**
     * Set questionFr
     *
     * @access public
     * @param string $questionFr
     * @return Quiz
     */
    public function setQuestionFr($questionFr = null)
    {
        $this->questionFr = $questionFr;
        return $this;
    }

    /**
     * Get questionFr
     *
     * @access public
     * @return string 
     */
    public function getQuestionFr()
    {
        return $this->questionFr;
    }

    /**
     * Set choice1
     *
     * @access public
     * @param string $choice1
     * @return Quiz
     */
    public function setChoice1($choice1 = null)
    {
        $this->choice1 = $choice1;
        return $this;
    }

    /**
     * Get choice1
     *
     * @access public
     * @return string 
     */
    public function getChoice1()
    {
        return $this->choice1;
    }

    /**
     * Set choice1Ar
     *
     * @access public
     * @param string $choice1Ar
     * @return Quiz
     */
    public function setChoice1Ar($choice1Ar = null)
    {
        $this->choice1Ar = $choice1Ar;
        return $this;
    }

    /**
     * Get choice1Ar
     *
     * @access public
     * @return string 
     */
    public function getChoice1Ar()
    {
        return $this->choice1Ar;
    }

    /**
     * Set choice1Fr
     *
     * @access public
     * @param string $choice1Fr
     * @return Quiz
     */
    public function setChoice1Fr($choice1Fr = null)
    {
        $this->choice1Fr = $choice1Fr;
        return $this;
    }

    /**
     * Get choice1Fr
     *
     * @access public
     * @return string 
     */
    public function getChoice1Fr()
    {
        return $this->choice1Fr;
    }

    /**
     * Set choice1IsCorrect
     *
     * @access public
     * @param boolean $choice1IsCorrect
     * @return Quiz
     */
    public function setChoice1IsCorrect($choice1IsCorrect)
    {
        $this->choice1IsCorrect = $choice1IsCorrect;
        return $this;
    }

    /**
     * Get choice1IsCorrect
     *
     * @access public
     * @return boolean 
     */
    public function getChoice1IsCorrect()
    {
        return $this->choice1IsCorrect;
    }

    /**
     * Set choice2
     *
     * @access public
     * @param string $choice2
     * @return Quiz
     */
    public function setChoice2($choice2 = null)
    {
        $this->choice2 = $choice2;
        return $this;
    }

    /**
     * Get choice2
     *
     * @access public
     * @return string 
     */
    public function getChoice2()
    {
        return $this->choice2;
    }

    /**
     * Set choice2Ar
     *
     * @access public
     * @param string $choice2Ar
     * @return Quiz
     */
    public function setChoice2Ar($choice2Ar = null)
    {
        $this->choice2Ar = $choice2Ar;
        return $this;
    }

    /**
     * Get choice2Ar
     *
     * @access public
     * @return string 
     */
    public function getChoice2Ar()
    {
        return $this->choice2Ar;
    }

    /**
     * Set choice2Fr
     *
     * @access public
     * @param string $choice2Fr
     * @return Quiz
     */
    public function setChoice2Fr($choice2Fr = null)
    {
        $this->choice2Fr = $choice2Fr;
        return $this;
    }

    /**
     * Get choice2Fr
     *
     * @access public
     * @return string 
     */
    public function getChoice2Fr()
    {
        return $this->choice2Fr;
    }

    /**
     * Set choice2IsCorrect
     *
     * @access public
     * @param boolean $choice2IsCorrect
     * @return Quiz
     */
    public function setChoice2IsCorrect($choice2IsCorrect)
    {
        $this->choice2IsCorrect = $choice2IsCorrect;
        return $this;
    }

    /**
     * Get choice2IsCorrect
     *
     * @access public
     * @return boolean 
     */
    public function getChoice2IsCorrect()
    {
        return $this->choice2IsCorrect;
    }

    /**
     * Set choice3
     *
     * @access public
     * @param string $choice3
     * @return Quiz
     */
    public function setChoice3($choice3 = null)
    {
        $this->choice3 = $choice3;
        return $this;
    }

    /**
     * Get choice3
     *
     * @access public
     * @return string 
     */
    public function getChoice3()
    {
        return $this->choice3;
    }

    /**
     * Set choice3Ar
     *
     * @access public
     * @param string $choice3Ar
     * @return Quiz
     */
    public function setChoice3Ar($choice3Ar = null)
    {
        $this->choice3Ar = $choice3Ar;
        return $this;
    }

    /**
     * Get choice3Ar
     *
     * @access public
     * @return string 
     */
    public function getChoice3Ar()
    {
        return $this->choice3Ar;
    }

    /**
     * Set choice3Fr
     *
     * @access public
     * @param string $choice3Fr
     * @return Quiz
     */
    public function setChoice3Fr($choice3Fr = null)
    {
        $this->choice3Fr = $choice3Fr;
        return $this;
    }

    /**
     * Get choice3Fr
     *
     * @access public
     * @return string 
     */
    public function getChoice3Fr()
    {
        return $this->choice3Fr;
    }

    /**
     * Set choice3IsCorrect
     *
     * @access public
     * @param boolean $choice3IsCorrect
     * @return Quiz
     */
    public function setChoice3IsCorrect($choice3IsCorrect)
    {
        $this->choice3IsCorrect = $choice3IsCorrect;
        return $this;
    }

    /**
     * Get choice3IsCorrect
     *
     * @access public
     * @return boolean 
     */
    public function getChoice3IsCorrect()
    {
        return $this->choice3IsCorrect;
    }

    /**
     * Set choice4
     *
     * @access public
     * @param string $choice4
     * @return Quiz
     */
    public function setChoice4($choice4 = null)
    {
        $this->choice4 = $choice4;
        return $this;
    }

    /**
     * Get choice4
     *
     * @access public
     * @return string 
     */
    public function getChoice4()
    {
        return $this->choice4;
    }

    /**
     * Set choice4Ar
     *
     * @access public
     * @param string $choice4Ar
     * @return Quiz
     */
    public function setChoice4Ar($choice4Ar = null)
    {
        $this->choice4Ar = $choice4Ar;
        return $this;
    }

    /**
     * Get choice4Ar
     *
     * @access public
     * @return string 
     */
    public function getChoice4Ar()
    {
        return $this->choice4Ar;
    }

    /**
     * Set choice4Fr
     *
     * @access public
     * @param string $choice4Fr
     * @return Quiz
     */
    public function setChoice4Fr($choice4Fr = null)
    {
        $this->choice4Fr = $choice4Fr;
        return $this;
    }

    /**
     * Get choice4Fr
     *
     * @access public
     * @return string 
     */
    public function getChoice4Fr()
    {
        return $this->choice4Fr;
    }

    /**
     * Set choice4IsCorrect
     *
     * @access public
     * @param boolean $choice4IsCorrect
     * @return Quiz
     */
    public function setChoice4IsCorrect($choice4IsCorrect)
    {
        $this->choice4IsCorrect = $choice4IsCorrect;
        return $this;
    }

    /**
     * Get choice4IsCorrect
     *
     * @access public
     * @return boolean 
     */
    public function getChoice4IsCorrect()
    {
        return $this->choice4IsCorrect;
    }

    /**
     * Set choice5
     *
     * @access public
     * @param string $choice5
     * @return Quiz
     */
    public function setChoice5($choice5 = null)
    {
        $this->choice5 = $choice5;
        return $this;
    }

    /**
     * Get choice5
     *
     * @access public
     * @return string 
     */
    public function getChoice5()
    {
        return $this->choice5;
    }

    /**
     * Set choice5Ar
     *
     * @access public
     * @param string $choice5Ar
     * @return Quiz
     */
    public function setChoice5Ar($choice5Ar = null)
    {
        $this->choice5Ar = $choice5Ar;
        return $this;
    }

    /**
     * Get choice5Ar
     *
     * @access public
     * @return string 
     */
    public function getChoice5Ar()
    {
        return $this->choice5Ar;
    }

    /**
     * Set choice5Fr
     *
     * @access public
     * @param string $choice5Fr
     * @return Quiz
     */
    public function setChoice5Fr($choice5Fr = null)
    {
        $this->choice5Fr = $choice5Fr;
        return $this;
    }

    /**
     * Get choice5Fr
     *
     * @access public
     * @return string 
     */
    public function getChoice5Fr()
    {
        return $this->choice5Fr;
    }

    /**
     * Set choice5IsCorrect
     *
     * @access public
     * @param boolean $choice5IsCorrect
     * @return Quiz
     */
    public function setChoice5IsCorrect($choice5IsCorrect)
    {
        $this->choice5IsCorrect = $choice5IsCorrect;
        return $this;
    }

    /**
     * Get choice5IsCorrect
     *
     * @access public
     * @return boolean 
     */
    public function getChoice5IsCorrect()
    {
        return $this->choice5IsCorrect;
    }

    /**
     * Set choice6
     *
     * @access public
     * @param string $choice6
     * @return Quiz
     */
    public function setChoice6($choice6 = null)
    {
        $this->choice6 = $choice6;
        return $this;
    }

    /**
     * Get choice6
     *
     * @access public
     * @return string 
     */
    public function getChoice6()
    {
        return $this->choice6;
    }

    /**
     * Set choice6Ar
     *
     * @access public
     * @param string $choice6Ar
     * @return Quiz
     */
    public function setChoice6Ar($choice6Ar = null)
    {
        $this->choice6Ar = $choice6Ar;
        return $this;
    }

    /**
     * Get choice6Ar
     *
     * @access public
     * @return string 
     */
    public function getChoice6Ar()
    {
        return $this->choice6Ar;
    }

    /**
     * Set choice6Fr
     *
     * @access public
     * @param string $choice6Fr
     * @return Quiz
     */
    public function setChoice6Fr($choice6Fr = null)
    {
        $this->choice6Fr = $choice6Fr;
        return $this;
    }

    /**
     * Get choice6Fr
     *
     * @access public
     * @return string 
     */
    public function getChoice6Fr()
    {
        return $this->choice6Fr;
    }

    /**
     * Set choice6IsCorrect
     *
     * @access public
     * @param boolean $choice6IsCorrect
     * @return Quiz
     */
    public function setChoice6IsCorrect($choice6IsCorrect)
    {
        $this->choice6IsCorrect = $choice6IsCorrect;
        return $this;
    }

    /**
     * Get choice6IsCorrect
     *
     * @access public
     * @return boolean 
     */
    public function getChoice6IsCorrect()
    {
        return $this->choice6IsCorrect;
    }

    /**
     * Set choice7
     *
     * @access public
     * @param string $choice7
     * @return Quiz
     */
    public function setChoice7($choice7 = null)
    {
        $this->choice7 = $choice7;
        return $this;
    }

    /**
     * Get choice7
     *
     * @access public
     * @return string 
     */
    public function getChoice7()
    {
        return $this->choice7;
    }

    /**
     * Set choice7Ar
     *
     * @access public
     * @param string $choice7Ar
     * @return Quiz
     */
    public function setChoice7Ar($choice7Ar = null)
    {
        $this->choice7Ar = $choice7Ar;
        return $this;
    }

    /**
     * Get choice7Ar
     *
     * @access public
     * @return string 
     */
    public function getChoice7Ar()
    {
        return $this->choice7Ar;
    }

    /**
     * Set choice7Fr
     *
     * @access public
     * @param string $choice7Fr
     * @return Quiz
     */
    public function setChoice7Fr($choice7Fr = null)
    {
        $this->choice7Fr = $choice7Fr;
        return $this;
    }

    /**
     * Get choice7Fr
     *
     * @access public
     * @return string 
     */
    public function getChoice7Fr()
    {
        return $this->choice7Fr;
    }

    /**
     * Set choice7IsCorrect
     *
     * @access public
     * @param boolean $choice7IsCorrect
     * @return Quiz
     */
    public function setChoice7IsCorrect($choice7IsCorrect)
    {
        $this->choice7IsCorrect = $choice7IsCorrect;
        return $this;
    }

    /**
     * Get choice7IsCorrect
     *
     * @access public
     * @return boolean 
     */
    public function getChoice7IsCorrect()
    {
        return $this->choice7IsCorrect;
    }

    /**
     * Set choice8
     *
     * @access public
     * @param string $choice8
     * @return Quiz
     */
    public function setChoice8($choice8 = null)
    {
        $this->choice8 = $choice8;
        return $this;
    }

    /**
     * Get choice8
     *
     * @access public
     * @return string 
     */
    public function getChoice8()
    {
        return $this->choice8;
    }

    /**
     * Set choice8Ar
     *
     * @access public
     * @param string $choice8Ar
     * @return Quiz
     */
    public function setChoice8Ar($choice8Ar = null)
    {
        $this->choice8Ar = $choice8Ar;
        return $this;
    }

    /**
     * Get choice8Ar
     *
     * @access public
     * @return string 
     */
    public function getChoice8Ar()
    {
        return $this->choice8Ar;
    }

    /**
     * Set choice8Fr
     *
     * @access public
     * @param string $choice8Fr
     * @return Quiz
     */
    public function setChoice8Fr($choice8Fr = null)
    {
        $this->choice8Fr = $choice8Fr;
        return $this;
    }

    /**
     * Get choice8Fr
     *
     * @access public
     * @return string 
     */
    public function getChoice8Fr()
    {
        return $this->choice8Fr;
    }

    /**
     * Set choice8IsCorrect
     *
     * @access public
     * @param boolean $choice8IsCorrect
     * @return Quiz
     */
    public function setChoice8IsCorrect($choice8IsCorrect)
    {
        $this->choice8IsCorrect = $choice8IsCorrect;
        return $this;
    }

    /**
     * Get choice8IsCorrect
     *
     * @access public
     * @return boolean 
     */
    public function getChoice8IsCorrect()
    {
        return $this->choice8IsCorrect;
    }

    /**
     * Set autoPublishing
     *
     * @access public
     * @param boolean $autoPublishing
     * @return Quiz
     */
    public function setAutoPublishing($autoPublishing)
    {
        $this->autoPublishing = $autoPublishing;
        return $this;
    }

    /**
     * Get autoPublishing
     *
     * @access public
     * @return boolean 
     */
    public function getAutoPublishing()
    {
        return $this->autoPublishing;
    }

    /**
     * Set startPublishing
     *
     * @access public
     * @param \DateTime $startPublishing
     * @return Quiz
     */
    public function setStartPublishing(\DateTime $startPublishing = null)
    {
        $this->startPublishing = $startPublishing;
        return $this;
    }

    /**
     * Get startPublishing
     *
     * @access public
     * @return \DateTime 
     */
    public function getStartPublishing()
    {
        return $this->startPublishing;
    }

    /**
     * Set endPublishing
     *
     * @access public
     * @param \DateTime $endPublishing
     * @return Quiz
     */
    public function setEndPublishing(\DateTime $endPublishing = null)
    {
        $this->endPublishing = $endPublishing;
        return $this;
    }

    /**
     * Get endPublishing
     *
     * @access public
     * @return \DateTime 
     */
    public function getEndPublishing()
    {
        return $this->endPublishing;
    }

    /**
     * Set publishDate
     *
     * @access public
     * @param \DateTime $publishDate
     * @return Quiz
     */
    public function setPublishDate(\DateTime $publishDate)
    {
        $this->publishDate = $publishDate;
        return $this;
    }

    /**
     * Get publishDate
     *
     * @access public
     * @return \DateTime 
     */
    public function getPublishDate()
    {
        return $this->publishDate;
    }

    /**
     * Set status
     *
     * @access public
     * @param string $status
     * @return Quiz
     */
    public function setStatus($status)
    {
        $this->status = $status;
        return $this;
    }

    /**
     * Get status
     *
     * @access public
     * @return string 
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set countAnswers
     *
     * @access public
     * @param integer $countAnswers
     * @return Quiz
     */
    public function setCountAnswers($countAnswers = null)
    {
        $this->countAnswers = $countAnswers;
        return $this;
    }

    /**
     * Get countAnswers
     *
     * @access public
     * @return integer 
     */
    public function getCountAnswers()
    {
        return $this->countAnswers;
    }

    /**
     * Set countWinners
     *
     * @access public
     * @param integer $countWinners
     * @return Quiz
     */
    public function setCountWinners($countWinners = null)
    {
        $this->countWinners = $countWinners;
        return $this;
    }

    /**
     * Get countWinners
     *
     * @access public
     * @return integer 
     */
    public function getCountWinners()
    {
        return $this->countWinners;
    }

    /**
     * Set isFinished
     *
     * @access public
     * @param boolean $isFinished
     * @return Quiz
     */
    public function setIsFinished($isFinished)
    {
        $this->isFinished = $isFinished;
        return $this;
    }

    /**
     * Get isFinished
     *
     * @access public
     * @return boolean 
     */
    public function getIsFinished()
    {
        return $this->isFinished;
    }

    /**
     * Set ordering
     *
     * @access public
     * @param integer $ordering
     * @return Quiz
     */
    public function setOrdering($ordering = null)
    {
        $this->ordering = $ordering;
        return $this;
    }

    /**
     * Get ordering
     *
     * @access public
     * @return integer 
     */
    public function getOrdering()
    {
        return $this->ordering;
    }

    /**
     * Set createdAt
     *
     * @access public
     * @param \DateTime $createdAt
     * @return Quiz
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
     * @return Quiz
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
     * Set quizType
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\QuizType $quizType
     * @return Quiz
     */
    public function setQuizType(QuizType $quizType = null)
    {
        $this->quizType = $quizType;
        return $this;
    }

    /**
     * Get quizType
     *
     * @access public
     * @return \ContinuousNet\SportClubBundle\Entity\QuizType 
     */
    public function getQuizType()
    {
        return $this->quizType;
    }

    /**
     * Set creatorUser
     *
     * @access public
     * @param \ContinuousNet\SportClubBundle\Entity\User $creatorUser
     * @return Quiz
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
     * @return Quiz
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
