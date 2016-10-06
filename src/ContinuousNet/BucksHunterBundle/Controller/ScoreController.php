<?php

namespace ContinuousNet\BucksHunterBundle\Controller;

use ContinuousNet\BucksHunterBundle\Entity\Score;
use ContinuousNet\BucksHunterBundle\Form\ScoreType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Score Controller
 * 
 * Manage Scores 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\BucksHunterBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://buckshunter.continuousnet.com/ContinuousNet/BucksHunterBundle/Controller
 * @see		ScoreController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/score")
 */
class ScoreController extends BaseController
{
	/**
	 * Lists all Score entities.
	 *
	 * @Route("/", name="score_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$scores = $em->getRepository('BucksHunterBundle:Score')->findAll();

		return $this->render('BucksHunterBundle:Score:index.html.twig', array(
			'scores' => $scores,
		));
	}

	/**
	 * Creates a new Score entity.
	 *
	 * @Route("/new", name="score_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$score = new Score();
		$form = $this->createForm('ContinuousNet\BucksHunterBundle\Form\ScoreType', $score);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($score);
			$em->flush();

			return $this->redirectToRoute('score_show', array('id' => $score->getId()));
		}

		return $this->render('BucksHunterBundle:Score:new.html.twig', array(
			'score' => $score,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Score entity.
	 *
	 * @Route("/{id}", name="score_show")
	 * @Method("GET")
	 */
	public function showAction(Score $score)
	{
		$deleteForm = $this->createDeleteForm($score);

		return $this->render('BucksHunterBundle:Score:show.html.twig', array(
			'score' => $score,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Score entity.
	 *
	 * @Route("/{id}/edit", name="score_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Score $score)
	{
		$deleteForm = $this->createDeleteForm($score);
		$editForm = $this->createForm('ContinuousNet\BucksHunterBundle\Form\ScoreType', $score);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($score);
			$em->flush();

			return $this->redirectToRoute('score_edit', array('id' => $score->getId()));
		}

		return $this->render('BucksHunterBundle:Score:edit.html.twig', array(
			'score' => $score,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Score entity.
	 *
	 * @Route("/{id}", name="score_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Score $score)
	{
		$form = $this->createDeleteForm($score);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($score);
			$em->flush();
		}

		return $this->redirectToRoute('score_index');
	}

	/**
	 * Creates a form to delete a Score entity.
	 *
	 * @param Score $score The Score entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Score $score)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('score_delete', array('id' => $score->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
