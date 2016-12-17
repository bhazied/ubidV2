<?php

namespace ContinuousNet\SportClubBundle\Controller;

use ContinuousNet\SportClubBundle\Entity\QuizType;
use ContinuousNet\SportClubBundle\Form\QuizTypeType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Quiz Type Controller
 * 
 * Manage QuizTypes 
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
 * @see		QuizTypeController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/quiztype")
 */
class QuizTypeController extends BaseController
{
	/**
	 * Lists all QuizType entities.
	 *
	 * @Route("/", name="quiztype_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$quizTypes = $em->getRepository('SportClubBundle:QuizType')->findAll();

		return $this->render('SportClubBundle:QuizType:index.html.twig', array(
			'quizTypes' => $quizTypes,
		));
	}

	/**
	 * Creates a new QuizType entity.
	 *
	 * @Route("/new", name="quiztype_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$quizType = new QuizType();
		$form = $this->createForm('ContinuousNet\SportClubBundle\Form\QuizTypeType', $quizType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($quizType);
			$em->flush();

			return $this->redirectToRoute('quiztype_show', array('id' => $quizType->getId()));
		}

		return $this->render('SportClubBundle:QuizType:new.html.twig', array(
			'quizType' => $quizType,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a QuizType entity.
	 *
	 * @Route("/{id}", name="quiztype_show")
	 * @Method("GET")
	 */
	public function showAction(QuizType $quizType)
	{
		$deleteForm = $this->createDeleteForm($quizType);

		return $this->render('SportClubBundle:QuizType:show.html.twig', array(
			'quizType' => $quizType,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing QuizType entity.
	 *
	 * @Route("/{id}/edit", name="quiztype_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, QuizType $quizType)
	{
		$deleteForm = $this->createDeleteForm($quizType);
		$editForm = $this->createForm('ContinuousNet\SportClubBundle\Form\QuizTypeType', $quizType);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($quizType);
			$em->flush();

			return $this->redirectToRoute('quiztype_edit', array('id' => $quizType->getId()));
		}

		return $this->render('SportClubBundle:QuizType:edit.html.twig', array(
			'quizType' => $quizType,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a QuizType entity.
	 *
	 * @Route("/{id}", name="quiztype_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, QuizType $quizType)
	{
		$form = $this->createDeleteForm($quizType);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($quizType);
			$em->flush();
		}

		return $this->redirectToRoute('quiztype_index');
	}

	/**
	 * Creates a form to delete a QuizType entity.
	 *
	 * @param QuizType $quizType The QuizType entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(QuizType $quizType)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('quiztype_delete', array('id' => $quizType->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
