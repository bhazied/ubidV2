<?php

namespace ContinuousNet\BucksHunterBundle\Controller;

use ContinuousNet\BucksHunterBundle\Entity\Game;
use ContinuousNet\BucksHunterBundle\Form\GameType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Game Controller
 * 
 * Manage Games 
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
 * @see		GameController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/game")
 */
class GameController extends BaseController
{
	/**
	 * Lists all Game entities.
	 *
	 * @Route("/", name="game_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$games = $em->getRepository('BucksHunterBundle:Game')->findAll();

		return $this->render('BucksHunterBundle:Game:index.html.twig', array(
			'games' => $games,
		));
	}

	/**
	 * Creates a new Game entity.
	 *
	 * @Route("/new", name="game_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$game = new Game();
		$form = $this->createForm('ContinuousNet\BucksHunterBundle\Form\GameType', $game);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($game);
			$em->flush();

			return $this->redirectToRoute('game_show', array('id' => $game->getId()));
		}

		return $this->render('BucksHunterBundle:Game:new.html.twig', array(
			'game' => $game,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Game entity.
	 *
	 * @Route("/{id}", name="game_show")
	 * @Method("GET")
	 */
	public function showAction(Game $game)
	{
		$deleteForm = $this->createDeleteForm($game);

		return $this->render('BucksHunterBundle:Game:show.html.twig', array(
			'game' => $game,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Game entity.
	 *
	 * @Route("/{id}/edit", name="game_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Game $game)
	{
		$deleteForm = $this->createDeleteForm($game);
		$editForm = $this->createForm('ContinuousNet\BucksHunterBundle\Form\GameType', $game);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($game);
			$em->flush();

			return $this->redirectToRoute('game_edit', array('id' => $game->getId()));
		}

		return $this->render('BucksHunterBundle:Game:edit.html.twig', array(
			'game' => $game,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Game entity.
	 *
	 * @Route("/{id}", name="game_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Game $game)
	{
		$form = $this->createDeleteForm($game);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($game);
			$em->flush();
		}

		return $this->redirectToRoute('game_index');
	}

	/**
	 * Creates a form to delete a Game entity.
	 *
	 * @param Game $game The Game entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Game $game)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('game_delete', array('id' => $game->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
