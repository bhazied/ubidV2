<?php

namespace ContinuousNet\SportClubBundle\Controller;

use ContinuousNet\SportClubBundle\Entity\Artist;
use ContinuousNet\SportClubBundle\Form\ArtistType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Artist Controller
 * 
 * Manage Artists 
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
 * @see		ArtistController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/artist")
 */
class ArtistController extends BaseController
{
	/**
	 * Lists all Artist entities.
	 *
	 * @Route("/", name="artist_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$artists = $em->getRepository('SportClubBundle:Artist')->findAll();

		return $this->render('SportClubBundle:Artist:index.html.twig', array(
			'artists' => $artists,
		));
	}

	/**
	 * Creates a new Artist entity.
	 *
	 * @Route("/new", name="artist_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$artist = new Artist();
		$form = $this->createForm('ContinuousNet\SportClubBundle\Form\ArtistType', $artist);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($artist);
			$em->flush();

			return $this->redirectToRoute('artist_show', array('id' => $artist->getId()));
		}

		return $this->render('SportClubBundle:Artist:new.html.twig', array(
			'artist' => $artist,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Artist entity.
	 *
	 * @Route("/{id}", name="artist_show")
	 * @Method("GET")
	 */
	public function showAction(Artist $artist)
	{
		$deleteForm = $this->createDeleteForm($artist);

		return $this->render('SportClubBundle:Artist:show.html.twig', array(
			'artist' => $artist,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Artist entity.
	 *
	 * @Route("/{id}/edit", name="artist_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Artist $artist)
	{
		$deleteForm = $this->createDeleteForm($artist);
		$editForm = $this->createForm('ContinuousNet\SportClubBundle\Form\ArtistType', $artist);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($artist);
			$em->flush();

			return $this->redirectToRoute('artist_edit', array('id' => $artist->getId()));
		}

		return $this->render('SportClubBundle:Artist:edit.html.twig', array(
			'artist' => $artist,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Artist entity.
	 *
	 * @Route("/{id}", name="artist_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Artist $artist)
	{
		$form = $this->createDeleteForm($artist);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($artist);
			$em->flush();
		}

		return $this->redirectToRoute('artist_index');
	}

	/**
	 * Creates a form to delete a Artist entity.
	 *
	 * @param Artist $artist The Artist entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Artist $artist)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('artist_delete', array('id' => $artist->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
