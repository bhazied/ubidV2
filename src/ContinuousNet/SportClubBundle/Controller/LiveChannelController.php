<?php

namespace ContinuousNet\SportClubBundle\Controller;

use ContinuousNet\SportClubBundle\Entity\LiveChannel;
use ContinuousNet\SportClubBundle\Form\LiveChannelType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Live Channel Controller
 * 
 * Manage LiveChannels 
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
 * @see		LiveChannelController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/livechannel")
 */
class LiveChannelController extends BaseController
{
	/**
	 * Lists all LiveChannel entities.
	 *
	 * @Route("/", name="livechannel_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$liveChannels = $em->getRepository('SportClubBundle:LiveChannel')->findAll();

		return $this->render('SportClubBundle:LiveChannel:index.html.twig', array(
			'liveChannels' => $liveChannels,
		));
	}

	/**
	 * Creates a new LiveChannel entity.
	 *
	 * @Route("/new", name="livechannel_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$liveChannel = new LiveChannel();
		$form = $this->createForm('ContinuousNet\SportClubBundle\Form\LiveChannelType', $liveChannel);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($liveChannel);
			$em->flush();

			return $this->redirectToRoute('livechannel_show', array('id' => $liveChannel->getId()));
		}

		return $this->render('SportClubBundle:LiveChannel:new.html.twig', array(
			'liveChannel' => $liveChannel,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a LiveChannel entity.
	 *
	 * @Route("/{id}", name="livechannel_show")
	 * @Method("GET")
	 */
	public function showAction(LiveChannel $liveChannel)
	{
		$deleteForm = $this->createDeleteForm($liveChannel);

		return $this->render('SportClubBundle:LiveChannel:show.html.twig', array(
			'liveChannel' => $liveChannel,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing LiveChannel entity.
	 *
	 * @Route("/{id}/edit", name="livechannel_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, LiveChannel $liveChannel)
	{
		$deleteForm = $this->createDeleteForm($liveChannel);
		$editForm = $this->createForm('ContinuousNet\SportClubBundle\Form\LiveChannelType', $liveChannel);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($liveChannel);
			$em->flush();

			return $this->redirectToRoute('livechannel_edit', array('id' => $liveChannel->getId()));
		}

		return $this->render('SportClubBundle:LiveChannel:edit.html.twig', array(
			'liveChannel' => $liveChannel,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a LiveChannel entity.
	 *
	 * @Route("/{id}", name="livechannel_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, LiveChannel $liveChannel)
	{
		$form = $this->createDeleteForm($liveChannel);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($liveChannel);
			$em->flush();
		}

		return $this->redirectToRoute('livechannel_index');
	}

	/**
	 * Creates a form to delete a LiveChannel entity.
	 *
	 * @param LiveChannel $liveChannel The LiveChannel entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(LiveChannel $liveChannel)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('livechannel_delete', array('id' => $liveChannel->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
