<?php

namespace ContinuousNet\BucksHunterBundle\Controller;

use ContinuousNet\BucksHunterBundle\Entity\Puzzle;
use ContinuousNet\BucksHunterBundle\Form\PuzzleType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Puzzle Controller
 * 
 * Manage Puzzles 
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
 * @see		PuzzleController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/puzzle")
 */
class PuzzleController extends BaseController
{
	/**
	 * Lists all Puzzle entities.
	 *
	 * @Route("/", name="puzzle_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$puzzles = $em->getRepository('BucksHunterBundle:Puzzle')->findAll();

		return $this->render('BucksHunterBundle:Puzzle:index.html.twig', array(
			'puzzles' => $puzzles,
		));
	}

	/**
	 * Creates a new Puzzle entity.
	 *
	 * @Route("/new", name="puzzle_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$puzzle = new Puzzle();
		$form = $this->createForm('ContinuousNet\BucksHunterBundle\Form\PuzzleType', $puzzle);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($puzzle);
			$em->flush();

			return $this->redirectToRoute('puzzle_show', array('id' => $puzzle->getId()));
		}

		return $this->render('BucksHunterBundle:Puzzle:new.html.twig', array(
			'puzzle' => $puzzle,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Puzzle entity.
	 *
	 * @Route("/{id}", name="puzzle_show")
	 * @Method("GET")
	 */
	public function showAction(Puzzle $puzzle)
	{
		$deleteForm = $this->createDeleteForm($puzzle);

		return $this->render('BucksHunterBundle:Puzzle:show.html.twig', array(
			'puzzle' => $puzzle,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Puzzle entity.
	 *
	 * @Route("/{id}/edit", name="puzzle_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Puzzle $puzzle)
	{
		$deleteForm = $this->createDeleteForm($puzzle);
		$editForm = $this->createForm('ContinuousNet\BucksHunterBundle\Form\PuzzleType', $puzzle);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($puzzle);
			$em->flush();

			return $this->redirectToRoute('puzzle_edit', array('id' => $puzzle->getId()));
		}

		return $this->render('BucksHunterBundle:Puzzle:edit.html.twig', array(
			'puzzle' => $puzzle,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Puzzle entity.
	 *
	 * @Route("/{id}", name="puzzle_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Puzzle $puzzle)
	{
		$form = $this->createDeleteForm($puzzle);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($puzzle);
			$em->flush();
		}

		return $this->redirectToRoute('puzzle_index');
	}

	/**
	 * Creates a form to delete a Puzzle entity.
	 *
	 * @param Puzzle $puzzle The Puzzle entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Puzzle $puzzle)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('puzzle_delete', array('id' => $puzzle->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
