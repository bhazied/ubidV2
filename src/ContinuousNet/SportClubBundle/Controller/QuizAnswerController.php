<?php

namespace ContinuousNet\SportClubBundle\Controller;

use ContinuousNet\SportClubBundle\Entity\QuizAnswer;
use ContinuousNet\SportClubBundle\Form\QuizAnswerType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Quiz Answer Controller
 * 
 * Manage QuizAnswers 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\SportClubBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://sportclub.continuousnet.com/ContinuousNet/SportClubBundle/Controller
 * @see		QuizAnswerController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/quizanswer")
 */
class QuizAnswerController extends BaseController
{
	/**
	 * Lists all QuizAnswer entities.
	 *
	 * @Route("/", name="quizanswer_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$quizAnswers = $em->getRepository('SportClubBundle:QuizAnswer')->findAll();

		return $this->render('SportClubBundle:QuizAnswer:index.html.twig', array(
			'quizAnswers' => $quizAnswers,
		));
	}

	/**
	 * Creates a new QuizAnswer entity.
	 *
	 * @Route("/new", name="quizanswer_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$quizAnswer = new QuizAnswer();
		$form = $this->createForm('ContinuousNet\SportClubBundle\Form\QuizAnswerType', $quizAnswer);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($quizAnswer);
			$em->flush();

			return $this->redirectToRoute('quizanswer_show', array('id' => $quizAnswer->getId()));
		}

		return $this->render('SportClubBundle:QuizAnswer:new.html.twig', array(
			'quizAnswer' => $quizAnswer,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a QuizAnswer entity.
	 *
	 * @Route("/{id}", name="quizanswer_show")
	 * @Method("GET")
	 */
	public function showAction(QuizAnswer $quizAnswer)
	{
		$deleteForm = $this->createDeleteForm($quizAnswer);

		return $this->render('SportClubBundle:QuizAnswer:show.html.twig', array(
			'quizAnswer' => $quizAnswer,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing QuizAnswer entity.
	 *
	 * @Route("/{id}/edit", name="quizanswer_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, QuizAnswer $quizAnswer)
	{
		$deleteForm = $this->createDeleteForm($quizAnswer);
		$editForm = $this->createForm('ContinuousNet\SportClubBundle\Form\QuizAnswerType', $quizAnswer);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($quizAnswer);
			$em->flush();

			return $this->redirectToRoute('quizanswer_edit', array('id' => $quizAnswer->getId()));
		}

		return $this->render('SportClubBundle:QuizAnswer:edit.html.twig', array(
			'quizAnswer' => $quizAnswer,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a QuizAnswer entity.
	 *
	 * @Route("/{id}", name="quizanswer_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, QuizAnswer $quizAnswer)
	{
		$form = $this->createDeleteForm($quizAnswer);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($quizAnswer);
			$em->flush();
		}

		return $this->redirectToRoute('quizanswer_index');
	}

	/**
	 * Creates a form to delete a QuizAnswer entity.
	 *
	 * @param QuizAnswer $quizAnswer The QuizAnswer entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(QuizAnswer $quizAnswer)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('quizanswer_delete', array('id' => $quizAnswer->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
