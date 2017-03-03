<?php

namespace ContinuousNet\SportClubBundle\Controller;

use ContinuousNet\SportClubBundle\Entity\Quiz;
use ContinuousNet\SportClubBundle\Form\QuizType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Quiz Controller
 * 
 * Manage Quizzes 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\SportClubBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2017 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://sportclub.continuousnet.com/ContinuousNet/SportClubBundle/Controller
 * @see		QuizController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/quiz")
 */
class QuizController extends BaseController
{
	/**
	 * Lists all Quiz entities.
	 *
	 * @Route("/", name="quiz_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$quizzes = $em->getRepository('SportClubBundle:Quiz')->findAll();

		return $this->render('SportClubBundle:Quiz:index.html.twig', array(
			'quizzes' => $quizzes,
		));
	}

	/**
	 * Creates a new Quiz entity.
	 *
	 * @Route("/new", name="quiz_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$quiz = new Quiz();
		$form = $this->createForm('ContinuousNet\SportClubBundle\Form\QuizType', $quiz);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($quiz);
			$em->flush();

			return $this->redirectToRoute('quiz_show', array('id' => $quiz->getId()));
		}

		return $this->render('SportClubBundle:Quiz:new.html.twig', array(
			'quiz' => $quiz,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Quiz entity.
	 *
	 * @Route("/{id}", name="quiz_show")
	 * @Method("GET")
	 */
	public function showAction(Quiz $quiz)
	{
		$deleteForm = $this->createDeleteForm($quiz);

		return $this->render('SportClubBundle:Quiz:show.html.twig', array(
			'quiz' => $quiz,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Quiz entity.
	 *
	 * @Route("/{id}/edit", name="quiz_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Quiz $quiz)
	{
		$deleteForm = $this->createDeleteForm($quiz);
		$editForm = $this->createForm('ContinuousNet\SportClubBundle\Form\QuizType', $quiz);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($quiz);
			$em->flush();

			return $this->redirectToRoute('quiz_edit', array('id' => $quiz->getId()));
		}

		return $this->render('SportClubBundle:Quiz:edit.html.twig', array(
			'quiz' => $quiz,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Quiz entity.
	 *
	 * @Route("/{id}", name="quiz_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Quiz $quiz)
	{
		$form = $this->createDeleteForm($quiz);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($quiz);
			$em->flush();
		}

		return $this->redirectToRoute('quiz_index');
	}

	/**
	 * Creates a form to delete a Quiz entity.
	 *
	 * @param Quiz $quiz The Quiz entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Quiz $quiz)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('quiz_delete', array('id' => $quiz->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
