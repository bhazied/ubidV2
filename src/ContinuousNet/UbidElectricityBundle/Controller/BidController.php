<?php

namespace ContinuousNet\UbidElectricityBundle\Controller;

use ContinuousNet\UbidElectricityBundle\Entity\Bid;
use ContinuousNet\UbidElectricityBundle\Form\BidType;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

/**
 * Bid Controller
 * 
 * Manage Bids 
 * 
 * PHP version 5.4.4
 * 
 * @category   Symfony 2 Controller
 * @package	ContinuousNet\UbidElectricityBundle\Controller
 * @author	 Sahbi KHALFALLAH <sahbi.khalfallah@continuousnet.com>
 * @copyright  2016 CONTINUOUS NET
 * @license	CONTINUOUS NET REGULAR LICENSE
 * @version	Release: 1.0
 * @link	   http://ubidelectricity.continuousnet.com/ContinuousNet/UbidElectricityBundle/Controller
 * @see		BidController
 * @since	  Class available since Release 1.0
 * @access	 public
 * @Route("/bid")
 */
class BidController extends BaseController
{
	/**
	 * Lists all Bid entities.
	 *
	 * @Route("/", name="bid_index")
	 * @Method("GET")
	 */
	public function indexAction()
	{
		$em = $this->getDoctrine()->getManager();

		$bids = $em->getRepository('UbidElectricityBundle:Bid')->findAll();

		return $this->render('UbidElectricityBundle:Bid:index.html.twig', array(
			'bids' => $bids,
		));
	}

	/**
	 * Creates a new Bid entity.
	 *
	 * @Route("/new", name="bid_new")
	 * @Method({"GET", "POST"})
	 */
	public function newAction(Request $request)
	{
		$bid = new Bid();
		$form = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BidType', $bid);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($bid);
			$em->flush();

			return $this->redirectToRoute('bid_show', array('id' => $bid->getId()));
		}

		return $this->render('UbidElectricityBundle:Bid:new.html.twig', array(
			'bid' => $bid,
			'form' => $form->createView(),
		));
	}

	/**
	 * Finds and displays a Bid entity.
	 *
	 * @Route("/{id}", name="bid_show")
	 * @Method("GET")
	 */
	public function showAction(Bid $bid)
	{
		$deleteForm = $this->createDeleteForm($bid);

		return $this->render('UbidElectricityBundle:Bid:show.html.twig', array(
			'bid' => $bid,
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Displays a form to edit an existing Bid entity.
	 *
	 * @Route("/{id}/edit", name="bid_edit")
	 * @Method({"GET", "POST"})
	 */
	public function editAction(Request $request, Bid $bid)
	{
		$deleteForm = $this->createDeleteForm($bid);
		$editForm = $this->createForm('ContinuousNet\UbidElectricityBundle\Form\BidType', $bid);
		$editForm->handleRequest($request);

		if ($editForm->isSubmitted() && $editForm->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->persist($bid);
			$em->flush();

			return $this->redirectToRoute('bid_edit', array('id' => $bid->getId()));
		}

		return $this->render('UbidElectricityBundle:Bid:edit.html.twig', array(
			'bid' => $bid,
			'edit_form' => $editForm->createView(),
			'delete_form' => $deleteForm->createView(),
		));
	}

	/**
	 * Deletes a Bid entity.
	 *
	 * @Route("/{id}", name="bid_delete")
	 * @Method("DELETE")
	 */
	public function deleteAction(Request $request, Bid $bid)
	{
		$form = $this->createDeleteForm($bid);
		$form->handleRequest($request);

		if ($form->isSubmitted() && $form->isValid()) {
			$em = $this->getDoctrine()->getManager();
			$em->remove($bid);
			$em->flush();
		}

		return $this->redirectToRoute('bid_index');
	}

	/**
	 * Creates a form to delete a Bid entity.
	 *
	 * @param Bid $bid The Bid entity
	 *
	 * @return \Symfony\Component\Form\Form The form
	 */
	private function createDeleteForm(Bid $bid)
	{
		return $this->createFormBuilder()
			->setAction($this->generateUrl('bid_delete', array('id' => $bid->getId())))
			->setMethod('DELETE')
			->getForm()
		;
	}
}
